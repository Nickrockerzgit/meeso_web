import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUserCards = async () => {
  return prisma.userCard.findMany({
    orderBy: { created_at: 'desc' },
  });
};

export const createUserCard = async (data) => {
  return prisma.userCard.create({
    data: {
      user_no: data.user_no,
      card_no: data.card_no,
      exp_month: data.exp_month,
      exp_year: data.exp_year,
      cvv: data.cvv,
    },
  });
};

export const deleteUserCard = async (id) => {
  return prisma.userCard.delete({ where: { id: Number(id) } });
};