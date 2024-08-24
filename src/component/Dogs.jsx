import React from 'react'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Dogs() {
    const [dogProducts, setDogProducts] = useState([]);
    useEffect(()=>{
        async function fetchDogs() {
            try{
                const res = await axios.get("http://localhost:3001/products");
                const filteredDogProduct = res.data.filter(
                (data) => data.product_type === "Dogs"     
            );
            setDogProducts(filteredDogProduct)
            }
            catch(error){
                console.log("errorr fetching products:", error)
            }
        }
        fetchDogs() 
    },[])
   
  return (
    <div>
       
          <div  className='p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200'>
      <h1 className='text-3xl font-extrabold text-black mb-10'>Shop for Cats</h1>
          <div className='flex justify-center mb-6'>
           
          </div>

          <div>
            
              <ul className='grid grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {dogProducts.map(products=>(
                    <Link to={`/Dogs/${products.id}`}>
                       <li key={products.id} className='border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform  hover:scale-105 hover:shadow-2xl'>
                          <img src={products.image} alt={products.product_name} className='w-full h-100 object-cover'/>
                          <h2 className='text-xl font-semibold text-black mb-2'>{products.product_name}</h2>
                          <p className='text-gray-700 mb-1'>New Price:${products.new_price}</p>
                          <p className='text-gray-500 mb-1'>New Price:${products.old_price}</p>
                      </li>
                      </Link>
  
                  ))}
                 
              </ul>
          </div>
          
          
    </div>

    </div>
  )
}

export default Dogs
