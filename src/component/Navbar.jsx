import { NavLink,useNavigate } from 'react-router-dom'
import pic from '../Assets/Logo2.2.png';
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import {cartContext} from './Context/CartProvider';



function Navbar() {
  const{cartItems}=useContext(cartContext)
  const cartCount=cartItems.length;

  const[isLoggin,setIsLoggin]=useState(false)
  useEffect(()=>{
    if(localStorage.getItem("id")){
      setIsLoggin(true)
    }
  },[isLoggin])

  function handleLogout(){
    localStorage.clear("id")
    alert("are you sure")
    window.location.reload()
   }

   function handleLogin(){
    
   }


  const navigate=useNavigate()
  const user = localStorage.getItem("id");
  const userName = localStorage.getItem("name");
  const [searchQuery,setSearchQuery]=useState("")


  async function handleSearch(e) {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
      navigate('/');
      return;
    }
    e.preventDefault();

    try {
      const result = await axios.get("http://localhost:3001/products");
      const combinedResult = result.data;
      const filteredResult = combinedResult.filter((item) =>
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      navigate('/SearchResult', { state: { results: filteredResult } });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='sticky top-0 z-50'>
      <nav className="bg-white p-2 shadow-md flex items-center justify-between">
        
        <NavLink to='/'>
          <img src={pic} alt='logo' className='h-12 w-auto rounded-full'/>
        </NavLink>
        
        <div className="flex-grow flex justify-center mx-4">
          <input 
            type='text' 
            onChange={handleSearch}
            placeholder='Search....' 
            className='w-full max-w-xs py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600' 
          />
        </div>

        <div className="flex items-center space-x-6">
          <NavLink 
            to="About" 
            className={({isActive}) => 
              `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''}`
            }
          >
            About
          </NavLink>

          <NavLink 
            to="Dogs" 
            className={({isActive}) => 
              `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''}`
            }
          >
            Dogs
          </NavLink>

          <NavLink 
            to="Cats" 
            className={({isActive}) => 
              `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''}`
            }
          >
            Cats
          </NavLink>

          <NavLink to='/cart' className={({ isActive }) => `relative text-black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''}`}>
        <FaShoppingCart />
        <p className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center text-[8px]'>
            {/* {cartCount} */}
            {cartCount}
         </p>
        </NavLink>

          {user && 
            <div className="flex items-center space-x-2 ml-4">
              <CgProfile className="h-6 w-6" />
              <p className="text-black font-semibold">Hi {userName}</p>
            </div>
          }
           {isLoggin?
        <button onClick={handleLogout}className="text-black ml-6 border border-white px-4 py-2 hover:border-green-700 hover:border-4 font-bold rounded-lg">
                Logout</button>:
        <button onClick={handleLogin}>
           <NavLink to='Login' className="text-black ml-6 border border-white px-4 py-2 hover:border-green-700 hover:border-4 font-bold rounded-lg">
            join PetPals
        </NavLink>
        </button>
        }
        </div>
      </nav>
    </div>
  );
}

export default Navbar