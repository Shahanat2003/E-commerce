import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";


const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    FetchUser();
  }, []);

  async function FetchUser() {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const res = await axios.get(`http://localhost:3001/user/${userId}`);
        if (res.data?.admin === true) setIsAdmin(true);
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
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <nav className="bg-white p-2 shadow-md flex items-center justify-between sticky top-0 z-50 h-20">
        <NavLink to="/">
        <FaHome className='h-8 w-8' />
        </NavLink>

        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {Data.map((item, ind) => (
            <NavLink
              key={ind}
              className={({ isActive }) =>
                `text-black font-semibold hover:text-green-700 transition-colors ${isActive ? 'border-b-2 border-green-700' : ''}`
              }
              to={`/admin/${item.url}`}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="pt-20 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
