import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto text-center mt-10">
      <h1 className="text-3xl text-white font-bold mb-6">Blockchain Supply Chain Management</h1>
      <p className="text-lg text-gray-500 mb-8">
        Track medicines from manufacturing to distribution using blockchain technology.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/add-medicine" className="bg-blue-500 text-white hover:bg-blue-600 p-3 rounded transition-all">Add Medicine</Link>
        <Link to="/medicines" className="bg-green-500 text-white p-3 hover:bg-green-600 rounded transition-all">View Medicine List</Link>
        <Link to="/medicine-details" className="bg-green-500 text-white p-3 hover:bg-green-600 rounded transition-all">View Medicine Details</Link>
        <Link to="/participants" className="bg-purple-500 text-white p-3 hover:bg-purple-600 rounded transition-all">View Participants</Link>
        <Link to="/transactions" className="bg-yellow-500 text-white p-3 hover:bg-yellow-600 rounded transition-all">View Transactions</Link>
        <Link to="/shipments" className="bg-red-500 text-white p-3 hover:bg-red-600 rounded transition-all">View Shipments</Link>
      </div>
    </div>
  );
};

export default Home;