import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import "./Cart.css";
import Checkout from "./Checkout";
import { useAuth } from "../components/context/auth";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [auth] = useAuth();

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, item) => acc + item.price, 0));
  }, [cart]);

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item, index) => {
              return <CartItem key={item.id} item={item} itemIndex={index} />;
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-title">
              <div className="title-main">Your Cart</div>
              <div className="title-sub">Summary</div>
            </div>

            <div className="summary-details">
              <p>Total Items: {cart.length}</p>
            </div>

            <div className="summary-total">
              <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
              <Checkout
                amount={totalAmount.toFixed(2)}
                isLoggedIn={!!auth.token} // Pass isLoggedIn based on token presence
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <NavLink to="/">
            <button className="shop-now-button">Shop Now</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;