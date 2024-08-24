import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';


function Chekout() {
    const location=useLocation()
    const{cartItem,totalAmount}=location.state;
    const[chekoutErrors,setChekoutErrors]=useState({})
    const initialValue={
        name:"",
        Addres:"",
        city:"",
        Phno:"",
        postalcode:"",
        Accno:"",
        price:totalAmount
    }
    const[paymentDetails,setPaymentDetails]=useState(initialValue)
    
    function handleChange(e){
        const{name,value}=e.target
        setPaymentDetails({...paymentDetails,[name]:value})

    }
    function validate(){
        const errors={};
        if(paymentDetails.Phno.length!==10)
            errors.Phno="the phone number must contain 10 digits"
        
        else if(paymentDetails.Phno.length>10)
            errors.Phno="the Phone no only contain 10 digits"
        if(paymentDetails.Accno.length !== 12)
            errors.Accno="Account number must be exactly 12 digits."
        setChekoutErrors(errors)
        return Object.keys(errors).length===0;
    }
    
    async function ChekoutSubmit(e){
        e.preventDefault()
        if(validate()){
       
        try{

            const user=localStorage.getItem("id")
            const existingUser=await axios.get(`http://localhost:3001/user/${user}`)
            const existingOrder=existingUser.data?.orders
            let updatedOrders;
            if(existingOrder){
                updatedOrders=existingOrder
                updatedOrders.push(...cartItem)
            }else{
                updatedOrders=cartItem
            }

            await axios.patch(`http://localhost:3001/user/${user}`,{
                paymentDetails:paymentDetails,
                orders:updatedOrders
                
            })
            
                toast.success("payment succesfully completed")
                setPaymentDetails({...initialValue,price:totalAmount})
        }
        catch(error){
            alert("chekout error:",error)

        }
    }
    }
    return (
        <div>
           
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 w-full'>
            
            <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white mt-6 flex justify-between w-full">
                
                
                <div className="w-full md:w-2/3 mr-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Checkout Form</h1>
                        <form onSubmit={ChekoutSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input 
                            type="text" 
                            id='name'
                            name='name'
                            value={paymentDetails.name} 
                            onChange={handleChange}
                            placeholder="Enter your name" 
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input 
                            type="text" 
                            placeholder="Enter your address"
                            id='Addres'
                            name='Addres'
                            value={paymentDetails.Addres} 
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input 
                            type="text" 
                            id='city'
                            name='city'
                            value={paymentDetails.city} 
                            onChange={handleChange}
                            required
                            placeholder="Enter your city" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                   
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input 
                            type="number" 
                            id='Phno'
                            name='Phno'
                            value={paymentDetails.Phno} 
                            onChange={handleChange}
                            required
                            placeholder="Enter your number" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {chekoutErrors.Phno&&(
                        <p className='text-red-500 text-sm mt-1'>{chekoutErrors.Phno}</p>
                         )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input 
                            type="text" 
                            id='postalcode'
                            name='postalcode'
                            value={paymentDetails.postalcode} 
                            onChange={handleChange}
                            required
                            placeholder="Enter your postal code" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Account number</label>
                        <input 
                            type="text" 
                            id='Accno'
                            name='Accno'
                            value={paymentDetails.Accno} 
                            onChange={handleChange}
                            required
                            placeholder="Enter your Account number" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        {chekoutErrors.Accno&&(
                        <p className='text-red-500 text-sm mt-1'>{chekoutErrors.Accno}</p>
                         )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700"></label>
                        <input 
                            type="text" 
                            id='price'
                            name='price'
                            value={totalAmount} 
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                    >
                        Pay {totalAmount}
                    </button>
                    </div>
                    </form>

                </div>

            
                <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-md shadow-inner max-h-[400px] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">Summary</h2>
                    <ul className="space-y-4">
                        {cartItem.map((item, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                <img src={item.image} alt={item.product} className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <p className="text-sm font-medium">{item.product}</p>
                                    <p className="text-sm font-medium">Quantity: {item.quantity}</p>

                                    <p className="text-sm text-gray-600">Price: ${item.new_price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 text-lg font-bold">
                        <p>Total: ${totalAmount}</p>
                    </div>
                </div>
            </div>
           
        </div>
        
        </div>
    );
}

export default Chekout
