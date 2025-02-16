import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      {loading ? <p>Loading transactions...</p> : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li key={tx._id} className="border p-4">
              <p><strong>Transaction Hash:</strong> {tx.transactionHash}</p>
              <p><strong>Type:</strong> {tx.transactionType}</p>
              <p><strong>Medicine ID:</strong> {tx.medicineId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;