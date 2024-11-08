import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Chekout() {
    const location = useLocation();
    const [RazrPay, setRazrPay] = useState(null);
    const [RazrPayLoad, setRazrPayLoad] = useState(false);
    const { cartItem, totalAmount } = location.state;

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => reject(false);
            document.body.appendChild(script);
        });
    };

    const [paymentDetails, setPaymentDetails] = useState({
        customer_name: "",
        customer_address: "",
        customer_email: "",
        customer_city: "",
        customer_phone: "",
        //      
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const ChekoutSubmit = async (e) => {
        e.preventDefault();

        if (!RazrPayLoad) {
            try {
                const scriptLoad = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
                setRazrPayLoad(scriptLoad);
            } catch (error) {
                toast.error("Error loading payment script.");
                return;
            }
        }

        // if (!window.Razorpay) {
        //     toast.error("Razorpay SDK failed to load. Please check your connection.");
        //     return;
        // }

        try {
            const res = await axios.post(
                `https://localhost:7199/api/Order/RazorIdCreate?price=${totalAmount}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const orderId = res.data;
            const options = {
                amount: totalAmount,
                currency: "INR",
                name: "petPals",
                description: "Order Payment",
                order_id: orderId,
                handler: async (response) => {
                    const paymentData = {
                        razor_payId: response.razorpay_payment_id,
                        razor_OrderId: response.razorpay_order_id,
                        razor_Sign: response.razorpay_signature
                    };
                    setRazrPay(paymentData);

                    try {
                        await axios.post("https://localhost:7199/api/Order", paymentData, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });

                        await axios.post("https://localhost:7199/api/Order/createOrder", {
                            ...paymentDetails,
                            total_price: totalAmount,
                            transaction_id: response.razorpay_payment_id,
                            order_string: response.razorpay_order_id
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                        // console.log(response.razorpay_payment_id)

                        toast.success("Order placed successfully!");
                    } catch (error) {
                        console.error("Payment error:", error);
                        toast.error("Payment failed.");
                    }
                },
                prefill: {
                    name: paymentDetails.customer_name,
                    email: paymentDetails.customer_email,
                    contact: paymentDetails.customer_phone
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razorPay = new window.Razorpay(options);
            razorPay.open();
        } catch (error) {
            console.log("Error creating order:", error);
            toast.error("Failed to create order.");
        }
    };

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
                            id='customer_name'
                            name='customer_name'
                            value={paymentDetails.customer_name} 
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
                            id='customer_address'
                            name='customer_address'
                            value={paymentDetails.customer_address} 
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input 
                            type="text" 
                            id='customer_city'
                            name='customer_city'
                            value={paymentDetails.customer_city} 
                            onChange={handleChange}
                            required
                            placeholder="Enter your city" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="text" 
                            id='customer_email'
                            name='customer_email'
                            value={paymentDetails.customer_email} 
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
                            id='customer_phone'
                            name='customer_phone'
                            value={paymentDetails.customer_phone} 
                            onChange={handleChange}
                            required
                            placeholder="Enter your number" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {/* {chekoutErrors.Phno&&(
                        <p className='text-red-500 text-sm mt-1'>{chekoutErrors.Phno}</p>
                         )} */}
                    </div>

                    {/* <div className="mb-4">
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
                    </div> */}
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

export default Chekout;
