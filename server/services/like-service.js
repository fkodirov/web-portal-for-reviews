const likeModel = require("../models/Like");
const { Op } = require("sequelize");
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

  async getLikesReview(ids) {
    const likes = await likeModel.findAll({
      where: {
        reviewId: {
          [Op.in]: ids,
        },
      },
    });
    return likes;
  }
}

module.exports = new LikeService();
