const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
    medicineId: Number,
    name: String,
    description: String,
    supplier: String,
    manufacturer: String,
    distributor: String,
    retailer: String,
    stage: String,
});

module.exports = mongoose.model("Medicine", MedicineSchema);
