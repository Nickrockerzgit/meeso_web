import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getReviewsByProduct = async (productId) => {
  return prisma.productReview.findMany({
    where: { productId: Number(productId) },
    orderBy: { created_at: 'desc' },
  });
};

export const createReview = async (data) => {
  const {
    productId,
    rating,
    comment,
    reviewerName,
    helpful = 0,
    reviewImageUrl,
  } = data;

  return prisma.productReview.create({
    data: {
      productId: Number(productId),
      rating: Number(rating),
      comment,
      reviewerName,
      helpful: Number(helpful),
      reviewImageUrl,
    },
  });
};

export const updateReview = async (id, data) => {
  return prisma.productReview.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteReview = async (id) => {
  return prisma.productReview.delete({ where: { id: Number(id) } });
};