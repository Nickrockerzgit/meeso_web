import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSetting = async (key) => {
  return prisma.appSetting.findUnique({
    where: { setting_key: key },
  });
};

export const upsertSetting = async (key, value) => {
  return prisma.appSetting.upsert({
    where: { setting_key: key },
    update: { setting_value: value },
    create: {
      setting_key: key,
      setting_value: value,
    },
  });
};

export const getAllSettings = async () => {
  return prisma.appSetting.findMany();
};