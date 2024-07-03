import {PiShoppingCartFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  const {cart}= useSelector((state)=>state);
  return(
   <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5">
          <img src="https://ecomzy-shopping-cart.vercel.app/logo.png" width={155} alt=""/>
          </div>
        </NavLink>
        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/">
            <div>
            <p>Home</p>
            </div>
          </NavLink>
          <NavLink to="/cart">
            <div className="relative">
            <PiShoppingCartFill className="text-3xl" />
            {
              cart.length > 0 &&
              <span
              className="absolute -top-1 -right-2 bg-red-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce
              rounded-full text-white"
              >{cart.length}</span>  
            }
            </div>
          </NavLink>
        </div>

      </nav>
   </div>
  )
};

export default Navbar;
