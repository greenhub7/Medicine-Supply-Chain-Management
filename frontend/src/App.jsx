import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddMedicine from "./pages/AddMedicine";
import MedicineList from "./pages/MedicineList";
import MedicineDetails from "./pages/MedicineDetails";
import Participants from "./pages/Participants";
import Transactions from "./pages/Transactions";
import Shipments from "./pages/Shipments";
import AssignMedicine from "./pages/AssignMedicine";
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
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/medicines" element={<MedicineList />} />
            <Route path="/medicines/:id" element={<MedicineDetails />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/assign-medicine" element={<AssignMedicine />} />
          </Routes>
        </div>
        {/* <Footer /> */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </Web3Provider>
  );
};

export default App;
