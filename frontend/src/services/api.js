import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Medicines
export const addMedicine = (medicineData) => axios.post(`${API_URL}/medicines/add`, medicineData);
export const getMedicines = () => axios.get(`${API_URL}/medicines/`);
export const getMedicineHistory = (medicineId) => axios.get(`${API_URL}/medicines/${medicineId}/history`);
export const getMedicineStage = (medicineId) => axios.get(`${API_URL}/medicines/${medicineId}/stage`);

// Participants
export const addParticipant = (participantData) => axios.post(`${API_URL}/participants/add`, participantData);
export const getParticipants = () => axios.get(`${API_URL}/participants/`);

// Transactions
export const addTransaction = (transactionData) => axios.post(`${API_URL}/transactions/add`, transactionData);
export const getAllTransactions = () => axios.get(`${API_URL}/transactions/`);
export const getTransactionHistory = (medicineId) => axios.get(`${API_URL}/transactions/${medicineId}/history`);

// Shipments
export const addShipment = (shipmentData) => axios.post(`${API_URL}/shipments/add`, shipmentData);
export const getShipments = () => axios.get(`${API_URL}/shipments/`);

// Contract Events
export const getContractEvents = () => axios.get(`${API_URL}/contract-events/`);