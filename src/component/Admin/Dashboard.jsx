import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const [user,setUser]=useState(0)
  const [product,setProduct]=useState(0)
  const [order,setOrder]=useState(0)
  
  useEffect(()=>{
    async function FetchData(){
      try{
        const res=await axios.get("http://localhost:3001/user")
        setUser(res.data.length)
        const resp=await axios.get("http://localhost:3001/products")
        setProduct(resp.data.length)
        const orderList=res.data.flatMap(user=>user.orders||[])
        setOrder(orderList)
      }
      catch(error){
        console.log("error fetching data",error)
      }
    }
    FetchData()
  },[])
  
  
  return (
    
      <div className=' flex gap-4  min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200'>
      
    <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg h-1/4  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700  shadow-lg">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total users</h5>
    <p class="font-bold text-gray-700 dark:text-gray-400 ">{user}</p>
    </div>

    <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg h-1/4  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-lg">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Products</h5>
    <p class="font-bold text-gray-700 dark:text-gray-400 ">{product}</p>
    </div>

    <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg h-1/4  shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Orders</h5>
    <p class="font-bold text-gray-700 dark:text-gray-400 ">{order.length}</p>
    </div>
    </div>

  )
}

export default Dashboard
