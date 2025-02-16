const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  blockchainId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  supplier: { type: String, default: null },
  manufacturer: { type: String, default: null },
  distributor: { type: String, default: null },
  retailer: { type: String, default: null },
  stage: { type: String, required: true },
  batchNumber: { type: String },
  manufacturingDate: { type: Date },
  expiryDate: { type: Date },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Medicine', MedicineSchema);