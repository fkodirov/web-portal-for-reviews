const ratingModel = require("../models/Rating");
class RatingService {
  async getAllRating(userId) {
    const ratings = await ratingModel.findAll({
      attributes: { exclude: ["id"] },
      where: { userId },
    });
    return ratings;
  }
  async deleteRating(reviewId, userId) {
    if (reviewId) {
      await ratingModel.destroy({
        where: { reviewId, userId },
      });
    } else {
      await ratingModel.destroy({
        where: { reviewId },
      });
    }
  }
  async addRating(userId, reviewId, rating) {
    const newRating = await ratingModel.create({
      userId,
      reviewId,
      rating,
    });
    await newRating.save();
  }

  async updateRating(userId, reviewId, rating) {
    const updateRating = await ratingModel.findOne({
      where: { userId, reviewId },
    });
    updateRating.rating = rating;
    await updateRating.save();
  }
}

module.exports = new RatingService();
