import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById, fetchUserOrders } from '../../Redux/ReduxSlice/GetUsersSlice';
import { useDispatch, useSelector } from 'react-redux';

function UserDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, orders } = useSelector((state) => state.users);
    
    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserOrders(id));
        }
    }, [dispatch, id]);

    if (loading || !data || !data.userId) {
        return <div className="flex justify-center items-center min-h-screen text-gray-700">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">User Information</h1>
                    <div className="space-y-4">
                        <p><strong className="text-gray-600">Id:</strong> {data.userId}</p>
                        <p><strong className="text-gray-600">Username:</strong> {data.userName}</p>
                        <p><strong className="text-gray-600">Email:</strong> {data.email}</p>
                       
                        <p><strong className="text-gray-600">Blocked:</strong> {data.blocked ? "Blocked" : "Active"}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h2>
                    {orders && orders.length > 0 ? (
                        <ul className="space-y-4">
                            {orders.map((item) => (
                                <li key={item.id} className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.product_name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <p><strong className="text-gray-600">Order ID:</strong> {item.order_string}</p>
                                            <p><strong className="text-gray-600">Product Name:</strong> {item.product_Name}</p>
                                            <p><strong className="text-gray-600">Total price:</strong> ${item.totalPrice}</p>
                                            <p><strong className="text-gray-600">Quantity:</strong> {item.quantity}</p>
                                            <p><strong className="text-gray-600">OrderDate:</strong> {item.orderDate}</p>
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
