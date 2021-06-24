const express = require("express");
const transaction = express.Router();
const transArray = require("../models/transaction");

const checkTransaction = (req, res, next) => {
  const { date, name, amount, from, negative } = req.body;
  if (
    date === undefined ||
    name === undefined ||
    amount === undefined ||
    from === undefined ||
    negative === undefined
  ) {
    res
      .status(422)
      .json({ success: false, payload: "Include all required fields!" });
  } else {
    next();
  }
};

transaction.get("/", (req, res) => {
  res.status(200).json(transArray);
});

transaction.get("/total", (req, res) => {
  let total = 0;
  for (let totalSum of transArray) {
    if (!totalSum.negative) {
      total += Number(totalSum.amount);
    } else {
      total += Number(totalSum.amount) * -1;
    }
  }
  res.status(200).json(total);
});

transaction.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transArray[index]) {
    res.status(200).json(transArray[index]);
  } else {
    res.redirect("/404");
  }
});

transaction.post("/", checkTransaction, (req, res) => {
  transArray.push(req.body);
  res.json(transArray[transArray.length - 1]);
});

transaction.put("/:index", (req, res) => {
  const { index } = req.params;
  if (transArray[index]) {
    transArray[index] = req.body;
    res.status(200).json(transArray[index]);
  } else {
    res.redirect("/404");
  }
});

transaction.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (transArray[index]) {
    const deleted = transArray.splice(index, 1);
    res.status(200).json(deleted[0]);
  } else {
    res.redirect("/404");
  }
});

module.exports = transaction;
