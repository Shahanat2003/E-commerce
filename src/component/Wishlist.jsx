import React, { useEffect } from 'react'
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import { WishlistGet ,WishlistControl} from '../Redux/ReduxSlice/WishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Wishlist() {
    const dispatch=useDispatch()
    const {wishlistItem}=useSelector((state)=>state.wishlist)
    
    useEffect(()=>{
        dispatch(WishlistGet())
    },[dispatch])
    

    const isWishlistPrdct = (prdctId) => {
        return wishlistItem.result?.some(i => i.id === prdctId);
      }
      
  return (
    
    <div>
        
      <div className="p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-3xl font-extrabold text-black mb-10">Wishlist   </h1>

        <div>
          <ul className="grid grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItem.result?.map((products) => (
              <li
                key={products.id}
                className="relative border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                
                <div className="relative">
                  
                  <Link to={`/Dogs/${products.id}`} >
                    <img
                      src={products.image}
                      alt={products.name}
                      className="w-[calc(100%-40px)] h-100 object-cover"
                    />
                    </Link>
                  

                  
                  <div className="absolute top-2 right-0 z-10 bg-white p-2 rounded-full shadow-md">
                    {isWishlistPrdct(products.id) ? (
                      <FaHeart className="text-red-500 text-2xl cursor-pointer " onClick={() => dispatch(WishlistControl(products.id))} />
                    ) : (
                      <CiHeart className="text-black text-2xl cursor-pointer " onClick={() => dispatch(WishlistControl(products.id))} />
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-black mb-2">{products.product_Name}</h2>
                <h3 className="text-xs font-semibold text-black mb-2">{products.product_Description}</h3>
                <p className="text-gray-700 mb-1">New Price: ${products.price}</p>
     
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
