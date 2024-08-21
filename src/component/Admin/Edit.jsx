import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


function Edit() {
    const{id}=useParams()
    const navigate=useNavigate()
    const initialValue={
        id:"",
        product_name:"",
        old_price:"",
        new_price:"",
        image:"",
        description:"",
        rating:"",
        category:"",
        product_type:""
      }
      const [formValues,setFormValues]=useState(initialValue)
      function handleChange(e){
        setFormValues({...formValues,[e.target.name]:e.target.value})
      }
      useEffect(()=>{
        async function FetchProduct(){
            try{
                const res=await axios.get(`http://localhost:3001/products/${id}`)
                setFormValues(res.data)
            }catch(error){
                console.log("error fetching product",error)
            }
        }
        FetchProduct()
      },[id])
      async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.put(`http://localhost:3001/products/${id}`,formValues)
            toast.success("updated succesfully")
            navigate('/admin/edit-product')

        }
        catch(error){
            console.log("updating error product")
        }

      }
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Products</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Id:</label>
              <input type="text" name="id" value={formValues.id} required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Product Name:</label>
              <input type="text" name="product_name" value={formValues.product_name}  required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Old Price:</label>
              <input type="number" name="old_price" value={formValues.old_price} required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">New Price:</label>
              <input type="number" name="new_price" value={formValues.new_price}  required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Image URL:</label>
              <input type="url" name="image" required value={formValues.image}  onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description:</label>
              <input type="text" name="description" value={formValues.description}  required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Rating:</label>
              <input type="text" name='rating' required value={formValues.rating}  onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Category:</label>
              <input type="text"  name="category" required value={formValues.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Product Type:</label>
              <select
                required
                value={formValues.product_type} 
                name="product_type"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Dogs">Dogs</option>
                <option value="Cats">Cats</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
