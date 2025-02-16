const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["Supplier", "Manufacturer", "Distributor", "Retailer"], required: true },
  location: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Participant", participantSchema);