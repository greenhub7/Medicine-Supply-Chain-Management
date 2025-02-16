const Medicine = require("../models/Medicine");
const Transaction = require("../models/Transaction");
const { web3js, contract } = require("../config/web3");

// @desc   Add medicine to Blockchain & MongoDB
exports.addMedicine = async (req, res) => {
  try {
    const { name, description, ownerAddress } = req.body;

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
      supplier: null, 
      manufacturer: null,
      distributor: null,
      retailer: null,
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
    res.status(500).json({ error: error.message});
  }
};

// @desc   Get medicine details by Blockchain ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ blockchainId: req.params.id });

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medicine" });
  }
};

// @desc   Get medicine history (transactions)
exports.getMedicineHistory = async (req, res) => {
  try {
    const medicines = await Medicine.find(); // Fetch all medicines

    if (medicines.length === 0) {
      return res.status(404).json({ error: "No medicines found" });
    }

    res.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ error: "Error fetching medicines" });
  }
};

exports.assignParticipantToMedicine = async (req, res) => {
  try {
    const { medicineId, participantAddress, role } = req.body;

    if (!medicineId || !participantAddress || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find medicine
    const medicine = await Medicine.findOne({ blockchainId: medicineId });
    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    // Find participant
    const participant = await Participant.findOne({ address: participantAddress, role });
    if (!participant) {
      return res.status(404).json({ error: `${role} not found` });
    }

    // Assign participant to medicine
    if (role === "Supplier") medicine.supplier = participantAddress;
    else if (role === "Manufacturer") medicine.manufacturer = participantAddress;
    else if (role === "Distributor") medicine.distributor = participantAddress;
    else if (role === "Retailer") medicine.retailer = participantAddress;

    await medicine.save();

    res.status(200).json({ message: `${role} assigned to medicine successfully`, medicine });

  } catch (error) {
    console.error("Error assigning participant:", error);
    res.status(500).json({ error: error.message });
  }
};

// @desc   Get current stage of medicine from Blockchain
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
