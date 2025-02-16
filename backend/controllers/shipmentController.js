const Shipment = require("../models/Shipment");
const { web3js, contract } = require("../config/web3");

// @desc   Create a new shipment in MongoDB & Blockchain
exports.createShipment = async (req, res) => {
  try {
    const { medicineId, sender, receiver, trackingId } = req.body;

    if (!medicineId || !sender || !receiver || !trackingId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const nonce = await web3js.eth.getTransactionCount(sender);
    const gasPrice = await web3js.eth.getGasPrice();

    const tx = {
      from: sender,
      to: contract.options.address,
      gas: 2000000,
      gasPrice: gasPrice,
      nonce: nonce,
      data: contract.methods.shipMedicine(medicineId, receiver).encodeABI(),
    };

    const signedTx = await web3js.eth.accounts.signTransaction(tx, process.env.OWNER_PRIVATE_KEY);
    const receipt = await web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

    const shipment = new Shipment({
      medicine: medicineId,
      sender,
      receiver,
      trackingId,
      status: "In Transit",
    });

    await shipment.save();

    res.status(201).json({ message: "Shipment created", shipment, transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error("Error creating shipment:", error);
    res.status(500).json({ error: "Error creating shipment" });
  }
};

// @desc   Get all shipments
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate("medicine sender receiver");
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};