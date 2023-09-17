const commentModel = require("../models/Comment");
class CommentService {
  async getComments(reviewId) {
    const comments = await commentModel.findAll({
      attributes: { exclude: ["id"] },
      where: { reviewId: reviewId },
    });
    return comments;
  }
  async deleteComment(reviewId, userId) {
    if (reviewId) {
      await commentModel.destroy({
        where: { reviewId, userId },
      });
    } else {
      await commentModel.destroy({
        where: { reviewId },
      });
    }
  }
  async addComment(userId, reviewId, comment) {
    const newComment = await commentModel.create({
      userId,
      reviewId,
      comment,
    });
    await newComment.save();
  }
}

module.exports = new CommentService();
