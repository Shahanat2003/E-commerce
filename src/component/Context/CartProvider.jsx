import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const cartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  async function FetchCart() {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const res = await axios.get("https://localhost:7199/api/Cart",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem}`
          }
          
        });
        // console.log(res)
        if (res.data) { 
          setCartItems(res.data);
        } else {
          setCartItems([]); 
        }
      } catch (error) {
        console.error("Failed to fetch cart items", error);
        setCartItems([]); 
      }
    }
  }

  useEffect(() => {
    FetchCart(); 
  }, []);   

  return (
    <cartContext.Provider value={{ cartItems, setCartItems, FetchCart }}>
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
