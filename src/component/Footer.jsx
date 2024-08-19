import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">PetShop</h2>
          <p className="mt-4">
            Your one-stop shop for all your pet needs. We provide quality
            products and services to keep your pets healthy and happy.
          </p>
        </div>

        
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
                <NavLink to='/'>
              <a className="hover:underline">
                Home
              </a>
              </NavLink>
            </li>
           
            <li className="mb-2">
                <NavLink to='/About'>
              <a  className="hover:underline">
                About Us
              </a>
              </NavLink>
            </li>
            <li>
                <NavLink to='/Contact'>
              <a className="hover:underline">
                Contact Us
              </a>
              </NavLink>
            </li>
          </ul>
        </div>

      
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">123 Pet Street, Animal City, PA 12345</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>


      </footer>
      
    </div>
  )
}

export default Footer
