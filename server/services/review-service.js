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
  async addReview(title, nameofart, category, tags, text, img, rating, userId) {
    const newReview = await reviewModel.create({
      title,
      nameofart,
      category,
      tags,
      text,
      img,
      rating,
      userId,
    });
    await newReview.save();
  }
  async updateReview(id, title, nameofart, category, tags, text, img, rating) {
    const review = await reviewModel.findOne({
      where: { id },
    });
    review.title = title;
    review.nameofart = nameofart;
    review.category = category;
    review.tags = tags;
    review.text = text;
    review.img = img;
    review.rating = rating;
    await review.save();
  }
  async deleteImage(id) {
    const review = await reviewModel.findOne({
      where: { id },
    });
    review.img = null;
    await review.save();
  }
}

module.exports = new ReviewService();
