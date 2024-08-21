import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'



function Login() {
   
    const navigate=useNavigate()
    const[loginValue,setLoginValue]=useState({email:"",password:""})
    const[loginErors,setLoginErors]=useState({email:"",password:""})

   async function handleSubmit(e){
    e.preventDefault();
    const validation={};
    try{
      const response=await axios.get("http://localhost:3001/user")
      const user=response.data.find((use)=>use.email===loginValue.email)

      if(user){
        if(user.blocked){
          toast.warning("your account is blocked")
        }
        else if(user.password===loginValue.password){
          toast.success("login succesfully!");
          localStorage.setItem("id",user.id)
          localStorage.setItem("name",user.username)
          if(user.admin){
            navigate('/admin/Dashboard')
          }
          else{
          navigate('/')
          window.location.reload()
          }
        }
        else{
          validation.password="incorrect password"
          toast.warning("incorrect password")

        }

      }else{
        validation.email="Email not found"
        validation.password="incorrect password"
  
      }
    
    }catch(error){
      toast.error("Errors:"+error)
    }
    setLoginErors(validation)
    }
    function handleChange(e){
      setLoginValue({...loginValue,[e.target.name]:e.target.value})
    }

  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 w-full absolute top-0 z-50">
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
      
      <div >
        <label for ="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type='email' id="email" name="email" value={loginValue.email} onChange={handleChange} class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" ></input>
        {loginErors.email&&(<span className='text-red-500 text-sm'>{loginErors.email}</span>)}
      </div>
      <div>
        <labell for='password'class='block text-gray-700 text-sm font-bold mb-2'> Password:</labell>
        <input type='password' id="password" name="password" value={loginValue.password} onChange={handleChange} class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" ></input>
        {loginErors.password&&(<span className='text-red-500 text-sm'>{loginErors.password}</span>)}
      </div>
      
        <button type='submit' class="w-full bg-green-400 text-white py-3 rounded-md mt-5 hover:bg-green-600">Login</button>
      
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <Link to='/Sign' className='text-blue-600 hover:underline'>SignUp</Link>
        </p>
      </div>
    </div>
  )
}

export default Login