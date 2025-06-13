import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "/logo.svg";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto">
      <nav className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold text-blue-600">
          <img src={logo} alt="Productivity Hub Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-gray-800">
            Productivity Hub
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to={"/register"}
                className="text-gray-600 hover:text-blue-600 font-semibold"
              >
                Register
              </Link>
              <Link
                to={"/login"}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
