const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  medicineId: { type: Number, required: true },
  transactionType: { type: String, enum: ["MEDICINE_CREATED", "TRANSFER_MEDICINE"], required: true },
  transactionHash: { type: String, required: true },
  details: {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", default: null },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", default: null },
    status: { type: String, enum: ["Shipped", "Received", "In Transit", "Completed"], default: "Shipped" },
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
