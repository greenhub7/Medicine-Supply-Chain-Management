import { useEffect, useState } from "react";
import { getMedicines } from "../services/api";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await getMedicines();
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-4">Medicine List</h2>
      {loading ? <p>Loading medicines...</p> : medicines.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <ul className="space-y-4">
          {medicines.map((medicine) => (
            <li key={medicine._id} className="border p-4">
              <h3 className="text-lg font-semibold">{medicine.name}</h3>
              <p><strong>Description:</strong> {medicine.description}</p>
              <p><strong>Stage:</strong> {medicine.stage}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineList;