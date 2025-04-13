import { useState, useContext } from "react";
import { Web3Context } from "../context/Web3Provider";
import { addMedicine } from "../services/api";
import { toast } from "react-toastify";

const AddMedicine = () => {
  const account = useContext(Web3Context);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      await addMedicine(formData);
      setFormData({
        id: "",
        name: "",
        description: "",
      });
      toast.success("Medicine added successfully!");
    } catch (error) {
      toast.error("Error adding medicine");
      console.error(error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addMedicine({ name, description, ownerAddress: account });
  //     toast.success("Medicine added successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error adding medicine.");
  //   }
  // };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Medicine</h2>
      {/* <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" className="border p-2 w-full"
          value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" className="border p-2 w-full"
          value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Submit</button>
      </form> */}

      <form onSubmit={handleAddMedicine} className="space-y-4 mb-6">
        <input type="text" placeholder="ID" className="border p-2 w-full"
          value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} required />
        <input type="text" placeholder="Name" className="border p-2 w-full"
          value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="text" placeholder="Description" className="border p-2 w-full"
          value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2 w-full transition-all">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;