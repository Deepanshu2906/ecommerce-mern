const express = require("express");
const colors = require("colors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

app.listen(PORT, () => {
  console.log(
    `server started on ${process.env.DEV_MODE} mode and  on  the ${PORT} port`
      .bgBlue.white
  );
});
