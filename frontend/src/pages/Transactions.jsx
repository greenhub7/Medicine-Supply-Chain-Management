import { useState, useEffect } from "react";
import { addTransaction, getAllTransactions, getTransactionHistory } from "../services/api";
import { toast } from "react-toastify";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [medicineId, setMedicineId] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [formData, setFormData] = useState({
    medicineId: "",
    from: "",
    to: "",
    action: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getAllTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(formData);
      toast.success("Transaction recorded successfully!");
      fetchTransactions();
      setFormData({
        medicineId: "",
        from: "",
        to: "",
        action: "",
      });
    } catch (error) {
      toast.error("Error adding transaction");
      console.error(error);
    }
  };

  const handleGetHistory = async () => {
    try {
      const response = await getTransactionHistory(medicineId);
      setTransactionHistory(response.data);
    } catch (error) {
      toast.error("Error fetching transaction history");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Transactions</h2>

      {/* Transaction Form */}
      <form onSubmit={handleAddTransaction} className="space-y-4 mb-6">
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
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Receiver Address"
          className="border p-2 w-full"
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          required
        />
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Add Transaction
        </button>
      </form>

      {/* Transactions List */}
      <h3 className="text-xl font-bold mb-2">Transactions List</h3>
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

      {/* Transaction History */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Transaction History</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter Medicine ID"
            className="border p-2 w-full"
            value={medicineId}
            onChange={(e) => setMedicineId(e.target.value)}
            required
          />
          <button onClick={handleGetHistory} className="bg-green-500 text-white p-2">
            Get History
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {transactionHistory.length === 0 ? (
            <p>No transaction history found.</p>
          ) : (
            transactionHistory.map((txn, index) => (
              <li key={index} className="border p-3">
                <p><strong>Action:</strong> {txn.action}</p>
                <p><strong>Participant:</strong> {txn.participant}</p>
                <p><strong>Timestamp:</strong> {new Date(txn.timestamp).toLocaleString()}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;