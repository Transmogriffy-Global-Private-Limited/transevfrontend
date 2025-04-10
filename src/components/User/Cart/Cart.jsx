import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from '../User_sidebar';
import UserNavbar from '../User_Navbar';
import background from "../../../assets/new3.jpg";
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom'; 

const BASE_URL_AND_PORT = "http://192.168.0.106:8000";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";
const token = localStorage.getItem('auth_token');

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));
    const [productDetails, setProductDetails] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentOption, setPaymentOption] = useState("Cash");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        if (!userId) {
            alert('Please login first');
            return;
        }
        fetchCartItems();
    }, [userId]);

    const fetchCartItems = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL_AND_PORT}/cart/getcartdetails`,
                { user_id: userId },
                {
                    headers: {
                        'API-KEY': API_KEY,
                    },
                }
            );
            console.log('Fetched Cart Items:', response.data.cart_items); 
    
            setCartItems(response.data.cart_items);
    
            // Fetch product details based on cartItems
            fetchProductDetails(response.data.cart_items);
    
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    const increaseQuantity = async (productId) => {
                try {
                    const response = await axios.post(
                        `${BASE_URL_AND_PORT}/cart/increasequantity`,
                        {
                            quantity: 1,
                            productid: productId
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'API-KEY': API_KEY
                            }
                        }
                    );
                    fetchCartItems();
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message === "No stock available") {
                        alert(`No stock available for ${productDetails[productId]?.name || 'this product'}`);
                    } else {
                        console.error('Error increasing quantity:', error);
                    }
                }
            };
        
            const decreaseQuantity = async (productId) => {
                try {
                    await axios.post(
                        `${BASE_URL_AND_PORT}/cart/decreasemethods`,
                        {
                            quantity: 1,
                            productid: productId
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'API-KEY': API_KEY
                            }
                        }
                    );
                    fetchCartItems();
                } catch (error) {
                    console.error('Error decreasing quantity:', error);
                }
            };
        
    const fetchProductDetails = async (cartItems) => {
        const details = {};
        let total = 0;

        for (const item of cartItems) {
            try {
                const response = await axios.get(`${BASE_URL_AND_PORT}/products/get_by_id/${item.productid}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'API-KEY': API_KEY
                    }
                });
                details[item.productid] = response.data;

                // Calculate total amount based on price and quantity
                const price = response.data.price || 0;
                total += price * item.quantity; // Add the price multiplied by quantity to the total
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        setProductDetails(details);
        setTotalAmount(total); // Set the total amount after calculating
    };
    const convertBase64ToBlob = (base64String) => {
                try {
                    const base64Regex = /^data:image\/[a-zA-Z]*;base64,/;
                    if (base64String.match(base64Regex)) {
                        base64String = base64String.replace(base64Regex, '');
                    }
                    const byteCharacters = atob(base64String);
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
                    return URL.createObjectURL(blob);
                } catch (error) {
                    console.error("Error converting base64 to Blob:", error);
                    return 'https://via.placeholder.com/150';
                }
            };
        
            const parseImagePaths = (imagePathsString) => {
                try {
                    const parsedJson = JSON.parse(imagePathsString.replace(/'/g, '"'));
                    return parsedJson;
                } catch (error) {
                    console.error("Error parsing image paths:", error);
                    return [];
                }
            };
        
            const placeOrder = async (productId) => {
                try {
                    // Find the specific item clicked by the user
                    const item = cartItems.find(item => item.productid === productId);
                    
                    if (!item) {
                        alert('Item not found in your cart.');
                        return;
                    }
            
                    // Get product details for this cart item
                    const product = productDetails[item.productid];
            
                    // Calculate the total price for the item (product price * quantity)
                    const itemTotalAmount = product ? product.price * item.quantity : 0;
            
                    // Ensure totalAmount is set and is not zero
                    if (!itemTotalAmount || itemTotalAmount === 0) {
                        alert('Total amount cannot be zero. Please check the product price.');
                        return;
                    }
            
                    // Prepare the order details for this specific product
                    const payload = {
                        user_id: userId,  // Ensure user_id is added here and not null
                        productid: item.productid,  // Product ID from cart item
                        order_quantity: item.quantity.toString(), // Quantity from cart item
                        totalamount: itemTotalAmount.toString(),  // Total amount for this item
                        paymentoption: paymentOption,  // Payment method (Cash, UPI, etc.)
                        orderstatus: "null",  // Placeholder for order status
                    };
            
                    // Debugging: Log the order details before making the API call
                    console.log('Payload for Product ID', item.productid, ':', payload);
            
                    // Call the API to place the order for this specific product
                    const response = await axios.post(
                        `${BASE_URL_AND_PORT}/order/addorder`,
                        payload,  // Send the payload for the specific product
                        {
                            headers: {
                                'API-KEY': API_KEY,
                            },
                        }
                    );
            
                    // Debugging: Log the API response
                    console.log('API Response for Product ID', item.productid, ':', response);
            
                    // Handle the response from the API
                    if (paymentOption === "Cash") {
                        alert(`Order placed successfully for ${product.name}!`);
                    } else {
                        // If payment is not "Cash", navigate to the payment page
                        navigate(`/payment/${response.data.order_id}`);
                    }
                } catch (error) {
                    console.error('Error placing order:', error);
                    alert('Failed to place the order. Please try again.');
                }
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
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product</th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Quantity</th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price</th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
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
                                                         <button
                                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                                            onClick={() => decreaseQuantity(item.productid)}
                                                        >-</button>
                                                        <span className="px-3">{item.quantity}</span>
                                                        <button
                                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                                            onClick={() => increaseQuantity(item.productid)}
                                                        >+</button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.price}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <select
                                                            className="border px-2 py-1 rounded"
                                                            value={paymentOption}
                                                            onChange={(e) => setPaymentOption(e.target.value)}
                                                        >
                                                            <option value="Cash">Cash</option>
                                                            <option value="UPI">UPI</option>
                                                            <option value="Card">Card</option>
                                                        </select>
                                                        <button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mt-2"
    onClick={() => placeOrder(item.productid)}  // Pass the product ID to the placeOrder function
>
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
