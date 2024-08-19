import React from 'react'
import { NavLink } from 'react-router-dom';
import pic from '../Assets/image.webp'

function About() {
  return (
    <div>
         <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 min-h-screen rounded-lg ">
        
        {/* Centered Heading with space from navbar */}
        
        <h1 className="text-3xl font-bold mb-12 text-center mt-6 ">
          ABOUT
        </h1>
      
        
        <div className="flex flex-col md:flex-row items-center md:items-start p-10">
        
          <div className="md:w-1/2 flex justify-center md:justify-start mb-6 md:mb-0">
            <img src={pic} alt="pet" className="rounded-full w-96 h-96 object-cover ml-10" />
          </div>
      
        
          <div className="md:w-1/2 mr-11 text-center md:text-left">
            <p className="text-lg text-gray-700 mb-8 mt-8">
              Welcome to our pet product website! We are dedicated to providing the best products for your furry friends. 
              From nutritious food to comfortable beds and engaging toys, we have everything your pet needs to stay healthy 
              and happy. Our mission is to ensure that every pet has access to high-quality, safe, and enjoyable products.
            </p>
            
           
            <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
              <NavLink to='/Contact'>
              Contact Us
              </NavLink>
            </button>
          </div>
        </div>
        </div>
      
      
    </div>
  )
}

export default About
