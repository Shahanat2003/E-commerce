import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(0);
  const [product, setProduct] = useState(0);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    async function FetchData() {
      try {
        const res = await axios.get("http://localhost:3001/user");
        const filterdUser=res.data.filter(user=>!user.admin)
        setUser(filterdUser.length);
        const resp = await axios.get("http://localhost:3001/products");
        setProduct(resp.data.length);
        const orderList = res.data.flatMap(user => user.orders || []);
        setOrder(orderList);
      } catch (error) {
        console.log("error fetching data", error);
      }
    }
    FetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-gray-900 mb-2">Total Users</h5>
          <p className="text-2xl font-semibold text-gray-700">{user}</p>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-gray-900 mb-2">Total Products</h5>
          <p className="text-2xl font-semibold text-gray-700">{product}</p>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-gray-900 mb-2">Total Orders</h5>
          <p className="text-2xl font-semibold text-gray-700">{order.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
