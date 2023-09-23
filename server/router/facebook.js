require("dotenv").config();
const Router = require("express");
const passport = require("passport");
const router = new Router();

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/auth/facebook/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    });
  }
});

router.get("/auth/facebook/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failure",
  });
});

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/facebook/login/failed",
  })
);

router.get("/auth/facebook/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
