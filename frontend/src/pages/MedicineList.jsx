import { useEffect, useState } from "react";
import { getMedicines } from "../services/api";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Medicine List</h2>
      {loading ? <p>Loading medicines...</p> : medicines.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        <ul className="space-y-4">
          {medicines.map((medicine) => (
            <li key={medicine._id} className="border p-4">
              <h3 className="text-lg font-bold">{medicine.name}</h3>
              <p>{medicine.description}</p>
              <p><strong>Stage:</strong> {medicine.stage}</p>
              <Link to={`/medicines/${medicine._id}`} className="text-blue-500">View Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineList;