import axios from "axios";
import { toast } from "react-toastify";

export const AddCart = async (items) => {
  const user = localStorage.getItem("id");
  console.log(items)
  // window.location.reload()  

  if (user) {
    try {
      const res = await axios.get(`http://localhost:3001/user/${user}`);
      const currentCart = res.data.cart;
     
     
      const itemExists = currentCart.find(
        (cartItem) => cartItem.id === items.id
      );
      if (itemExists) {
        toast.warning("item is already in cart");
        // console.log(currentCart.length)
      } else {
        const updateCart = [...currentCart, { ...items }];
        await axios.patch(`http://localhost:3001/user/${user}`, {
          cart: updateCart,
        })
        // console.log(currentCart.length)
        toast.success("item succcesfuly added to cart"); 
       
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  } else {
    toast.warning("please login");
  }
};