import { useState, useContext } from "react";
import { Web3Context } from "../context/Web3Provider";
import { addMedicine } from "../services/api";

const AddMedicine = () => {
  const account = useContext(Web3Context);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stage: "",
  });

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      await addMedicine(formData);
      setFormData({
        name: "",
        description: "",
        stage: "",
      });
      alert("Medicine added successfully!");
    } catch (error) {
      alert("Error adding medicine");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-4">Add Medicine</h2>

      <form onSubmit={handleAddMedicine} className="space-y-4 mb-6">
        <input type="text" placeholder="Name" className="border p-2 w-full"
          value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="text" placeholder="Description" className="border p-2 w-full"
          value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        <select
          className="border p-2 w-full"
          value={formData.stage}
          onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
          required
        >
          <option value="">Select Stage</option>
          <option value="Ordered">Ordered</option>
          <option value="RawMaterialSupplied">Raw Materials Supplied</option>
          <option value="Manufactured">Manufactured</option>
          <option value="Distributed">Distributed</option>
          <option value="Retail">Retail</option>
          <option value="Sold">Sold</option>
        </select>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2 w-full transition-all">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;