const express = require("express");
const { createShipment, getAllShipments } = require("../controllers/shipmentController");

const router = express.Router();

router.post("/add", createShipment);
router.get("/", getAllShipments);

module.exports = router;