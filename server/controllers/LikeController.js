const likeService = require("../services/like-service");

class LikeController {
  async getUserLikes(req, res, next) {
    try {
      const userId = +req.params.id;
      const likes = await likeService.getAllLike(userId);
      res.json(likes);
    } catch (error) {
      next(error);
    }
  }
  async addLike(req, res, next) {
    try {
      const { userId, reviewId } = req.body;
      await likeService.addLike(userId, reviewId);
      res.json({ message: "Like added." });
    } catch (error) {
      next(error);
    }
  }

  async deleteLike(req, res, next) {
    try {
      const { userId, reviewId } = req.body;
      await likeService.deleteLike(userId, reviewId);
      res.json({ message: "Like deleted." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LikeController();
