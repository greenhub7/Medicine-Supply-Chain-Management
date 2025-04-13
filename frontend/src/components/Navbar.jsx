import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400 hover:text-blue-300 transition duration-300">
          Supply Chain
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navbar Links for Large Screens */}
        <div className="hidden lg:flex space-x-6 text-gray-300">
          <Link to="/add-medicine" className="hover:text-blue-400 transition">Add Medicines</Link>
          <Link to="/medicines" className="hover:text-blue-400 transition">Medicine List</Link>
          <Link to="/medicine-details" className="hover:text-blue-400 transition">Medicine Details</Link>
          <Link to="/participants" className="hover:text-blue-400 transition">Participants</Link>
          <Link to="/transactions" className="hover:text-blue-400 transition">Transactions</Link>
          <Link to="/shipments" className="hover:text-blue-400 transition">Shipments</Link>
        </div>

        {/* Dropdown Menu for Small Screens */}
        {isOpen && (
          <div className="absolute top-16 right-4 bg-gray-800 shadow-lg rounded-lg py-3 w-48 flex flex-col text-right">
            <Link to="/add-medicine" className="block px-4 py-2 hover:bg-blue-400">Add Medicines</Link>
            <Link to="/medicines" className="block px-4 py-2 hover:bg-blue-400">Medicine List</Link>
            <Link to="/medicine-details" className="block px-4 py-2 hover:bg-blue-400">Medicine Details</Link>
            <Link to="/participants" className="block px-4 py-2 hover:bg-blue-400">Participants</Link>
            <Link to="/transactions" className="block px-4 py-2 hover:bg-blue-400">Transactions</Link>
            <Link to="/shipments" className="block px-4 py-2 hover:bg-blue-400">Shipments</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;