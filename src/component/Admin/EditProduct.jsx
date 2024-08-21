import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EditProduct() {
  const [catProducts, setCatProducts] = useState([]);
  const [dogProducts, setDogProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get('http://localhost:3001/products');
        const filteredDogProduct = res.data.filter((data) => data.product_type === 'Dogs');
        const filteredCatProduct = res.data.filter((data) => data.product_type === 'Cats');

        setDogProducts(filteredDogProduct);
        setCatProducts(filteredCatProduct);
      } catch (error) {
        console.log('Fetching error:', error);
      }
    }
    fetchProduct();
  }, []);
  async function handleDelete(product){
    try{
      const updatedDogProduct=catProducts.filter((item)=>item.id!==product
    )
    setDogProducts(updatedDogProduct)
    const updatedCatProduct=dogProducts.filter((item)=>item.id!==product)
    setCatProducts(updatedCatProduct)
    await axios.delete((`http://localhost:3001/products/${product}`))
    
    
    }
    catch(error){
      console.log("deleting product error",error)
    }
    

  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 ">
      <div className="space-y-8 text-center">
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Dog Products</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
              <th className='py-2 px-4 border-b'>Id</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                
              </tr>
            </thead>
            <tbody>
              {dogProducts.map((product) => (
                <tr key={product.id}>
                  <td className='py-2 px-4 border-b'>{product.id}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={product.image} alt={product.product_name} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  
                  <td className="py-2 px-4 border-b">{product.product_name}</td>
                  <td className="py-2 px-4 border-b">${product.new_price}</td>
                  <td className="py-2 px-4 border-b">
                  <Link to={`${product.id}`}>
                    <button className="mr-2 px-4 py-1 bg-green-700 text-white hover:bg-green-800 rounded-md text-xs">
                      
                      Edit
                      </button></Link>
                    <button className="px-4 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600" onClick={()=>handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-4">Cat Products</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Id</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                
              </tr>
            </thead>
            <tbody>
              {catProducts.map((product) => (
                <tr key={product.id}>
                  <td className='py-2 px-4 border-b'>{product.id}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={product.image} alt={product.product_name} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  
                  <td className="py-2 px-4 border-b">{product.product_name}</td>
                  <td className="py-2 px-4 border-b">${product.new_price}</td>
                  <td className="py-2 px-4 border-b">
                  <Link to={`${product.id}`}>
                    <button className="mr-2 px-4 py-1 bg-green-600 text-white rounded-md">
                      
                      Edit
                      </button></Link>
                    <button className="px-4 py-1 bg-red-500 text-white rounded-md" onClick={()=>handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
