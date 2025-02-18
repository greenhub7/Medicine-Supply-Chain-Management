const express = require("express");
const {
  recordTransaction,
  getTransactions
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/add", recordTransaction);
router.get("/", getTransactions);
// router.get("/:id/history", getTransactionHistory);

module.exports = router;