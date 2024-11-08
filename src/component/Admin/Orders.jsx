import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetOrders } from '../../Redux/ReduxSlice/GetOrderSlice';
import { useDispatch, useSelector } from 'react-redux';

function Orders() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(GetOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Items</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order && order.length > 0 ? (
                order.map((userOrder, index) => (
                  <tr key={index}>
                    {/* User Details */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <strong>ID:</strong> {userOrder.customer_Id}<br />
                      <strong>Name:</strong> {userOrder.customerName}<br />
                      <strong>Email:</strong> {userOrder.customerEmail}<br />
                      <strong>Address:</strong> {userOrder.customerAddres}
                    </td>

                    {/* Order Details */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <strong>Order ID:</strong> {userOrder.orderId}<br />
                      <strong>Order Date:</strong> {new Date(userOrder.order_Date).toLocaleDateString()}<br />
                      <strong>Transaction ID:</strong> {userOrder.transactionId}
                    </td>

                    {/* Order Items */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {userOrder.orders && userOrder.orders.length > 0 ? (
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-xs font-medium text-gray-500">Product</th>
                              <th className="text-xs font-medium text-gray-500">Quantity</th>
                              <th className="text-xs font-medium text-gray-500">Price</th>
                              <th className="text-xs font-medium text-gray-500">Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userOrder.orders.map((item, itemIndex) => (
                              <tr key={itemIndex}>
                                <td className="px-2 py-2 text-sm text-gray-700">{item.product_Name}</td>
                                <td className="px-2 py-2 text-sm text-gray-700">{item.quantity}</td>
                                <td className="px-2 py-2 text-sm text-gray-700">${item.totalPrice}</td>
                                <td className="px-2 py-2 text-sm text-gray-700">
                                  <img src={item.image} alt={item.product_Name} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No items in this order.</p>
                      )}
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
