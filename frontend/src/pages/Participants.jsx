import { useState, useEffect } from "react";
import { addParticipant, getAllParticipants } from "../services/api";
import { toast } from "react-toastify";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    address: "",
  });

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await getAllParticipants();
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    try {
      await addParticipant(formData);
      toast.success("Participant added successfully!");
      fetchParticipants();
      setFormData({
        name: "",
        role: "",
        location: "",
        address: "",
      });
    } catch (error) {
      toast.error("Error adding participant");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Manage Participants</h2>

      {/* Participant Form */}
      <form onSubmit={handleAddParticipant} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <select
          className="border p-2 w-full"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="Supplier">Supplier</option>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Distributor">Distributor</option>
          <option value="Retailer">Retailer</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ethereum Address"
          className="border p-2 w-full"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 transition-all text-white p-2 w-full">
          Add Participant
        </button>
      </form>

      {/* Participants List */}
      <h3 className="text-2xl font-semibold mb-2">Participants List</h3>
      <ul className="space-y-2">
        {participants.length === 0 ? (
          <p>No participants found.</p>
        ) : (
          participants.map((participant) => (
            <li key={participant.address} className="border p-4">
              <p><strong>Name:</strong> {participant.name}</p>
              <p><strong>Role:</strong> {participant.role}</p>
              <p><strong>Location:</strong> {participant.location}</p>
              <p><strong>Ethereum Address:</strong> {participant.address}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Participants;