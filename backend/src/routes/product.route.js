import express from 'express';
import * as productController from '../controllers/product.controller.js';
import upload from "../middleware/upload.middleware.js";


const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post(
  '/',
  upload.array("images", 4),
  productController.createProduct
);
router.put(
  '/:id',
  upload.array("images", 4),
  productController.updateProduct
);
router.delete('/:id', productController.deleteProduct);

export default router;