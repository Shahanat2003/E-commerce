import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../Redux/ReduxSlice/ProductDetailsSlice';


function ProductDetailsOfAdmin() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.productDetails);
   

    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading product details: {error}</p>;
    }

    if (!data) {
        return <p>No product details found.</p>;
    }

    const product = data[0];
    

  

    return (
        <div className="flex items-center justify-center min-h-screen p-5 mx-auto my-5 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0 w-1/3 bg-gray-100 flex items-center justify-center">
                    <img src={product.img} alt="product" className="w-full h-auto rounded-lg" />
                </div>
                <div className="flex-1 p-5">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
                    <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                    <p className="font-bold">{product.category}</p>
                    <div className="mb-2">
                        <span className="text-black font-bold mr-2">${product.newPrice}</span>
                        <span className="text-gray-400 line-through">${product.oldPrice}</span>
                    </div>
                    <p><span className="font-bold mr-1">Rating:</span> {product.rating}</p>

                </div>
            </div>
        </div>
    );
}

export default ProductDetailsOfAdmin;
