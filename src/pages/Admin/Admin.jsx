import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";


const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
const navigate=useNavigate()
  useEffect(() => {
    FetchUser();
  }, []);


  async function FetchUser() {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const res = await axios.get(`http://localhost:3001/user/${userId}`);
        if (res.data?.admin === true)
           setIsAdmin(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }
  
  const Data = [
    { title: "Dashboard", url: "dashboard" },
    { title: "All Users", url: "all-users" },
    { title: "Add Products", url: "add-product" },
    { title: "All Products", url: "edit-product" },
    { title: "Orders", url: "orders" },
  ];

  if (!isAdmin) {
    return <div className="flex items-center justify-center h-screen">Unauthorized</div>;
  }
  function handleLogout(){
    
    const isConfirm=window.confirm("are you sure do you want to Logout")
    if(isConfirm){
      localStorage.clear()
      navigate('/')
    }
  }
 

  return (
    <div>
      <nav className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-50 h-20 gap-3">
        {/* <NavLink to="/" className="flex items-center">
          <FaHome className='h-8 w-8 text-green-700 ' />
        </NavLink> */}

       
        <FaBars 
          className="h-10 w-10 text-green-700 md:hidden cursor-pointer" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />

        
        <div 
          className={`fixed top-20 left-0 w-full bg-white  md:static md:flex md:flex-row md:items-center md:space-x-8 ${isMenuOpen ? 'block' : 'hidden'} md:block`}
        >
          {Data.map((item, ind) => (
            <NavLink
              key={ind}
              className={({ isActive }) =>
                `block md:inline text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''}`
              }
              to={`/admin/${item.url}`}
              onClick={() => setIsMenuOpen(false)} 
            >
              {item.title}
            </NavLink>
          ))}
         
        </div>
              <button className='scale-150' onClick={handleLogout} ><IoLogOutOutline className='h-4 w-4' />
              </button>
      </nav>

      <div className="pt-24 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
