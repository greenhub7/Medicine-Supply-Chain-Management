const express = require("express");
const router = express.Router();
const { addMedicine, getMedicineById, getMedicineHistory, getMedicineStage, assignParticipantToMedicine } = require("../controllers/medicineController");

router.post("/add", addMedicine);
router.get("/", getMedicineHistory);
router.get("/:id", getMedicineById);
router.get("/stage/:id", getMedicineStage);
router.post("/medicines/assign", assignParticipantToMedicine);

module.exports = router;