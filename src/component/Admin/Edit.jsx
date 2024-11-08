import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FetchEditProduct,EditProduct } from '../../Redux/ReduxSlice/EditProductSlice'
import { GetCategory } from '../../Redux/ReduxSlice/AddProductSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'


function Edit() {
    const{id}=useParams()
    
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {error,loading,status}=useSelector((state)=>state.editProduct)

   
    const{category}=useSelector((state)=>state.addProduct)
   

    const initialValue={
        // id:"",
        name:"",
        oldPrice:"",
        newPrice:"",
        img:null,
        description:"",
        // rating:"",
        CategoryId:"",
        type:""
      }
      // console.log(status)

      const [formValues,setFormValues]=useState(initialValue)
     
      useEffect(()=>{
        dispatch(FetchEditProduct({id}))
      },[dispatch,id])


      useEffect(()=>{
        dispatch(GetCategory())
      },[dispatch])

      useEffect(() => {
        if ( status.length > 0) {
            setFormValues(status[0]) 
        }
    }, [status])

      function handleChange(e){
        
        const {name,value}=e.target;
        if(name==='img'){
          setFormValues({...formValues,image:e.target.files[0]})
        }else{
          setFormValues({...formValues,[name]:value})
        }
        
      }
      
     
    
      async function handleSubmit(e){
        e.preventDefault()
        // console.log(formValues)
        

        dispatch(EditProduct({id,formValues}))
        toast.success("updated succesfully")
        navigate('/admin/edit-product')

       
      }
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Products</h2>
          <form onSubmit={handleSubmit}>
           

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Product Name:</label>
              <input type="text" name="name" value={formValues.name}  required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Old Price:</label>
              <input type="number" name="oldPrice" value={formValues.oldPrice} required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">New Price:</label>
              <input type="number" name="newPrice" value={formValues.newPrice}  required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Image URL:</label>
              <input type="file" name="img" required   onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description:</label>
              <input type="text" name="description" value={formValues.description}  required onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Rating:</label>
              <input type="text" name='rating' required value={formValues.rating}  onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div> */}

                <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">CategoryId:</label>
                <select
                  type="number"
                  name="CategoryId"
                  value={formValues.CategoryId}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">select the category</option>
                {category.map((catgry)=>(
                <option key={catgry.id} value={catgry.id}>{catgry.name}</option>))}
                </select>
              </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Type:</label>
              <input type="text"  name="type" required value={formValues.type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
