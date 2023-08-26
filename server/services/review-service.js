const reviewModel = require("../models/Review");
const apiError = require("../exceptions/api-error");
class ReviewService {
  async getAllReviews() {
    const reviews = await reviewModel.findAll();
    return reviews;
  }
  async getReview(id) {
    const review = await reviewModel.findOne({
      where: { id },
    });
    return review;
  }
  async deleteReview(id) {
    await reviewModel.destroy({
      where: { id },
    });
  }
  async updateReview(id, title, nameofart, category, tags, text, img, rating) {
    const review = await userModel.findOne({
      where: { id },
    });
    review = { title, nameofart, category, tags, text, img, rating };
    await review.save();
  }
}

module.exports = new UserService();
