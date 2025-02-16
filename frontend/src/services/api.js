import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Medicine APIs
export const addMedicine = async (medicine) => axios.post(`${API_URL}/medicines/add`, medicine);
export const getMedicines = async () => axios.get(`${API_URL}/medicines`);
export const getMedicineById = async (id) => axios.get(`${API_URL}/medicines/${id}`);
export const getMedicineStage = async (id) => axios.get(`${API_URL}/medicines/stage/${id}`);
export const assignMedicineToParticipant = async (data) => axios.post(`${API_URL}/medicines/assign`, data);

// Participant APIs
export const addParticipant = async (participant) => axios.post(`${API_URL}/participants/register`, participant);
export const getParticipants = async () => axios.get(`${API_URL}/participants/`);

// Shipment APIs
export const getShipments = async () => axios.get(`${API_URL}/shipments/`);
export const addShipment = async (shipment) => axios.post(`${API_URL}/shipments/create`, shipment);

export const getTransactions = async () => axios.get(`${API_URL}/transactions/history/${id}`);