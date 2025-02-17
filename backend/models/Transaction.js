const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  medicineId: { type: Number, required: true },
  participant: { type: String, required: true }, // Ethereum address
  action: {
    type: String,
    enum: [
      "Raw Material Supplied",
      "Manufactured",
      "Distributed",
      "Available for Sale",
      "Sold",
    ],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);