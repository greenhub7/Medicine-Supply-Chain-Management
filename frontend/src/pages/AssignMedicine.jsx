import { useEffect, useState } from "react";
import { getMedicines, getParticipants, assignMedicineToParticipant } from "../services/api";
import { toast } from "react-toastify";

const AssignMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [role, setRole] = useState("Supplier");

  useEffect(() => {
    fetchMedicines();
    fetchParticipants();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await getParticipants();
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleAssignMedicine = async (e) => {
    e.preventDefault();
    if (!selectedMedicine || !selectedParticipant || !role) {
      toast.error("Please select all fields");
      return;
    }

    try {
      await assignMedicineToParticipant({
        medicineId: selectedMedicine,
        participantAddress: selectedParticipant,
        role,
      });
      toast.success(`Medicine assigned to ${role} successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Error assigning medicine");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Assign Medicine to Participant</h2>

      <form onSubmit={handleAssignMedicine} className="space-y-4">
        <select className="border p-2 w-full" value={selectedMedicine} onChange={(e) => setSelectedMedicine(e.target.value)}>
          <option value="">Select Medicine</option>
          {medicines.map((med) => (
            <option key={med._id} value={med.blockchainId}>
              {med.name} (ID: {med.blockchainId})
            </option>
          ))}
        </select>

        <select className="border p-2 w-full" value={selectedParticipant} onChange={(e) => setSelectedParticipant(e.target.value)}>
          <option value="">Select Participant</option>
          {participants.map((p) => (
            <option key={p._id} value={p.address}>
              {p.name} ({p.role})
            </option>
          ))}
        </select>

        <select className="border p-2 w-full" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Supplier">Supplier</option>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Distributor">Distributor</option>
          <option value="Retailer">Retailer</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Assign Medicine</button>
      </form>
    </div>
  );
};

export default AssignMedicine;