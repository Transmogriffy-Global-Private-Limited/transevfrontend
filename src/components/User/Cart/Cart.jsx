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
    const [selectedPaymentOption, setSelectedPaymentOption] = useState({});  // Track payment option per product
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showPaymentOptions, setShowPaymentOptions] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const handlePlaceOrder = (productId) => {
        setShowPaymentOptions(productId); // Show payment options for the selected product
    };
    const handlePaymentOptionChange = (productId, value) => {
        setSelectedPaymentOption({
            ...selectedPaymentOption,
            [productId]: value,
        });
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
            setCartItems(response.data.cart_items);
            fetchProductDetails(response.data.cart_items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    const fetchUserAddresses = async () => {
        const token = localStorage.getItem('auth_token');
      
        try {
          const response = await fetch(`${BASE_URL_AND_PORT}/users/address`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'API-KEY': API_KEY,
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
          if (response.ok && data?.length) {
            setUserAddresses(data); // Store addresses
          } else {
            setUserAddresses([]); // No addresses available
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      };
      const [userAddresses, setUserAddresses] = useState([]);
      const [defaultAddress, setDefaultAddress] = useState(null);
      
      // Set default address after fetching user addresses
      useEffect(() => {
        fetchUserAddresses();
      }, []);
      
      useEffect(() => {
        if (userAddresses?.length) {
          // Find the address with is_default: true
          const defaultAddr = userAddresses.find(address => address.is_default === true);
          if (defaultAddr) {
            setDefaultAddress(defaultAddr); // Set the default address
          }
        }
      }, [userAddresses]);
            
    const fetchProductDetails = async (cartItems) => {
        const details = {};
        let total = 0;

        for (const item of cartItems) {
            try {
                const response = await axios.get(
                    `${BASE_URL_AND_PORT}/products/get_by_id/${item.productid}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'API-KEY': API_KEY,
                        },
                    }
                );
                details[item.productid] = response.data;
                total += response.data.price * item.quantity;
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        setProductDetails(details);
        setTotalAmount(total);
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
    const handlePayment = async (orderId, productId, totalAmount, orderPayload) => {
        const options = {
            key: 'rzp_test_nzmqxQYhvCH9rD', // Replace with your Razorpay key
            amount: totalAmount * 100, // Amount in paise
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Order Payment',
            order_id: orderId,
            handler: async function (response) {
                try {
                    // Step 1: Verify the payment after it's processed
                    const verifyResponse = await axios.post(
                        `${BASE_URL_AND_PORT}/payments/verifypayment`,
                        {
                            razorpaypaymentid: response.razorpay_payment_id,
                            user_id: userId,
                            productid: productId,
                            price: totalAmount,
                        },
                        {
                            headers: {
                                'API-KEY': API_KEY,
                            },
                        }
                    );
    
                    // Check the actual response content from the server
                    if (verifyResponse.data) {
                        // Step 2: If Razorpay payment is successful, call the addorder API to place the order
                        const addOrderResponse = await axios.post(
                            `${BASE_URL_AND_PORT}/order/addorder`,
                            orderPayload,
                            {
                                headers: { 'API-KEY': API_KEY },
                            }
                        );
    
                        if (addOrderResponse.data) {
                            alert('Payment successful and order placed!');
                            navigate(`/order`); // Redirect to orders page
                        } else {
                            alert('Failed to place the order after payment. Please try again.');
                        }
                    } else {
                        alert('Payment verification failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('Payment verification failed. Please try again.');
                }
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#F37254',
            },
        };
    
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
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
                          const item = cartItems.find(item => item.productid === productId);
                      
                          if (!item) {
                            alert('Item not found in your cart.');
                            return;
                          }
                      
                          const product = productDetails[item.productid];
                          const itemTotalAmount = product ? product.price * item.quantity : 0;
                      
                          if (!itemTotalAmount || itemTotalAmount === 0) {
                            alert('Total amount cannot be zero. Please check the product price.');
                            return;
                          }
                      
                          const paymentMethod = selectedPaymentOption[productId] || "Cash"; // Default to "Cash"
                      
                          // ✅ Get default delivery address
                          const defaultAddr = userAddresses.find(address => address.is_default === true);
                      
                          if (!defaultAddr) {
                            alert('Please set a default delivery address before placing an order.');
                            return;
                          }
                      
                       
                        const deliveryAddress = `House Building: ${defaultAddr.house_building}, Locality/Street: ${defaultAddr.locality_street}, City: ${defaultAddr.city},Landmark: ${defaultAddr.landmark},PO/PS:  ${defaultAddr.po_ps}, State: ${defaultAddr.state}, Country: ${defaultAddr.country}, Pin: ${defaultAddr.pin}`;

                      
                          // ✅ Prepare final payload
                          const orderPayload = {
                            user_id: userId,
                            productid: item.productid,
                            order_quantity: item.quantity.toString(),
                            totalamount: itemTotalAmount.toString(),
                            paymentoption: paymentMethod,
                            orderstatus: "null",
                            deliveryaddress: deliveryAddress,
                          };
                      
                          console.log('Payload for Product ID', item.productid, ':', orderPayload);
                      
                          if (paymentMethod === "Cash") {
                            const response = await axios.post(
                              `${BASE_URL_AND_PORT}/order/addorder`,
                              orderPayload,
                              {
                                headers: {
                                  'API-KEY': API_KEY,
                                },
                              }
                            );
                      
                            if (response.data) {
                              alert(`Order placed successfully for ${product.name} with Cash payment!`);
                              navigate(`/order`);
                            } else {
                              alert('Failed to place the order with Cash payment. Please try again.');
                            }
                          } else {
                            const createPaymentRes = await axios.post(
                              `${BASE_URL_AND_PORT}/payments/createpayment`,
                              {
                                user_id: userId,
                                productid: productId,
                                price: itemTotalAmount
                              },
                              {
                                headers: { 'API-KEY': API_KEY }
                              }
                            );
                      
                            const razorpayOrderId = createPaymentRes.data.order_id;
                      
                            if (!razorpayOrderId) {
                              alert('Failed to create payment order. Please try again.');
                              return;
                            }
                      
                            const script = document.createElement('script');
                            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                            script.async = true;
                            script.onload = () => {
                              handlePayment(razorpayOrderId, productId, itemTotalAmount, orderPayload);
                            };
                            document.body.appendChild(script);
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
                                                        ₹{item.price}
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <button
                                        className="bg-pink-500 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handlePlaceOrder(item.productid)}
                                    >
                                        
                                        Place Order
                                        <ShoppingCartIcon className="h-5 w-5 mr-2" />
                                    </button>

                                    {showPaymentOptions === item.productid && (
                                        <div className="mt-4">
                                            <select
                                                className="border px-2 py-1 rounded"
                                                value={selectedPaymentOption[item.productid] || "Cash"}
                                                onChange={(e) => handlePaymentOptionChange(item.productid, e.target.value)}
                                            >
                                                <option value="Cash">Cash</option>
                                                <option value="UPI">UPI</option>
                                                <option value="Card">Card</option>
                                            </select>
                                            <button
                                                className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-5"
                                                onClick={() => placeOrder(item.productid)}
                                            >
                                                Confirm Order
                                            </button>
                                        </div>
                                    )}
                                </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        
                                    </table>
                                    <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-96 ml-auto mb-150">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-xl text-gray-800">Delivery Address</h3>
    <button
      onClick={() => navigate('/profile')}
      className="text-sm text-blue-600 hover:text-blue-800 underline"
    >
      Change
    </button>
  </div>

  {defaultAddress ? (
    <div className="space-y-1 text-sm text-gray-700">
      <p><strong>House Building:</strong> {defaultAddress.house_building}</p>
      <p><strong>Locality/Street:</strong> {defaultAddress.locality_street}</p>
      <p><strong>City:</strong> {defaultAddress.city}</p>
      <p><strong>State:</strong> {defaultAddress.state}</p>
      <p><strong>Country:</strong> {defaultAddress.country}</p>
      <p><strong>Pin:</strong> {defaultAddress.pin}</p>
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No default address set.</p>
  )}
</div>


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