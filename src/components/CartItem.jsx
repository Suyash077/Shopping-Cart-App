import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";

const CartItem = ({item,index}) => {

  const dispatch=useDispatch();
  const removeFromCart=()=>{
    dispatch(remove(item.id));
    toast.error("Item removed from cart")
  }
  return(
    <div className="flex items-start gap-4 p-4 mt-10 ml-5 rounded-xl border shadow-md">

      <div className="h-[180px] w-[200px]">
        <img src={item.image}  className="h-full w-full" alt=" "/>
      </div>

      <div className="flex flex-col justify-between">
      <div>
        <h1 className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1 ">{item.title}</h1>
        <h1 className="w-40 text-gray-400 font-normal text-[10px] text-left ">{item.description.split(" ").slice(0,10).join(" ") + "..."}</h1>
      </div>

      <div className="flex justify-between gap-12 items-center w-full mt-5"> 
      <div>
        <p className="text-green-600 font-semibold">Price:${item.price}</p>
      </div>

      <div onClick={removeFromCart}>
      <RiDeleteBin6Fill className="border-4 text-3xl border-red-400 bg-red-400 rounded-full " />
      </div>
      </div>
      </div>
    </div>
  );
};

export default CartItem;
