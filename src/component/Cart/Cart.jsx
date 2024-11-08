import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchCartItems } from '../../Redux/ReduxSlice/AddtoCartSlice';
import { useDispatch } from "react-redux";

function Cart() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([]);


  const DisplayCartItems = async () => {
    try {
      const res = await axios.get('https://localhost:7199/api/Cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setCartItem(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    DisplayCartItems();
  }, []);

  // Function to remove item from cart
  const RemoveCart = async (item) => {
    try {
      const removeItem = item.id;
      await axios.delete(`https://localhost:7199/api/Cart/id?productId=${removeItem}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("Item removed from the cart");
      DisplayCartItems(); 
      dispatch(fetchCartItems())
    } catch (error) {
      toast.error("Failed to remove item from the cart");
      console.log(error);
    }
  };

 
  const calCulateTotal = () => {
    return cartItem.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleIncrement = async (productId) => {
    try {
      const response = await axios.put(
        `https://localhost:7199/api/Cart/IncreaseQuantity?productId=${productId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("Quantity increased successfully:", response.data);
      DisplayCartItems();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };


  const handleDecrement = async (productId) => {
    try {
      const response = await axios.put(
        `https://localhost:7199/api/Cart/DecreaseQuantity?productId=${productId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("Quantity decresed successfully:", response.data);
      DisplayCartItems();
    } catch (error) {
      console.error("Error decresing quantity:", error);
    }
  };


  const handleCheckout = () => {
    const totalAmount = calCulateTotal();
    navigate('/Chekout', { state: { cartItem, totalAmount } });
  };

  return (
    <div>
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 w-full'>
        <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row md:justify-between md:space-x-4">
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            {cartItem.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {cartItem.map((item, index) => (
                  <li key={index} className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg relative">
                    <img src={item.image} alt={item.productName} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{item.productName}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-gray-800 font-semibold mt-2">Quantity: {item.quantity}</p>
                      <p className="text-gray-800 font-semibold mt-2">Total: ${item.totalPrice}</p>
                      <div className="flex items-center mt-4 space-x-2">
                        <button className="px-4 py-2 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors" aria-label="Increase quantity" 
                        onClick={()=>handleIncrement(item.id)}>
                          +
                        </button>
                        <button className="px-4 py-2 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors" aria-label="Decrease quantity"
                        onClick={()=>handleDecrement(item.id)}>
                          -
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <MdDelete onClick={() => RemoveCart(item)} className="text-red-500 cursor-pointer" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cartItem.length > 0 && (
            <div className="w-full md:w-1/3">
              <div className="bg-white shadow-lg p-6 rounded-md mt-12">
                <h1 className="text-2xl md:text-3xl px-3">Summary</h1>
                <p className="border-gray-500 px-3 py-4 flex justify-between">
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
