import axios from "axios";
import { toast } from "react-toastify";

export const AddCart = async (items, setCartItems) => {
  const user = localStorage.getItem("id");
  
  if (user) {
    try {
      const res = await axios.get(`http://localhost:3001/user/${user}`);
      const currentCart = res.data.cart;

      const itemExists = currentCart.find(
        (cartItem) => cartItem.id === items.id
      );
      if (itemExists) {
        toast.warning("Item is already in cart");
      } else {
        const updateCart = [...currentCart, { ...items }];
        await axios.patch(`http://localhost:3001/user/${user}`, {
          cart: updateCart,
        });
        
        
        setCartItems(updateCart);
        
        toast.success("Item successfully added to cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  } else {
    toast.warning("Please login");
  }
};
