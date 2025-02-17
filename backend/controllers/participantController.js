const Participant = require("../models/Participant");
const { web3js, contract } = require("../config/web3");

// @desc   Register a new participant in MongoDB & Blockchain
exports.addParticipant = async (req, res) => {
  try {
    const { name, role, location, address } = req.body;

    if (!name || !role || !location || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save participant in MongoDB
    const participant = new Participant({ name, role, location, address });
    await participant.save();

    res.status(201).json({ message: "Participant registered", participant });

  } catch (error) {
    console.error("Error adding participant:", error);
    res.status(500).json({ error: "Error adding participant" });
  }
};

// @desc   Get all participants
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};