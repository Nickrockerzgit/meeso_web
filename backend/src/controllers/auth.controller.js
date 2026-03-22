import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const OTP_TTL_MINUTES = 10;

const createTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // fallback to ethereal when no SMTP creds present
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
};

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'no-reply@meesho.local',
      to,
      subject,
      text,
      html,
    });
    console.log('OTP email sent:', info.messageId);
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    console.error('Failed to send mail:', err);
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email and password are required' });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, passwordHash } });
  res.json({ id: user.id, name: user.name, email: user.email });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};

const sendOtp = async (req, res) => {
  const { email, purpose } = req.body;
  if (!email || !purpose) return res.status(400).json({ message: 'email and purpose required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
  await prisma.otpCode.create({ data: { email, code, purpose, expiresAt } });

  await sendEmail({
    to: email,
    subject: `[Meesho] ${purpose} OTP`,
    text: `Your OTP is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`,
    html: `<p>Your OTP is <strong>${code}</strong>. It expires in ${OTP_TTL_MINUTES} minutes.</p>`,
  });

  res.json({ message: 'OTP sent' });
};

const verifyOtp = async (req, res) => {
  const { email, otp, purpose } = req.body;
  if (!email || !otp || !purpose) return res.status(400).json({ message: 'email, otp and purpose required' });

  const codeRow = await prisma.otpCode.findFirst({
    where: {
      email,
      code: otp,
      purpose,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { created_at: 'desc' },
  });

  if (!codeRow) return res.status(400).json({ message: 'Invalid or expired OTP' });

  await prisma.otpCode.update({ where: { id: codeRow.id }, data: { used: true } });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'email required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // send OTP for reset
  req.body.purpose = 'forgot_password';
  await sendOtp(req, res);
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) return res.status(400).json({ message: 'email, otp, newPassword required' });

  const codeRow = await prisma.otpCode.findFirst({
    where: {
      email,
      code: otp,
      purpose: 'forgot_password',
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { created_at: 'desc' },
  });

  if (!codeRow) return res.status(400).json({ message: 'Invalid or expired OTP' });

  await prisma.otpCode.update({ where: { id: codeRow.id }, data: { used: true } });

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { email }, data: { passwordHash } });
  res.json({ message: 'Password reset successful' });
};

export {
  signup,
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
};
