import express from 'express';
import * as reviewController from '../controllers/review.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router({ mergeParams: true });
router.get('/', reviewController.getReviews);
router.post('/', upload.single("reviewImage"), reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;