import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const cartContext=createContext()

function CartProvider({children}) {
  const [cartItems,setCartItems]=useState([])
  
  useEffect(()=>{
    
    async function FetchCart() {
      const userId=localStorage.getItem("id")
      if(userId){
        try{
          const res=await axios.get(`http://localhost:3001/user/${userId}`)
          setCartItems(res.data.cart)
        }
        catch(error)
        {
          console.error("Failed to fetch cart items", error);
        }
      }
    }
    FetchCart()

  },[])
  return (
    <div>
      <cartContext.Provider value={{cartItems,setCartItems}}>
        {children}
      </cartContext.Provider>
    </div>
  )
}

export default CartProvider
