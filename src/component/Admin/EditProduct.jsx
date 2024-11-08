import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCatProducts, getDogProducts, DeleteProduct } from '../../Redux/ReduxSlice/AllProductSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function EditProduct() {
  const dispatch = useDispatch();
 const[searchQuery,setSearchQuery]=useState('')
 const [filterdCats,setFilterdCats]=useState([])
 const [filterdDogs,setFilterdDogs]=useState([])
 
  const { Dogproducts, error, CatProducts } = useSelector((state) => state.allProduct);

  useEffect(() => {
    
      dispatch(getDogProducts());
    dispatch(getCatProducts());
   
    
  }, [dispatch]);
  useEffect(()=>{
    const searchedQuerylower=searchQuery.toLowerCase();
     setFilterdCats(CatProducts.filter(product=>product.name.toLowerCase().includes(searchedQuerylower)))
     setFilterdDogs(Dogproducts.filter(product=>product.name.toLowerCase().includes(searchedQuerylower)))

  },[searchQuery,CatProducts,Dogproducts])

  if (error) {
    console.log(error);
  }
  
  function handleSearch(e){
    setSearchQuery(e.target.value)
  }


  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="space-y-8">
      <input
              type='text'
              onChange={handleSearch}
              placeholder='Search....'
              className='mb-4 w-11/12 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 md:mb-0 md:w-auto'
            />
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Dog Products</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className="py-2 px-4 border-b">Id</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterdDogs?.length > 0 ? (
                filterdDogs.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-2 px-4">{product.id}</td>
                    <td className="py-2 px-4">
                      <img src={product.img} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <Link to={`product/${product.id}`}>
                      <td className="py-2 px-4 cursor-pointer">{product.name}</td>
                    </Link>
                    <td className="py-2 px-4">${product.newPrice}</td>
                    <td className="py-2 px-4 flex items-center justify-center space-x-2">
                      <Link to={`${product.id}`}>
                        <button className="px-4 py-1 bg-green-700 text-white hover:bg-green-800 rounded-md text-xs">Edit</button>
                      </Link>
                      <button
                        className="px-4 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                        onClick={() => dispatch(DeleteProduct(product.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">No Dog Products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Cat Products</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className="py-2 px-4 border-b">Id</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterdCats?.length > 0 ? (
                filterdCats.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-2 px-4">{product.id}</td>
                    <td className="py-2 px-4">
                      <img src={product.img} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <Link to={`product/${product.id}`}>
                      <td className="py-2 px-4 cursor-pointer">{product.name}</td>
                    </Link>
                    <td className="py-2 px-4">${product.newPrice}</td>
                    <td className="py-2 px-4 flex items-center justify-center space-x-2">
                      <Link to={`${product.id}`}>
                        <button className="px-4 py-1 bg-green-700 text-white hover:bg-green-800 rounded-md text-xs">Edit</button>
                      </Link>
                      <button
                        className="px-4 py-1 bg-red-500 text-white hover:bg-red-600 rounded-md text-xs"
                        onClick={() => dispatch(DeleteProduct(product.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">No Cat Products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
