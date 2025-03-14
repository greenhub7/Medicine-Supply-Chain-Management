import { useState, useEffect } from "react";
import { addShipment, getAllShipments, updateShipmentStatus } from "../services/api";
import { toast } from "react-toastify";

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [formData, setFormData] = useState({
    medicineId: "",
    sender: "",
    receiver: "",
    trackingId: "",
  });

  const [updateData, setUpdateData] = useState({
    trackingId: "",
    status: "",
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await getAllShipments();
      setShipments(response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  const handleAddShipment = async (e) => {
    e.preventDefault();
    try {
      await addShipment(formData);
      toast.success("Shipment created successfully!");
      fetchShipments();
      setFormData({
        medicineId: "",
        sender: "",
        receiver: "",
        trackingId: "",
      });
    } catch (error) {
      toast.error("Error creating shipment");
      console.error(error);
    }
  };

  const handleUpdateShipmentStatus = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating shipment:", updateData);
  
      const response = await updateShipmentStatus({
        trackingId: updateData.trackingId,
        status: updateData.status,
      });
  
      console.log("Update Response:", response.data); // Debugging
  
      toast.success("Shipment status updated successfully!");
      fetchShipments(); // Refresh shipment list
      setUpdateData({ trackingId: "", status: "" }); // Reset form
    } catch (error) {
      console.error("Error updating shipment:", error.response || error);
      toast.error("Error updating shipment status");
    }
  };
  

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Manage Shipments</h2>

      {/* Shipment Form */}
      <form onSubmit={handleAddShipment} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Medicine ID"
          className="border p-2 w-full"
          value={formData.medicineId}
          onChange={(e) => setFormData({ ...formData, medicineId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Sender Address"
          className="border p-2 w-full"
          value={formData.sender}
          onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Receiver Address"
          className="border p-2 w-full"
          value={formData.receiver}
          onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tracking ID"
          className="border p-2 w-full"
          value={formData.trackingId}
          onChange={(e) => setFormData({ ...formData, trackingId: e.target.value })}
          required
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 transition-all text-white p-2 w-full">
          Create Shipment
        </button>
      </form>

      {/* Update Shipment Status Form */}
      <h3 className="text-2xl font-semibold mb-2">Update Shipment Status</h3>
      <form onSubmit={handleUpdateShipmentStatus} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Tracking ID"
          className="border p-2 w-full"
          value={updateData.trackingId}
          onChange={(e) => setUpdateData({ ...updateData, trackingId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="New Status"
          className="border p-2 w-full"
          value={updateData.status}
          onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
          required
        />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all text-white p-2 w-full">
          Update Shipment Status
        </button>
      </form>


      {/* Shipments List */}
      <h3 className="text-2xl font-semibold mb-2">Shipments List</h3>
      <ul className="space-y-2">
        {shipments.length === 0 ? (
          <p>No shipments found.</p>
        ) : (
          shipments.map((shipment) => (
            <li key={shipment.trackingId} className="border p-4">
              <p><strong>Medicine ID:</strong> {shipment.medicineId}</p>
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