const Shipment = require("../models/Shipment");

// @desc   Create a new shipment in MongoDB
exports.createShipment = async (req, res) => {
  try {
    const { medicineId, sender, receiver, trackingId } = req.body;

    if (!medicineId || !sender || !receiver || !trackingId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const shipment = new Shipment({
      medicineId,
      sender,
      receiver,
      trackingId,
      status: "Pending",
    });

    await shipment.save();

    res.status(201).json({ message: "Shipment created", shipment });

  } catch (error) {
    console.error("Error creating shipment:", error);
    res.status(500).json({ error: "Error creating shipment" });
  }
};

// @desc   Get all shipments
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};