import * as reviewModel from '../models/review.model.js';
import imagekit from "../config/imagekit.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getReviewsByProduct(req.params.productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {

    let imageUrl = null;

    // Upload image to ImageKit
    if (req.file) {

      const uploaded = await imagekit.upload({
        file: req.file.buffer,
        fileName: Date.now() + "-" + req.file.originalname,
        folder: "reviews"
      });

      imageUrl = uploaded.url;

    }

    const review = await reviewModel.createReview({
  productId: req.params.productId,
  rating: req.body.rating,
  comment: req.body.comment,
  reviewerName: req.body.reviewerName,
  reviewImageUrl: imageUrl
});

    res.status(201).json(review);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await reviewModel.updateReview(req.params.id, req.body);
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await reviewModel.deleteReview(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};