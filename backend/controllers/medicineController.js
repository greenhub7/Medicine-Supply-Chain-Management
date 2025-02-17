const Medicine = require("../models/Medicine");
const Transaction = require("../models/Transaction");
const { web3js, contract } = require("../config/web3");

// @desc   Add medicine to Blockchain & MongoDB
exports.addMedicine = async (req, res) => {
  try {
    const { name, description, ownerAddress, batchNumber, manufacturingDate, expiryDate, price } = req.body;

    if (!name || !description || !ownerAddress) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get nonce & gas price
    const nonce = await web3js.eth.getTransactionCount(ownerAddress);
    const gasPrice = await web3js.eth.getGasPrice();

    // Encode the function call for `addMedicine`
    const data = contract.methods.addMedicine(name, description).encodeABI();

    // Create transaction object
    const tx = {
      from: ownerAddress,
      to: contract.options.address,
      gas: 2000000,
      gasPrice: gasPrice,
      nonce: nonce,
      data: data,
    };

    // Sign and send transaction
    const signedTx = await web3js.eth.accounts.signTransaction(tx, process.env.OWNER_PRIVATE_KEY);
    const receipt = await web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Get latest medicine ID from contract
    const medicineCounter = await contract.methods.medicineCounter().call();

    // Save in MongoDB
    const medicine = new Medicine({
      blockchainId: parseInt(medicineCounter),
      name,
      description,
      batchNumber,
      manufacturingDate,
      expiryDate,
      price,
      stage: "Ordered",
    });

    await medicine.save();

    // Record transaction
    const transaction = new Transaction({
      medicineId: medicine.blockchainId,
      transactionType: "MEDICINE_CREATED",
      transactionHash: receipt.transactionHash,
      details: { medicine: medicine._id },
    });

    await transaction.save();

    res.status(201).json({ message: "Medicine added successfully", medicine, transaction });

  } catch (error) {
    console.error("Error adding medicine:", error);
    res.status(500).json({ error: error.message });
  }
};

// @desc   Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ error: "Error fetching medicines" });
  }
};

// @desc   Get medicine history
exports.getMedicineHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ medicineId: req.params.id }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medicine history" });
  }
};

// @desc   Get medicine stage from Blockchain
exports.getMedicineStage = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const stage = await contract.methods.getMedicineStage(medicineId).call();
    res.json({ medicineId, stage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching medicine stage" });
  }
};