import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedicineById } from "../services/api";

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await getMedicineById(id);
        setMedicine(response.data);
      } catch (error) {
        console.error("Error fetching medicine details:", error);
      }
    };
    fetchMedicine();
  }, [id]);

  if (!medicine) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Medicine Details</h2>
      <p><strong>Name:</strong> {medicine.name}</p>
      <p><strong>Description:</strong> {medicine.description}</p>
      <p><strong>Stage:</strong> {medicine.stage}</p>
    </div>
  );
};

export default MedicineDetails;