import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MedicineDetails from "./pages/MedicineDetails";
import Participants from "./pages/Participants";
import Transactions from "./pages/Transactions";
import Shipments from "./pages/Shipments";
import { Web3Provider } from "./context/Web3Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <Navbar />
        <div className="min-h-screen p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<MedicineDetails />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/shipments" element={<Shipments />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </Web3Provider>
  );
};

export default App;