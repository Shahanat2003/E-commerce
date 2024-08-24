import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserOrders() {
  const id = localStorage.getItem("id");
  const [item, setItem] = useState([]);

  useEffect(() => {
    async function FetchOrders() {
      try {
        const res = await axios.get(`http://localhost:3001/user/${id}`);
        setItem(res.data.orders||[]);
      } catch (error) {
        console.log("error fetching order", error);
      }
    }
    FetchOrders();
  }, [id]);

  return (
    <div className='p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200'>
    <div className="container mx-auto px-4 py-8">
      {item.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-medium">Product Name</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-medium">Image</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-medium">Price</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-medium">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {item.map((data) => (
              <tr key={data.id}>
                <td className="py-2 px-4 border-b">{data.product_name}</td>
                <td className="py-2 px-4 border-b">
                  <img src={data.image} alt={data.product_name} className="w-16 h-auto" />
                </td>
                <td className="py-2 px-4 border-b">{data.new_price}</td>
                <td className="py-2 px-4 border-b">{data.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='flex h-screen items-center justify-center'>
        <p className="text-center text-gray-500">Orders not found</p>
       </div>
      )}
    </div>
    </div>
  );
}

export default UserOrders;
