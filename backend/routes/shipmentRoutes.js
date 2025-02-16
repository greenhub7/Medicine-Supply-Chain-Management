const express = require("express");
const router = express.Router();
const { createShipment, getAllShipments } = require("../controllers/shipmentController");

router.post("/create", createShipment);
router.get("/", getAllShipments);

module.exports = router;