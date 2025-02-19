import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import AddMedicine from './pages/AddMedicine';
import MedicineList from "./pages/MedicineList";
import Medicine from "./pages/MedicineDetails";
import Participants from "./pages/Participants";
import Transactions from "./pages/Transactions";
import Shipments from "./pages/Shipments";
// import AssignMedicine from "./pages/AssignMedicine";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/medicines" element={<MedicineList />} />
            <Route path="/medicine-details" element={<Medicine />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/shipments" element={<Shipments />} />
            {/* <Route path="/assign-medicine" element={<AssignMedicine />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;