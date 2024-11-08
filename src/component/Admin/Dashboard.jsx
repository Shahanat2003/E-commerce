import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux/ReduxSlice/GetUsersSlice';
import { GetOrders } from '../../Redux/ReduxSlice/GetOrderSlice';
import { fetchProducts } from '../../Redux/ReduxSlice/ProductSlice';


function Dashboard() {
  const dispatch=useDispatch();
  const [product, setProduct] = useState(0);
  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch])

  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])

  useEffect(()=>{
    dispatch(GetOrders())
  },[dispatch])




const {users}=useSelector((state)=>state.users);
const{order}=useSelector((state)=>state.orders)
const{catProducts,dogProducts}=useSelector((state)=>state.product);
const allOrder=order.flatMap( customer=>customer.orders);
const totalProduct=catProducts.length+dogProducts.length



// console.log(users)

  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-gray-900 mb-2">Total Users</h5>
          <p className="text-2xl font-semibold text-gray-700">{users.length}</p>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-gray-900 mb-2">Total Products</h5>
          <p className="text-2xl font-semibold text-gray-700">{totalProduct}</p>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
          <h5 className="text-xl font-bold text-gray-900 mb-2">Total Orders</h5>
          <p className="text-2xl font-semibold text-gray-700">{allOrder.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
