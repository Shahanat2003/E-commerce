
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct ,GetCategory} from '../../Redux/ReduxSlice/AddProductSlice';

function AddProduct() {
  const initialValue = {
    Name: "",
    OldPrice: "",
    NewPrice: "",
    image: null,
    Description: "",
    CategoryId: "",
    Type: ""
  };

  const [formValues, setFormValues] = useState(initialValue);
  const dispatch = useDispatch();
  const { loading, error,category } = useSelector((state) => state.addProduct);
  useEffect(()=>{
dispatch(GetCategory())
  },[dispatch])
 

  function handleChange(e) {
    const {name,value}=e.target;
    if(name==="image"){
      setFormValues({ ...formValues, image:e.target.files[0]});
    }
    else{
      setFormValues({...formValues,[name]:value})
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData=new FormData();
    for(const key in formValues){
      formData.append(key,formValues[key])
    }
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }
  

    dispatch(addProduct(formData)); 
    console.log(formData)
    setFormValues(initialValue);
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
                  name="Name"
                  value={formValues.Name}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">OldPrice:</label>
                <input
                  type="number"
                  name="OldPrice"
                  value={formValues.OldPrice}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">NewPrice:</label>
                <input
                  type="number"
                  name="NewPrice"
                  value={formValues.NewPrice}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">image:</label>
                <input
                  type="file"
                  name="image"
                 
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description:</label>
                <input
                  type="text"
                  name="Description"
                  value={formValues.Description}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
                <input
                  type="text"
                  name="Type"
                  value={formValues.Type}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>


              <button
                type="submit"
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
