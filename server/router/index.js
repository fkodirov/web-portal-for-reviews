const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const ReviewController = require("../controllers/ReviewController");
const authMiddleware = require("../middleware/authMiddleware");
const LikeController = require("../controllers/LikeController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/review", authMiddleware, ReviewController.addReview);
router.get("/reviews", authMiddleware, ReviewController.getReviews);
router.put("/reviews/:id", authMiddleware, ReviewController.updateReview);
router.get("/reviews/:id", authMiddleware, ReviewController.getReview);
router.put("/image/:id", authMiddleware, ReviewController.deleteImage);
router.delete("/reviews/:id", authMiddleware, ReviewController.deleteReview);
router.get("/likes/:id", authMiddleware, LikeController.getUserLikes);
router.post("/likes", authMiddleware, LikeController.addLike);
router.delete("/likes", authMiddleware, LikeController.deleteLike);

module.exports = router;
