const Transaction = require("../models/Transaction");
const { web3js, contract } = require("../config/web3");

// @desc   Record a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { medicineId, from, to, status } = req.body;

    if (!medicineId || !from || !to || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const nonce = await web3js.eth.getTransactionCount(from);
    const gasPrice = await web3js.eth.getGasPrice();

    const tx = {
      from: from,
      to: contract.options.address,
      gas: 2000000,
      gasPrice: gasPrice,
      nonce: nonce,
      data: contract.methods.transferMedicine(medicineId, to).encodeABI(),
    };

    const signedTx = await web3js.eth.accounts.signTransaction(tx, process.env.OWNER_PRIVATE_KEY);
    const receipt = await web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

    const transaction = new Transaction({
      medicineId,
      transactionType: "TRANSFER_MEDICINE",
      transactionHash: receipt.transactionHash,
      details: { from, to, status },
    });

    await transaction.save();
    res.status(201).json({ message: "Transaction recorded", transaction });

  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Error adding transaction" });
  }
};

// @desc   Get medicine transaction history
exports.getMedicineHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ medicineId: req.params.id }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medicine history" });
  }
};