import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      reviews: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

export const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    include: { reviews: true },
  });
};

export const createProduct = async (data) => {
  const {
    product_detail,
    price,
    old_price = 0,
    rating = 0,
    total_ratings = 0,
    total_reviews = 0,
    shop_name,
    shop_followers = 0,
    shop_total_products = 0,
    shop_rating = 0,
    shop_total_ratings = 0,
    highlights = null,
    image_url_1 = null,
    image_url_2 = null,
    image_url_3 = null,
    image_url_4 = null,
  } = data;

  return prisma.product.create({
    data: {
      product_detail,
      price: Number(price),
      old_price: Number(old_price),
      rating: Number(rating),
      total_ratings: Number(total_ratings),
      total_reviews: Number(total_reviews),
      shop_name,
      shop_followers: Number(shop_followers),
      shop_total_products: Number(shop_total_products),
      shop_rating: Number(shop_rating),
      shop_total_ratings: Number(shop_total_ratings),
      highlights,
      image_url_1,
      image_url_2,
      image_url_3,
      image_url_4,
    },
  });
};

export const updateProduct = async (id, data) => {
  const {
    product_detail,
    price,
    old_price,
    rating,
    total_ratings,
    total_reviews,
    shop_name,
    shop_followers,
    shop_total_products,
    shop_rating,
    shop_total_ratings,
    highlights,
    image_url_1,
    image_url_2,
    image_url_3,
    image_url_4,
  } = data;

  return prisma.product.update({
    where: { id: Number(id) },
    data: {
      product_detail,
      price: price !== undefined ? Number(price) : undefined,
      old_price: old_price !== undefined ? Number(old_price) : undefined,
      rating: rating !== undefined ? Number(rating) : undefined,
      total_ratings: total_ratings !== undefined ? Number(total_ratings) : undefined,
      total_reviews: total_reviews !== undefined ? Number(total_reviews) : undefined,
      shop_name,
      shop_followers: shop_followers !== undefined ? Number(shop_followers) : undefined,
      shop_total_products: shop_total_products !== undefined ? Number(shop_total_products) : undefined,
      shop_rating: shop_rating !== undefined ? Number(shop_rating) : undefined,
      shop_total_ratings: shop_total_ratings !== undefined ? Number(shop_total_ratings) : undefined,
      highlights,
      image_url_1,
      image_url_2,
      image_url_3,
      image_url_4,
    },
  });
};

export const deleteProduct = async (id) => {
  return prisma.product.delete({ where: { id: Number(id) } });
};