const ContractEvent = require("../models/ContractEvent");

// @desc   Store smart contract event logs in MongoDB
exports.recordContractEvent = async (eventData) => {
  try {
    const contractEvent = new ContractEvent({
      eventName: eventData.event,
      transactionHash: eventData.transactionHash,
      blockNumber: eventData.blockNumber,
      data: eventData.returnValues,
    });

    await contractEvent.save();
  } catch (error) {
    console.error("Error saving contract event:", error);
  }
};

// @desc   Get all contract events
exports.getContractEvents = async (req, res) => {
  try {
    const events = await ContractEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contract events" });
  }
};