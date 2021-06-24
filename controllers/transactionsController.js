const express = require("express");
const transaction = express.Router();
const transArray = require("../models/transaction");

transaction.get("/", (req, res) => {
  res.json(transArray);
});

module.exports = transaction;
