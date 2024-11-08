import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; 
import { CiHeart } from "react-icons/ci";
import { fetchCats, WishlistControl, WishlistGet } from '../Redux/ReduxSlice/WishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/ReduxSlice/ProductSlice';

function Cats() {
  const dispatch = useDispatch();
  const { wishlistItem,loading, error } = useSelector((state) => state.wishlist);
  const{catProducts}=useSelector((state)=>state.product)

  
  useEffect(() => {
    dispatch(WishlistGet());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])

  const isWishlistPrdct = (prdctId) => {
    return wishlistItem.result?.some(i => i.id === prdctId);
  }
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data.</div>;
  }

  return (
    <div>
      <div className="p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
        <h1 className="text-3xl font-extrabold text-black mb-10">Shop for Cats</h1>

        <div>
          <ul className="grid grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {catProducts.map((products) => (
              <li
                key={products.id}
                className="relative border rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                
                <div className="relative">
                  <Link to={`/Cats/${products.id}`} className="block">
                    <img
                      src={products.img}
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

                <h2 className="text-xl font-semibold text-black mb-2">{products.name}</h2>
                <p className="text-gray-700 mb-1">New Price: ${products.newPrice}</p>
                <p className="text-gray-500 mb-1">Old Price: ${products.oldPrice}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cats;
