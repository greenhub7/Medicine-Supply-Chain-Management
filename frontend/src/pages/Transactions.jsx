import { useState, useEffect } from "react";
import { recordTransaction, getTransactions } from "../services/api";
import { toast } from "react-toastify";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [formData, setFormData] = useState({
    medicineId: "",
    participant: "",
    action: "",
    timestamp: Date.now(),
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await recordTransaction(formData);
      fetchTransactions();
      setFormData({
        medicineId: "",
        participant: "",
        action: "",
        timestamp: Date.now(),
      });
      toast.success("Transaction recorded successfully!");
    } catch (error) {
      toast.error("Error adding transaction");
      console.error(error);
    }
  };

  // const handleGetHistory = async () => {
  //   try {
  //     const response = await getTransactionHistory(medicineId);
  //     setTransactionHistory(response.data);
  //   } catch (error) {
  //     toast.error("Error fetching transaction history");
  //   }
  // };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Manage Transactions</h2>

      {/* Transaction Form */}
      <form onSubmit={handleAddTransaction} className="space-y-4 mb-8">
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
          placeholder="Participant Adress"
          className="border p-2 w-full"
          value={formData.participant}
          onChange={(e) => setFormData({ ...formData, participant: e.target.value })}
          required
        />
        {/* <input
          type="text"
          placeholder="Receiver Address"
          className="border p-2 w-full"
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          required
        /> */}
        <select
          className="border p-2 w-full"
          value={formData.action}
          onChange={(e) => setFormData({ ...formData, action: e.target.value })}
          required
        >
          <option value="">Select Action</option>
          <option value="Shipped">Shipped</option>
          <option value="Received">Received</option>
          <option value="In Transit">In Transit</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="bg-green-500 hover:bg-green-600 transition-all text-white p-2 w-full">
          Add Transaction
        </button>
      </form>

      {/* Transactions List */}
      <h3 className="text-2xl font-semibold mb-4">Transactions List</h3>
      <ul className="space-y-2">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((txn, index) => (
            <li key={index} className="border p-4">
              <p><strong>Medicine ID:</strong> {txn.medicineId}</p>
              <p><strong>From:</strong> {txn.participant}</p>
              <p><strong>Action:</strong> {txn.action}</p>
              <p><strong>Timestamp:</strong> {new Date(txn.timestamp).toLocaleString()}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Transactions;