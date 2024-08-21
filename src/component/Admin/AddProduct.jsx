import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddProduct() {
  const initialValue = {
    product_name: "",
    old_price: "",
    new_price: "",
    image: "",
    description: "",
    rating: "",
    category: "",
    product_type: ""
  };

  const [formValues, setFormValues] = useState(initialValue);

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/products", formValues);
      toast.success("Product added successfully");
      setFormValues(initialValue); 
    } catch (error) {
      console.log("Posting error product", error);
      toast.error("Failed to add product");
    }
  }

  return (
    <div>
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Products</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Product Name:</label>
              <input
                type="text"
                name="product_name"
                value={formValues.product_name}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Old Price:</label>
              <input
                type="number"
                name="old_price"
                value={formValues.old_price}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">New Price:</label>
              <input
                type="number"
                name="new_price"
                value={formValues.new_price}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Image URL:</label>
              <input
                type="url"
                name="image"
                value={formValues.image}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description:</label>
              <input
                type="text"
                name="description"
                value={formValues.description}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Rating:</label>
              <input
                type="text"
                name="rating"
                value={formValues.rating}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Category:</label>
              <input
                type="text"
                name="category"
                value={formValues.category}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Product Type:</label>
              <select
                name="product_type"
                value={formValues.product_type}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Select Product Type</option>
                <option value="Dogs">Dogs</option>
                <option value="Cats">Cats</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AddProduct;
