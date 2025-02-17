const mongoose = require("mongoose");

const ContractEventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  transactionHash: { type: String, required: true },
  blockNumber: { type: Number, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ContractEvent", ContractEventSchema);