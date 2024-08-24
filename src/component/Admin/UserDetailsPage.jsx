import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserDetailsPage() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axios.get(`http://localhost:3001/user/${id}`);
                setUserData(res.data);
            } catch (error) {
                console.log("Error fetching user data", error);
            }
        }
        fetchUser();
    }, [id]);

    if (!userData) {
        return <div className="flex justify-center items-center min-h-screen text-gray-700">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">User Information</h1>
                    <div className="space-y-4">
                        <p><strong className="text-gray-600">Id:</strong> {userData.id}</p>
                        <p><strong className="text-gray-600">Username:</strong> {userData.username}</p>
                        <p><strong className="text-gray-600">Email:</strong> {userData.email}</p>
                        {/* <p><strong className="text-gray-600">Password:</strong> {userData.password}</p> */}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h2>
                    {userData.orders && userData.orders.length > 0 ? (
                        <ul className="space-y-4">
                            {userData.orders.map((item) => (
                                <li key={item.id} className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.product_name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <p><strong className="text-gray-600">Order ID:</strong> {item.id}</p>
                                            <p><strong className="text-gray-600">Product Name:</strong> {item.product_name}</p>
                                            <p><strong className='text-gray-600'>Total price:</strong> ${item.new_price}</p>
                                            <p><strong className='text-gray-600'>Quantity:</strong>{item.quantity}</p>

                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No orders available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetailsPage;
