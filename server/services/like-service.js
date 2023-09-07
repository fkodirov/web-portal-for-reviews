const likeModel = require("../models/Like");
const apiError = require("../exceptions/api-error");
class LikeService {
  async getAllLike(userId) {
    const likes = await likeModel.findAll({
      where: { userId },
    });
    return likes;
  }
  async deleteLike(userId, reviewId) {
    await likeModel.destroy({
      where: { userId, reviewId },
    });
  }
  async addLike(userId, reviewId) {
    const newLike = await likeModel.create({
      userId,
      reviewId,
    });
    await newLike.save();
  }
}

module.exports = new LikeService();
