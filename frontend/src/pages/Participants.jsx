import { useEffect, useState } from "react";
import { addParticipant, getParticipants } from "../services/api";
import { toast } from "react-toastify";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Supplier");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await getParticipants();
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    try {
      await addParticipant({ name, role, address, location });
      toast.success(`${role} added successfully`);
      fetchParticipants();
    } catch (error) {
      console.error(error);
      toast.error("Error adding participant");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Participants</h2>

      <form onSubmit={handleAddParticipant} className="space-y-4 mb-6">
        <input type="text" placeholder="Name" className="border p-2 w-full"
          value={name} onChange={(e) => setName(e.target.value)} required />
        <select className="border p-2 w-full" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Supplier">Supplier</option>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Distributor">Distributor</option>
          <option value="Retailer">Retailer</option>
        </select>
        <input type="text" placeholder="Ethereum Address" className="border p-2 w-full"
          value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="text" placeholder="Location" className="border p-2 w-full"
          value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Participant</button>
      </form>

      <ul className="space-y-4">
        {participants.map((participant) => (
          <li key={participant._id} className="border p-4">
            <p><strong>Name:</strong> {participant.name}</p>
            <p><strong>Role:</strong> {participant.role}</p>
            <p><strong>Ethereum Address:</strong> {participant.address}</p>
            <p><strong>Location:</strong> {participant.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;