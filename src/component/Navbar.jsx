import { NavLink, useNavigate } from 'react-router-dom';
import pic from '../Assets/Logo2.2.png';
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { cartContext } from './Context/CartProvider';

function Navbar() {
  const { cartItems, FetchCart } = useContext(cartContext);
  const cartCount = cartItems.length;
  

  const [isLoggin, setIsLoggin] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const userName = localStorage.getItem("name");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggin(true);
      FetchCart(); 
    } else {
      setIsLoggin(false);
    }
  }, [FetchCart]); // Add FetchCart to dependencies
// 
  // console.log(cartCount);
  
  
  
  function handleLogout() {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    
    if (isConfirmed) {
      navigate('/')
      localStorage.clear();
      window.location.reload();
     
    }
  }

  function handleProfileClick() {
    setDropdownVisible(!dropdownVisible);
  }

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
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="p-4 flex items-center justify-between">
        
        <NavLink to='/'>
          <img src={pic} alt='logo' className='h-12 w-auto rounded-full' />
        </NavLink>

        <div className="md:hidden">
          <FaBars onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer" />
        </div>

       
        <div className={`fixed top-0 right-0 h-full w-64 bg-white  transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:flex md:items-center md:justify-between md:w-auto md:translate-x-0`}>
          <div className="flex flex-col items-center md:flex-row md:space-x-6 mt-8 md:mt-0 md:ml-4">
            
            <div className="self-end mb-4 md:hidden">
              <FaBars onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer" />
            </div>

            <input
              type='text'
              onChange={handleSearch}
              placeholder='Search....'
              className='mb-4 w-11/12 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 md:mb-0 md:w-auto'
            />

            <NavLink 
              to="/About" 
              className={({ isActive }) => 
                `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''} md:mb-0 mb-2`
              }
            >
              About
            </NavLink>

            <NavLink 
              to="/Dogs" 
              className={({ isActive }) => 
                `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''} md:mb-0 mb-2`
              }
            >
              Dogs
            </NavLink>

            <NavLink 
              to="/Cats" 
              className={({ isActive }) => 
                `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''} md:mb-0 mb-2`
              }
            >
              Cats
            </NavLink>

            <NavLink 
              to="/UserOrders" 
              className={({ isActive }) => 
                `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''} md:mb-0 mb-2`
              }
            >
              Orders
            </NavLink>

            <NavLink to='/cart' className={({ isActive }) => `relative text-black font-semibold hover:text-gray-400 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''} md:mb-0 mb-2`}>
              <FaShoppingCart className='h-5 w-5'/>
              <p className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3  flex items-center justify-center text-xs'>
                {cartCount}
              </p>
            </NavLink>

           
            <div className="relative">
              <div className="flex items-center cursor-pointer" onClick={handleProfileClick}>
                <CgProfile className="h-6 w-6" />
                {isLoggin && (
                  <p className="text-black ml-2">Hi {userName}</p>
                )}
              </div>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  {!isLoggin ? (
                    <NavLink to='Login' className="block px-4 py-2 text-black hover:bg-gray-100">
                      Login
                    </NavLink>
                  ) : (
                    <>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">
                        Logout
                      </button>
                      {/* {admin && (
                        <button onClick={() => navigate('/admin/dashboard')} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">
                          Go to Admin
                        </button>
                      )} */}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
