import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from cart");
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex items-start gap-4 p-6 mt-10 ml-5 rounded-xl border shadow-md w-[500px]">
      <div className="h-[250px] w-[300px]">
        <img src={item.image} className="h-full w-full object-contain" alt={item.title} />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <h1 className="text-gray-700 font-semibold text-xl text-left mt-1">
            {item.title}
          </h1>
          <h1 className="text-gray-400 font-normal text-base text-left mt-2">
            {isExpanded ? item.description : item.description.split(" ").slice(0, 10).join(" ") + "..."}
          </h1>
          <button
            className="text-blue-500 text-sm mt-1"
            onClick={toggleDescription}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>

        <div className="flex justify-between gap-12 items-center w-full mt-5">
          <div>
            <p className="text-green-600 font-semibold text-lg">Price: ${item.price}</p>
          </div>

          <div onClick={removeFromCart}>
            <RiDeleteBin6Fill className="border-4 text-3xl border-red-400 bg-red-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
