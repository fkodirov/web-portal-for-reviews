const commentService = require("../services/comment-service");
const clients = [];
class CommentController {
  async getReviewComments(req, res, next) {
    try {
      const reviewId = +req.params.id;
      const comments = await commentService.getComments(reviewId);
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }
  async addComment(req, res, next) {
    try {
      const { userId, reviewId, comment } = req.body;
      await commentService.addComment(userId, reviewId, comment);
      const eventData = {
        userId,
        reviewId,
        comment,
        date: new Date().toString(),
      };
      const eventDataString = JSON.stringify(eventData);
      clients.forEach((clientResponse) => {
        clientResponse.write(`data: ${eventDataString}\n\n`);
        console.log(`data: ${eventDataString}\n\n`);
      });
      res.json({ message: "Comment added." });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { userId, reviewId } = req.body;
      await commentService.deleteComment(userId, reviewId);
      res.json({ message: "Like deleted." });
    } catch (error) {
      next(error);
    }
  }
  commentStream(req, res) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const clientResponse = res;
    clients.push(clientResponse);
    req.on("close", () => {
      const clientIndex = clients.indexOf(clientResponse);
      if (clientIndex !== -1) {
        clients.splice(clientIndex, 1);
      }
    });
  }
}

module.exports = new CommentController();
