const express = require("express");
const router = express.Router();
const { addMedicine, getMedicineStage } = require("../controllers/medicineController");

router.post("/add", addMedicine);
router.get("/stage/:medicineId", getMedicineStage);

module.exports = router;