
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from '../User_sidebar';
import UserNavbar from '../User_Navbar';
import background from "../../../assets/new3.jpg";
import { ShoppingCartIcon } from '@heroicons/react/solid'; 

const BASE_URL_AND_PORT = "http://192.168.0.106:8000"; // Define the base URL and port
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf"; // Your API key
const token = localStorage.getItem('auth_token'); // Retrieve the token

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('user_id')); // Get user ID from local storage
    const [productDetails, setProductDetails] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar visibility

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
    };

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
            await axios.post(
                `${BASE_URL_AND_PORT}/cart/increasequantity`,
                {
                    quantity: 1, // Adjust quantity change as needed
                    productid: productId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'API-KEY': API_KEY // Add the API key
                    }
                }
            );
            fetchCartItems(); // Update the cart items after increasing the quantity
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            await axios.post(
                `${BASE_URL_AND_PORT}/cart/decreasemethods`,
                {
                    quantity: 1, // Adjust quantity change as needed
                    productid: productId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'API-KEY': API_KEY // Add the API key
                    }
                }
            );
            fetchCartItems(); // Update the cart items after decreasing the quantity
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const convertBase64ToBlob = (base64String) => {
        try {
            const base64Regex = /^data:image\/[a-zA-Z]*;base64,/;
            if (base64String.match(base64Regex)) {
                base64String = base64String.replace(base64Regex, ''); // Remove the data URI prefix
            }

            const byteCharacters = atob(base64String); // Decode the base64 string into bytes
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const slice = byteCharacters.slice(offset, offset + 1024);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                byteArrays.push(new Uint8Array(byteNumbers));
            }

            const blob = new Blob(byteArrays, { type: 'image/jpeg' });
            const blobUrl = URL.createObjectURL(blob);
            return blobUrl;
        } catch (error) {
            console.error("Error converting base64 to Blob:", error);
            return 'https://via.placeholder.com/150'; // Fallback image URL
        }
    };

    const parseImagePaths = (imagePathsString) => {
        try {
            const parsedJson = JSON.parse(imagePathsString.replace(/'/g, '"'));
            return parsedJson;
        } catch (error) {
            console.error("Error parsing image paths:", error);
            return []; // Return an empty array if parsing fails
        }
    };

    const placeOrder = async () => {
        console.log('Place order logic here');
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-cover bg-center bg-fixed"
            style={{ background: `url(${background})` }}
        >
            <UserNavbar onToggleSidebar={toggleSidebar} />

            <div className="flex flex-1">
                <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="container mx-auto p-4 pt-6 mt-10 bg-[#f0f0f0] ml-55">
                    <h2 className="text-3xl font-bold mb-4 ml-150 text-green-600">Your Cart</h2>
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
                                                                <img
                                                                    src={convertBase64ToBlob(parseImagePaths(productDetails[item.productid].image_paths)[0]?.data)}
                                                                    alt={productDetails[item.productid].name}
                                                                    className="w-20 h-20 object-cover mr-4"
                                                                />
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
                                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                                            <ShoppingCartIcon className="h-5 w-5 mr-2" />
                                                            Place Order
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
