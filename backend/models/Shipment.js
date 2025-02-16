const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  medicine: { type: Number, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
  status: { type: String, enum: ["In Transit", "Delivered"], default: "In Transit" },
  trackingId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Shipment", shipmentSchema);