const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const ReviewController = require("../controllers/ReviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.post("/review", authMiddleware, ReviewController.addReview);
// router.get("/reviews", authMiddleware, userController.getUsers);
// router.get("/reviews/:id", authMiddleware, userController.getUser);
// router.delete("/reviews/:id", authMiddleware, userController.deleteUsers);
// router.put("/reviews/:id", authMiddleware, userController.updateUsers);

module.exports = router;
