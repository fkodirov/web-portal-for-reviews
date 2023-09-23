const Router = require("express");
const passport = require("passport");
const router = new Router();
const userController = require("../controllers/UserController");
const ReviewController = require("../controllers/ReviewController");
const authMiddleware = require("../middleware/authMiddleware");
const LikeController = require("../controllers/LikeController");
const RatingController = require("../controllers/RatingController");
const CommentController = require("../controllers/CommentController");
const SearchController = require("../controllers/SearchController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/users-name", userController.getUsersName);
router.get("/user/:id", authMiddleware, userController.getUser);
router.post("/review", authMiddleware, ReviewController.addReview);
router.post("/reviews", ReviewController.getReviews);
router.post("/reviewsbyids", ReviewController.getReviews);
router.get(
  "/user-reviews/:id",
  authMiddleware,
  ReviewController.getUserReviews
);
router.put("/reviews/:id", authMiddleware, ReviewController.updateReview);
router.put(
  "/reviews-rating/:id",
  authMiddleware,
  ReviewController.updateRating
);
router.get("/reviews/:id", ReviewController.getReview);
router.get("/tags", ReviewController.getTags);
router.put("/image/:id", authMiddleware, ReviewController.deleteImage);
router.delete("/reviews/:id", authMiddleware, ReviewController.deleteReview);
router.get("/likes/:id", authMiddleware, LikeController.getUserLikes);
router.post("/likes", authMiddleware, LikeController.addLike);
router.post("/likes-review", authMiddleware, LikeController.getLikesReview);
router.delete("/likes", authMiddleware, LikeController.deleteLike);
router.get("/ratings/:id", authMiddleware, RatingController.getUserRatings);
router.post("/ratings", authMiddleware, RatingController.addRating);
router.put("/ratings", authMiddleware, RatingController.updateRating);
router.delete("/ratings", authMiddleware, RatingController.deleteRating);
router.get("/comments/:id", CommentController.getReviewComments);
router.post("/comments", authMiddleware, CommentController.addComment);
router.delete("/comments", authMiddleware, CommentController.deleteComment);
router.get("/comments-sse", CommentController.commentStream);
router.post("/search", SearchController.search);

module.exports = router;
