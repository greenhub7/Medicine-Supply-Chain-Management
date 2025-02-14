const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
    address: String,
    name: String,
    location: String,
    role: String,
});

module.exports = mongoose.model("Participant", ParticipantSchema);
