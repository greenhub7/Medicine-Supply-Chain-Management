const Participant = require("../models/Participant");
const { contract, web3 } = require("../config/web3");

exports.addParticipant = async (req, res) => {
    try {
        const { address, name, location, role, ownerAddress } = req.body;
        const accounts = await web3.eth.getAccounts();

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
                return res.status(400).json({ error: "Invalid role" });
        }

        await addFunction(address, name, location).send({ from: ownerAddress });

        res.json({ message: "Participant registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error registering participant" });
    }
};