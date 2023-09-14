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
  async getUserReviews(userId) {
    const reviews = await reviewModel.findAll({
      where: { userId },
    });
    return reviews;
  }
  async deleteReview(id) {
    await reviewModel.destroy({
      where: { id },
    });
  }
  async addReview(
    title,
    nameofart,
    category,
    tags,
    text,
    img,
    authorRating,
    rating,
    votes,
    status,
    userId
  ) {
    const newReview = await reviewModel.create({
      title,
      nameofart,
      category,
      tags,
      text,
      img,
      authorRating,
      rating,
      votes,
      status,
      userId,
    });
    await newReview.save();
  }
  async updateReview(
    id,
    title,
    nameofart,
    category,
    tags,
    text,
    img,
    authorRating,
    status
  ) {
    const review = await reviewModel.findOne({
      where: { id },
    });
    review.title = title;
    review.nameofart = nameofart;
    review.category = category;
    review.tags = tags;
    review.text = text;
    review.img = img;
    review.authorRating = authorRating;
    review.status = status;
    await review.save();
  }
  async deleteImage(id) {
    const review = await reviewModel.findOne({
      where: { id },
    });
    review.img = null;
    await review.save();
  }
  async updateRating(id, rating, votes) {
    const review = await reviewModel.findOne({
      where: { id },
    });
    review.rating = rating;
    review.votes = votes;
    await review.save();
  }
}

module.exports = new ReviewService();
