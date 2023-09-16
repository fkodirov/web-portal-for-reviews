const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const ReviewController = require("../controllers/ReviewController");
const authMiddleware = require("../middleware/authMiddleware");
const LikeController = require("../controllers/LikeController");
const RatingController = require("../controllers/RatingController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/user/:id", authMiddleware, userController.getUser);
router.post("/review", authMiddleware, ReviewController.addReview);
router.post("/reviews", ReviewController.getReviews);
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
router.delete("/likes", authMiddleware, LikeController.deleteLike);
router.get("/ratings/:id", authMiddleware, RatingController.getUserRatings);
router.post("/ratings", authMiddleware, RatingController.addRating);
router.put("/ratings", authMiddleware, RatingController.updateRating);
router.delete("/ratings", authMiddleware, RatingController.deleteRating);

module.exports = router;
