import { PiShoppingCartFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import toast from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5">
            <img src="https://ecomzy-shopping-cart.vercel.app/logo.png" width={155} alt="" />
          </div>
        </NavLink>
        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6 mt-2">
          <NavLink to="/" className="text-white">
            <div>
              <p>Home</p>
            </div>
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink to="/register" className="text-white">
                <div>
                  <p>Register</p>
                </div>
              </NavLink>
              <NavLink to="/login" className="text-white">
                <div>
                  <p>Login</p>
                </div>
              </NavLink>
            </>
          ) : (
            <li className="nav-item dropdown list-none">
              <NavLink
                className="nav-link dropdown-toggle cursor-pointer text-white"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item"
                    type="button"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
          <NavLink to="/cart" className="text-white">
            <div className="relative">
              <PiShoppingCartFill className="text-3xl" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-red-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
