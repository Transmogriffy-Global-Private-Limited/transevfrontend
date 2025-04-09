import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Your API key
const token = localStorage.getItem('auth_token'); // Retrieve the token

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('user_id')); // Get user ID from local storage
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        // Check if user is logged in by checking userId
        if (!userId) {
            alert('Please login first'); // Alert if user is not logged in
            return; // Stop further execution if not logged in
        }

        // Fetch cart items and product details if user is logged in
        fetchCartItems();
    }, [userId]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL_AND_PORT}/cart/getcartdetails`, // The URL
                {
                    user_id: userId, // Body of the request
                },
                {
                    headers: {
                        'API-KEY': API_KEY, // Adding the API-KEY header
                    },
                }
            );
    
            // Set the cart items from the response data
            setCartItems(response.data.cart_items);
    
            // Fetch product details for each item in the cart
            fetchProductDetails(response.data.cart_items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    

    const fetchProductDetails = async (cartItems) => {
        const details = {};
        for (const item of cartItems) {
            try {
                const response = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${item.productid}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'API-KEY': API_KEY
                    }
                });
                details[item.productid] = response.data;
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
        setProductDetails(details);
    };

    const increaseQuantity = async (productId) => {
        try {
            // Make the POST request to increase quantity
            await axios.post(
                `${BASE_URL_AND_PORT}/cart/increasequantity`,
                {
                    quantity: 4,
                    productid: productId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add the auth token
                        'API-KEY': API_KEY // Add the API key
                    }
                }
            );
            fetchCartItems(); // Update the cart items
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };
    
    const decreaseQuantity = async (productId) => {
        try {
            // Make the POST request to decrease quantity
            await axios.post(
                `${BASE_URL_AND_PORT}/cart/decreasemethods`,
                {
                    quantity: 2,
                    productid: productId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add the auth token
                        'API-KEY': API_KEY // Add the API key
                    }
                }
            );
            fetchCartItems(); // Update the cart items
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };
    

    const placeOrder = async () => {
        // Implement logic to place order using API
        console.log('Place order logic here');
    };

    return (
        <div className="container mx-auto p-4 pt-6 mt-10">
            <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Quantity</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price</th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.productid}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {productDetails[item.productid] && (
                                                    <div>
                                                        <img src={productDetails[item.productid].images} alt="Product Image" className="w-20 h-20 object-cover mr-4" />
                                                        <span>{productDetails[item.productid].name}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => decreaseQuantity(item.productid)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => increaseQuantity(item.productid)}>+</button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={placeOrder}>Place Order</button>
            </div>
        </div>
    );
}

export default CartPage;
