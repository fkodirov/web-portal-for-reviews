require("dotenv").config();
const Router = require("express");
const passport = require("passport");
const router = new Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    });
  }
});

router.get("/auth/google/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failure",
  });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/google/login/failed",
  })
);

router.get("/auth/google/logout", (req, res) => {
  req.logout();
  res.clearCookie("connect.sid");
  res.redirect(process.env.CLIENT_URL);
});

// app.get('/auth/google/logout', function(req, res, next){
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect(process.env.CLIENT_URL);
//   });
// });

module.exports = router;
