const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  medicineId: { type: Number, required: true },
  sender: { type: String, required: true }, // Ethereum address
  receiver: { type: String, required: true }, // Ethereum address
  trackingId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["Pending", "InTransit", "Delivered"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Shipment", ShipmentSchema);