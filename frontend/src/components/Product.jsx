import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import "./Product.css";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from cart");
  };

  return (
    <div className="product-card">
      <div>
        <p className="product-title">{post.title}</p>
      </div>
      <div>
        <p className="product-description">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="product-image-container">
        <img src={post.image} className="product-image" alt="" />
      </div>
      <div className="product-footer">
        <div>
          <p className="product-price">${post.price}</p>
        </div>
        {cart.some((p) => p.id === post.id) ? (
          <button onClick={removeFromCart} className="product-button">
            Remove Item
          </button>
        ) : (
          <button onClick={addToCart} className="product-button">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
