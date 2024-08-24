import axios from "axios";
import { toast } from "react-toastify";

export const AddCart = async (item) => {
  const user = localStorage.getItem("id");

  if (!user) {
    toast.warning("Please login");
    return;
  }

  try {
    const res = await axios.get(`http://localhost:3001/user/${user}`);
    const currentCart = res.data.cart || []; 

    const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    // console.log(itemIndex,"yrhg");
    
    
    if (itemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + item.quantity
      };
      await axios.patch(`http://localhost:3001/user/${user}`, { cart: updatedCart });
      toast.success("Item quantity updated in cart");
    } else {
      const updatedCart = [...currentCart, item];
      await axios.patch(`http://localhost:3001/user/${user}`, { cart: updatedCart });
      toast.success("Item successfully added to cart");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  }
};
