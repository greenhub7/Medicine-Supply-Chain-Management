const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  getTransactionHistory,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/add", addTransaction);
router.get("/", getAllTransactions);
router.get("/:id/history", getTransactionHistory);

module.exports = router;