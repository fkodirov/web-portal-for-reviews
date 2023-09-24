require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const router = require("./router/index");
const routerGoogle = require("./router/google");
const routerFacebook = require("./router/facebook");
const PORT = 5000;
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
require("./passport");
const app = express();
app.use(express.json());
app.use(cookieParse());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routerGoogle);
app.use("/", routerFacebook);
app.use("/api", router);
const start = () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
