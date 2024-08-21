import React from 'react'
import main2 from '../Assets/pets2.png'
import Product from '../component/Product';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';



function Home() {
   
   
  return (
    
    <div className='bg-yellow-500 min-h-screen flex flex-col '>
        
    
    <div className='w-full h-20 bg-black flex justify-center items-center'>
        <h1 className='text-white text-3xl font-bold'>
            Get <span className='text-green-700 text-3xl font-bold'>10% off</span> your first order
        </h1>
       
    </div>

    
    <div className='flex-1 flex items-center justify-between p-4'>
        
        <div className='flex-shrink-0 w-1/2'>
            <img src={main2} alt='main_image' className='w-full h-auto rounded-lg'/>
        </div>

        
        <div className='flex-1 '>
            <h1 className='text-2xl font-bold text-gray-800'>
                Find top-quality essentials and treats to keep your pets happy and healthy!
            </h1>
        </div>
    </div>


   <Product/>
   
      
    </div>
  )
}

export default Home
