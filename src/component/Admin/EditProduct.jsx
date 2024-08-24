import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EditProduct() {
  const [catProducts, setCatProducts] = useState([]);
  const [dogProducts, setDogProducts] = useState([]);
  const [filteredCatProducts, setFilteredCatProducts] = useState([]);
  const [filteredDogProducts, setFilteredDogProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get('http://localhost:3001/products');
        const filteredDogProduct = res.data.filter((data) => data.product_type === 'Dogs');
        const filteredCatProduct = res.data.filter((data) => data.product_type === 'Cats');
        setDogProducts(filteredDogProduct);
        setCatProducts(filteredCatProduct);
        setFilteredDogProducts(filteredDogProduct);
        setFilteredCatProducts(filteredCatProduct);
      } catch (error) {
        console.log('Fetching error:', error);
      }
    }
    fetchProduct();
  }, []);

  useEffect(() => {
    const searchQueryLower = searchQuery.toLowerCase();
    setFilteredCatProducts(catProducts.filter(product =>
      product.product_name.toLowerCase().includes(searchQueryLower)
    ));
    setFilteredDogProducts(dogProducts.filter(product =>
      product.product_name.toLowerCase().includes(searchQueryLower)
    ));
  }, [searchQuery, catProducts, dogProducts]);

  async function handleDelete(product) {
    try {
      
      const updatedDogProduct = dogProducts.filter((item) => item.id !== product);
      const updatedCatProduct = catProducts.filter((item) => item.id !== product);
      
      setDogProducts(updatedDogProduct);
      setCatProducts(updatedCatProduct);
      
      
      await axios.delete(`http://localhost:3001/products/${product}`);
    } catch (error) {
      console.log("Deleting product error", error);
    }
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleDetails(product) {
    setSelectedProduct(product);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <input
        type='text'
        onChange={handleSearch}
        placeholder='Search....'
        className='mb-4 w-11/12 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 md:mb-0 md:w-auto'
      />
      <div className="space-y-8">
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Dog Products</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className='py-2 px-4 border-b'>Id</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDogProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className='py-2 px-4'>{product.id}</td>
                  <td className="py-2 px-4">
                    <img src={product.image} alt={product.product_name} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td onClick={() => handleDetails(product)} className="py-2 px-4 cursor-pointer">{product.product_name}</td>
                  <td className="py-2 px-4">${product.new_price}</td>
                  <td className="py-2 px-4 flex items-center justify-center gap-2 ">
                    <Link to={`${product.id}`}>
                      <button className="px-4 py-1 mt-4 bg-green-700 text-white hover:bg-green-800 rounded-md text-xs">Edit</button>
                    </Link>
                    <button className="px-4 py-1 mt-4 bg-red-500 text-white rounded-md text-xs hover:bg-red-600" onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Cat Products</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className='py-2 px-4 border-b'>Id</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCatProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className='py-2 px-4'>{product.id}</td>
                  <td className="py-2 px-4">
                    <img src={product.image} alt={product.product_name} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td onClick={() => handleDetails(product)} className="py-2 px-4 cursor-pointer">{product.product_name}</td>
                  <td className="py-2 px-4">${product.new_price}</td>
                  <td className="py-2 px-4 flex items-center justify-center gap-2">
                    <Link to={`${product.id}`}>
                      <button className="px-4 py-1 mt-4 bg-green-700 text-white hover:bg-green-800 rounded-md text-xs">Edit</button>
                    </Link>
                    <button className="px-4 py-1 mt-4 bg-red-500 text-white hover:bg-red-600 rounded-md text-xs" onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-5">
            <div className="flex">
              <div className="flex-shrink-0 w-1/3 bg-gray-100 flex items-center justify-center">
                <img src={selectedProduct.image} alt='product' className="w-full h-auto rounded-lg" />
              </div>
              <div className="flex-1 p-5">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{selectedProduct.product_name}</h1>
                <p className="text-lg text-gray-700 mb-4">{selectedProduct.description}</p>
                <p className="font-bold">{selectedProduct.category}</p>
                <span className="text-black font-bold mr-2">${selectedProduct.new_price}</span>
                <span className="text-gray-400 line-through">${selectedProduct.old_price}</span>
                <p><span className="font-bold mr-1">Rating:</span>{selectedProduct.rating}</p>
                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
