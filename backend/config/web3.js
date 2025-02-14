const { Web3 } = require('web3');
require('dotenv').config();
const SupplyChainABI = require('../../build/contracts/SupplyChain.json');

const web3 = new Web3(process.env.GANACHE_URL);
const contract = new web3.eth.Contract(SupplyChainABI.abi, process.env.CONTRACT_ADDRESS);

module.export = {web3, contract}