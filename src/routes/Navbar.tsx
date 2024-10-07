import "../index.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-5 flex items-center max-w-[600px] mx-auto text-neutral-100 border-b border-gray-200">
      <Link to="/">
        <h1 className="font-bold text-lg">The Purchase planner</h1>
      </Link>
      <div className="ml-auto md:p-[6px]">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/create" className="hover:text-blue-500 ml-2 md:ml-4">
          New item
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
