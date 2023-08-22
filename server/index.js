const express = require("express");
const cors = require("cors");
const PORT = 5000;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5000",
  })
);

const start = () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
