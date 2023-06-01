const express = require("express");
const colors = require("colors");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");

// configure env
require("dotenv").config();
// PORT
//database config
connectDB();

const PORT = process.env.PORT || 8080;
// middleware
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1> Hello world </h1>");
});

app.listen(PORT, () => {
  console.log(
    `server started on ${process.env.DEV_MODE} mode and  on  the ${PORT} port`
      .bgBlue.white
  );
});
