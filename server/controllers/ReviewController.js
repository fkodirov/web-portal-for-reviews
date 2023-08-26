const connection = require("../db/dbconnect");
const Review = require("../models/Review");
const reviewService = require("../services/review-service");
class ReviewController {
  async getReviews(req, res, next) {
    try {
      const reviews = await reviewService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
  async getReview(req, res, next) {
    try {
      const id = +req.params.id;
      const review = await reviewService.getReview(id);
      res.json(review);
    } catch (error) {
      next(error);
    }
  }
  async deleteReview(req, res, next) {
    try {
      const reviewId = +req.params.id;
      await reviewService.deleteReview(reviewId);
      res.json({ message: "Review deleted." });
    } catch (error) {
      next(error);
    }
  }
  async updateUsers(req, res, next) {
    try {
      const { title, nameofart, category, tags, text, img, rating } = req.body;
      const reviewId = +req.params.id;
      await reviewService.updateReview(
        reviewId,
        title,
        nameofart,
        category,
        tags,
        text,
        img,
        rating
      );
      res.json({ message: "Review updated." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();
