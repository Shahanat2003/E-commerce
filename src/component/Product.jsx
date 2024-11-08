import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink ,Link} from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { fetchProducts } from '../Redux/ReduxSlice/ProductSlice';


function Product() {
  const dispatch = useDispatch();
  const catProducts = useSelector((state) => state.product.catProducts);
  const dogProducts = useSelector((state) => state.product.dogProducts);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  // console.log(catProducts)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
 

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {/* product of cats */}

        <div className='p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200'>
       <h1 className='text-3xl font-extrabold text-black mb-5'>Shop for Cats</h1>
       <div>
            <ul className='grid grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {catProducts.slice(0,7).map(products=>(
                    <Link to={`/Cats/${products.id}`}>
                     <li key={products.id} className='border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform  hover:scale-105 hover:shadow-2xl'>
                        <img src={products.img} alt={products.name} className='w-full h-100 object-cover'/>
                        <h2 className='text-xl font-semibold text-black mb-2'>{products.name}</h2>
                        <p className='text-gray-700 mb-1'>New Price:$ {products.newPrice}</p>
                        <p className='text-gray-500 mb-1'>New Price:$ {products.oldPrice}</p>
                    </li>
                    </Link>

                ))}
               <li className='flex justify-center items-center'>
                        <NavLink to='Cats'>
                            <div className='flex justify-center items-center w-16 h-16 bg-black rounded-full hover:scale-105 hover:shadow-2xl'>
                                <FaArrowRight className='text-3xl text-white' />
                            </div>
                        </NavLink>
                    </li>
            </ul>
        </div>

        {/* product of dogs */}

        <div className='p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200'>
        <h1 className='text-3xl font-extrabold text-black mb-5'>Shop for Dogs</h1>
        
        <div>
            <ul className='grid grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {dogProducts.slice(0,7).map(products=>(
                  
                  <Link to={`/Dogs/${products.id}`}>
                     <li key={products.id} className='border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform  hover:scale-105 hover:shadow-2xl'>
                        <img src={products.img} alt={products.name}  className='w-full h-100 object-cover'/>
                        <h2 className='text-xl font-semibold text-black mb-2'>{products.name}</h2>
                        <p className='text-gray-700 mb-1'>New Price:${products.newPrice}</p>
                        <p className='text-gray-500 mb-1'>New Price:${products.oldPrice}</p>
                        
                    </li>
                     </Link>

                ))}
               <li className='flex justify-center items-center'>
                        <NavLink to='Dogs'>
                            <div className='flex justify-center items-center w-16 h-16 bg-black rounded-full hover:scale-105 hover:shadow-2xl'>
                                <FaArrowRight className='text-3xl text-white' />
                            </div>
                        </NavLink>
                    </li>
            </ul>
        </div>
    
    </div>

    </div>
    </div>
  );
}

export default Product;
