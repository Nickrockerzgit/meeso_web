import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'nickrockerz060@gmail.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Seed user already exists');
    return;
  }

  const passwordHash = await bcrypt.hash('12345678', 10);
  await prisma.user.create({
    data: {
      name: 'rishabh',
      email,
      passwordHash,
      role: 'admin',
    },
  });

  console.log('Seed user created: rishabh', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
