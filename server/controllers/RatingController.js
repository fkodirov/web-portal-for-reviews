// const connection = require("../db/dbconnect");
// const Rating = require("../models/Rating");
const ratingService = require("../services/rating-service");

class RatingController {
  async getUserRatings(req, res, next) {
    try {
      const userId = +req.params.id;
      const ratings = await ratingService.getAllRating(userId);
      res.json(ratings);
    } catch (error) {
      next(error);
    }
  }
  async addRating(req, res, next) {
    try {
      const { userId, reviewId, rating } = req.body;
      await ratingService.addRating(userId, reviewId, rating);
      res.json({ message: "Rating added." });
    } catch (error) {
      next(error);
    }
  }

  async updateRating(req, res, next) {
    try {
      const { userId, reviewId, rating } = req.body;
      await ratingService.updateRating(userId, reviewId, rating);
      res.json({ message: "Rating updated." });
    } catch (error) {
      next(error);
    }
  }

  async deleteRating(req, res, next) {
    try {
      const { reviewId, userId } = req.body;
      await ratingService.deleteRating(reviewId, userId);
      res.json({ message: "Rating deleted." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RatingController();
