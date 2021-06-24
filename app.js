// Dependencies
const express = require("express");
const cors = require("cors");
const transactionsController = require("./controllers/transactionsController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[DEVELOPMENT] Middleware is running!!`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the budgeting App!");
});

app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
  res
    .status(404)
    .send(
      `<h1>404 Page Not Found!</h1> <br/> <img src="https://i0.wp.com/www.additudemag.com/wp-content/uploads/2020/10/Budgeting_1920x1080.jpg?resize=1280%2C720px&ssl=1" alt="budget" />`,
    );
});
module.exports = app;
