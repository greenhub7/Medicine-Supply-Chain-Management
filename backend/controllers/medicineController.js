const Medicine = require("../models/Medicine");
const { contract, web3 } = require("../config/web3");

exports.addMedicine = async (req, res) => {
    try {
        const { name, description, ownerAddress } = req.body;
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addMedicine(name, description).send({ from: ownerAddress });
        res.json({ message: "Medicine added to blockchain" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding medicine" });
    }
};

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