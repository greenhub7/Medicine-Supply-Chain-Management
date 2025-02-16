const express = require("express");
const router = express.Router();
const { addTransaction, getMedicineHistory } = require("../controllers/transactionController");

router.post("/add", addTransaction);
router.get("/history/:id", getMedicineHistory);

module.exports = router;