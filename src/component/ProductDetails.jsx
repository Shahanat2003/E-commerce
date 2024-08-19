import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddCart } from './Cart/AddCart';

function ProductDetails() {
    const{id}=useParams()
    const[data,setData]=useState();
    useEffect(()=>{
        async function FetchDetails(){
            try{
                const res=await axios.get(`http://localhost:3001/products/${id}`)
                setData(res.data)
            }
            catch(error){
                console.log("Error fetching product details:",error)
            }
        }
        FetchDetails()

    },[id])

    const[quantity,setQuantity]=useState(1)
    function QuantityIncrement(){
      setQuantity(quantity+1)
  
  
    }
    function QuantityDecrement(){
        if(quantity>1)
      setQuantity(quantity-1)
  
    }


    if(!data){
        return <p>Loading......</p>
    }
    
  return (
    <div>
        <div class="flex items-center justify-center min-h-screen p-5 mx-auto my-5 bg-gray-100 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
    <div class="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
       
    <div class="flex-shrink-0 w-1/3 bg-gray-100 flex items-center justify-center ">
            <img src={data.image} alt='product' class="w-full  h-auto  rounded-lg transform "/>
      </div>
        <div class="flex-1 p-5">
            <h1 class="text-3xl font-bold text-gray-800 mb-3">{data.product_name}</h1>
            <p class="text-lg text-gray-700 mb-4">{data.description}</p>
            <p className='font-bold'>{data.category}</p>
            <span className='text-black font-bold mr-2'>${data.new_price}</span><span className='text-gray-400 text-decoration: line-through'>${data.old_price}</span>
            <p ><span className='font-bold mr-1'>rating:</span>{data.rating}</p>


            <div class="flex items-center mt-4 space-x-2">
                <button
                  onClick={QuantityIncrement}
                  class="px-4 py-2 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
                <p class="text-lg font-semibold">{quantity}</p>
                <button
                  onClick={QuantityDecrement}
                  class="px-4 py-2 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
              </div>

            <div class="flex space-x-4 mt-5">
                <button
                  onClick={() => AddCart({ ...data,quantity })}
                  class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
                
              </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default ProductDetails
