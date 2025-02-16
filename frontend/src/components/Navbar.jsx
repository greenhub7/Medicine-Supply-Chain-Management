import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Supply Chain</Link>
        <div className="space-x-4">
          <Link to="/add-medicine">Add Medicine</Link>
          <Link to="/medicines">Medicine List</Link>
          <Link to="/participants">Participants</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/shipments">Shipments</Link>
          <Link to="/assign-medicine">Assign Medicine</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;