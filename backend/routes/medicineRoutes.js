const express = require("express");
const router = express.Router();
const { addMedicine, getMedicineById, getMedicineHistory, getMedicineStage } = require("../controllers/medicineController");

router.post("/add", addMedicine);
router.get("/", getMedicineHistory);
router.get("/:id", getMedicineById);
router.get("/stage/:id", getMedicineStage);

module.exports = router;