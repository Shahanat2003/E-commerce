import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(`http://localhost:3001/user`);
        const allOrders = res.data.flatMap(user =>
          user.orders ? user.orders.map(order => ({
            username: user.username,
            userId:user.id,
            userEmail:user.email,
            product_name: order.product_name,
            price:order.new_price,
            productQuantity:order.quantity,
            image: order.image,
          })) : []
        );
        setOrders(allOrders);
      } catch (error) {
        console.log("Order fetch error", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UserDetails</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.userId}<br/>{order.username}<br/>{order.userEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product_name}<br/>Quantity: {order.productQuantity}<br/>Total price: ${order.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={order.image} alt={order.product_name} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
