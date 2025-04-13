import { useState, useEffect } from "react";
import { addMedicine, getMedicines, getMedicineStage, getMedicineHistory } from "../services/api";
import { toast } from "react-toastify";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [medicineHistory, setMedicineHistory] = useState([]);
  const [medicineStage, setMedicineStage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ownerAddress: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  // const handleAddMedicine = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addMedicine(formData);
  //     toast.success("Medicine added successfully!");
  //     fetchMedicines();
  //     setFormData({
  //       name: "",
  //       description: "",
  //       ownerAddress: "",
  //     });
  //   } catch (error) {
  //     toast.error("Error adding medicine");
  //     console.error(error);
  //   }
  // };

  const handleGetHistory = async () => {
    try {
      const response = await getMedicineHistory(medicineId);
      setMedicineHistory(response.data);
    } catch (error) {
      toast.error("Error fetching medicine history");
    }
  };

  const handleGetStage = async () => {
    try {
      const response = await getMedicineStage(medicineId);
      setMedicineStage(response.data.stage);
    } catch (error) {
      toast.error("Error fetching medicine stage");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Manage Medicines</h2>

      {/* Medicine List */}
      <h3 className="text-2xl font-semibold mb-4">Medicine List</h3>
      <ul className="space-y-2">
        {medicines.length === 0 ? <p>No medicines found.</p> : medicines.map((med) => (
          <li key={med.blockchainId} className="border p-4">
            <p><strong>ID:</strong> {med.blockchainId}</p>
            <p><strong>Name:</strong> {med.name}</p>
            <p><strong>Description:</strong> {med.description}</p>
            <p><strong>Stage:</strong> {med.stage}</p>
          </li>
        ))}
      </ul>

      {/* Medicine History & Stage */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Medicine Actions</h3>
        <div className="flex space-x-3 mb-6">
          <input type="text" placeholder="Enter Medicine ID" className="border p-2 w-full"
            value={medicineId} onChange={(e) => setMedicineId(e.target.value)} required />
          <button onClick={handleGetHistory} className="bg-green-500 hover:bg-green-600 transition-all text-white p-2">Get History</button>
          <button onClick={handleGetStage} className="bg-blue-500 hover:bg-blue-600 transition-all text-white p-2">Get Stage</button>
        </div>

        {/* Display Medicine Stage */}
        {medicineStage && (
          <div className="mt-4 p-4 border">
            <p><strong>Medicine ID:</strong> {medicineId}</p>
            <p><strong>Current Stage:</strong> {medicineStage}</p>
          </div>
        )}

        {/* Display Medicine History */}
        <h4 className="text-2xl font-semibold mt-4">Medicine History</h4>
        <ul className="mt-2 space-y-2">
          {medicineHistory.length === 0 ? <p>No history found.</p> : medicineHistory.map((txn, index) => (
            <li key={index} className="border p-3">
              <p><strong>Action:</strong> {txn.action}</p>
              <p><strong>Participant:</strong> {txn.participant}</p>
              <p><strong>Timestamp:</strong> {new Date(txn.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Medicine;