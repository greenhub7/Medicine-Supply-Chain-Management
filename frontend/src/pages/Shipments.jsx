import { useEffect, useState } from "react";
import { addShipment, getShipments } from "../services/api";
import { toast } from "react-toastify";

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [trackingId, setTrackingId] = useState("");

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await getShipments();
      setShipments(response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  const handleAddShipment = async (e) => {
    e.preventDefault();
    if (!medicineId || !sender || !receiver || !trackingId) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await addShipment({ medicineId, sender, receiver, trackingId });
      toast.success("Shipment created successfully");
      setMedicineId("");
      setSender("");
      setReceiver("");
      setTrackingId("");
      fetchShipments();
    } catch (error) {
      console.error(error);
      toast.error("Error creating shipment");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Shipments</h2>

      {/* Shipment Form */}
      <form onSubmit={handleAddShipment} className="space-y-4 mb-6">
        <input type="text" placeholder="Medicine ID" className="border p-2 w-full"
          value={medicineId} onChange={(e) => setMedicineId(e.target.value)} required />
        <input type="text" placeholder="Sender (Ethereum Address)" className="border p-2 w-full"
          value={sender} onChange={(e) => setSender(e.target.value)} required />
        <input type="text" placeholder="Receiver (Ethereum Address)" className="border p-2 w-full"
          value={receiver} onChange={(e) => setReceiver(e.target.value)} required />
        <input type="text" placeholder="Tracking ID" className="border p-2 w-full"
          value={trackingId} onChange={(e) => setTrackingId(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Create Shipment</button>
      </form>

      {/* Shipment List */}
      <ul className="space-y-4">
        {shipments.length === 0 ? (
          <p>No shipments found.</p>
        ) : (
          shipments.map((shipment) => (
            <li key={shipment._id} className="border p-4">
              <p><strong>Medicine ID:</strong> {shipment.medicine}</p>
              <p><strong>Sender:</strong> {shipment.sender}</p>
              <p><strong>Receiver:</strong> {shipment.receiver}</p>
              <p><strong>Tracking ID:</strong> {shipment.trackingId}</p>
              <p><strong>Status:</strong> {shipment.status}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Shipments;