const Participant = require("../models/Participant");
const { web3js, contract } = require("../config/web3");

// @desc   Register a new participant in MongoDB & Blockchain
exports.addParticipant = async (req, res) => {
  try {
    const { name, role, location, address } = req.body;

    if (!name || !role || !location || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const nonce = await web3js.eth.getTransactionCount(address);
    const gasPrice = await web3js.eth.getGasPrice();

    let addFunction;
    switch (role.toLowerCase()) {
      case "supplier":
        addFunction = contract.methods.addSupplier;
        break;
      case "manufacturer":
        addFunction = contract.methods.addManufacturer;
        break;
      case "distributor":
        addFunction = contract.methods.addDistributor;
        break;
      case "retailer":
        addFunction = contract.methods.addRetailer;
        break;
      default:
        return res.status(400).json({ error: "Invalid participant role" });
    }

    const tx = {
      from: address,
      to: contract.options.address,
      gas: 2000000,
      gasPrice: gasPrice,
      nonce: nonce,
      data: addFunction(address, name, location).encodeABI(),
    };

    const signedTx = await web3js.eth.accounts.signTransaction(tx, process.env.OWNER_PRIVATE_KEY);
    const receipt = await web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

    const participant = new Participant({ name, role, location, address });
    await participant.save();

    res.status(201).json({ message: "Participant registered", participant, transactionHash: receipt.transactionHash });
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
