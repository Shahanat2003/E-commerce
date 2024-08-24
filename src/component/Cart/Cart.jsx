import axios from "axios";
import React, {  useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





function Cart() {

  const navigate=useNavigate()
  const [cartItem, setCartItem] = useState([]);
  
  

  useEffect(() => {
    async function DisplayCartItems() {
      try {
        //  window.location.reload()  
        const userId = localStorage.getItem("id");

        const res = await axios.get(`http://localhost:3001/user/${userId}`);
        const cartList = res.data.cart;

        setCartItem(cartList);
        // setCartCount(cartList.length)
      } catch (error) {
        toast.warning("something went wrong");
        console.log(error);
      }
    }
    DisplayCartItems();
  }, []);


  async function RemoveCart(item){
    try{
      const upadatedCartItems=cartItem.filter(x=>x.id!==item.id)
      setCartItem(upadatedCartItems)
    //   setCartCount(upadatedCartItems.length)
      const userId=localStorage.getItem("id")
      await axios.patch(`http://localhost:3001/user/${userId}`,{cart:upadatedCartItems})
      toast.success("item removed from the cart")
    }
    catch(error){
      toast.error("failed to remove item from the cart")
      console.log(error)

    }

  }


  function calCulateTotal(){
    return cartItem.reduce((total,item)=>total+item.new_price*item.quantity,0)
  }
  function handleCheckout(){
    const totalAmount = calCulateTotal();
    navigate('/Chekout',{state:{cartItem,totalAmount}})
   

  }
  
  
  return (
    <div>
    
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 w-full'>
     
     
        <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row md:justify-between md:space-x-4">
           

            <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                {cartItem.length===0?(
                  <p>your cart is empty</p>
                ):(
                
                <ul className="space-y-4">
                    {cartItem.map((item, index) => (
                        <li key={index} className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg relative">
                            <img src={item.image} alt={item.product} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-1">
                                <h3 className="text-lg font-medium">{item.product_name}</h3>
                                <p className="text-gray-600">{item.description}</p>
                               <p className="text-gray-800 font-semibold mt-2">Quantity: {item.quantity}</p> 
                                <p className="text-gray-800 font-semibold mt-2">Total: ${item.new_price*item.quantity}</p>
                            </div>
                            <div className="absolute top-2 right-2">
                                <MdDelete 
                                    onClick={() => RemoveCart(item)} 
                                    className="text-red-500 cursor-pointer" 
                                />
                            </div>
                        </li>
                    ))}
                </ul>
                )}
            </div>

          
            {cartItem.length > 0 && (
                <div className="w-full md:w-1/3 ">
                    <div className="bg-white shadow-lg p-6 rounded-md mt-12">
                        <h1 className="text-2xl md:text-3xl px-3">Summery</h1>
                        <p className=" border-gray-500 px-3 py-4 flex justify-between">
                            <span>Total</span> <span>${calCulateTotal()}</span>
                        </p>
                        <button
                            onClick={handleCheckout}
                            className="border-2 shadow-lg w-full h-12 mt-4 font-semibold"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
        
    </div>
    
    </div>
);
}

export default Cart;