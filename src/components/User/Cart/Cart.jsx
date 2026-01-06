import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from '../User_sidebar';
import UserNavbar from '../User_Navbar';
import background from "../../../assets/hotels.jpg";
import { ShoppingCartIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';


const BASE_URL_AND_PORT = "https://api.static.ev.transev.site";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [globalPaymentOption, setGlobalPaymentOption] = useState("Cash");
    const [userProfile, setUserProfile] = useState({
  name: "",
  email: "",
  phone: ""
});

const [imageIndex, setImageIndex] = useState({});
    
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
useEffect(() => {
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL_AND_PORT}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "API-KEY": API_KEY,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUserProfile({
          name: data.user_data?.name || "Customer",
          email: data.user_data?.email || "",
          phone: data.user_data?.phone || "",
        });
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  fetchUserProfile();
}, [navigate]);

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
                                    productid: productId,
                                     user_id: userId 
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
                
                  
    
                    const decreaseQuantity = async (productId, currentQuantity) => {
                      try {
                        await axios.post(
                          `${BASE_URL_AND_PORT}/cart/decreasemethods`,
                          {
                            quantity: 1,
                            productid: productId,
                            user_id: userId,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              'API-KEY': API_KEY,
                            },
                          }
                        );
                    
                        if (currentQuantity === 1) {
                          // Remove the item from UI immediately
                          setCartItems(prevItems =>
                            prevItems.filter(item => item.productid !== productId)
                          );
                        } else {
                          // Just decrease and re-fetch
                          fetchCartItems();
                        }
                      } catch (error) {
                        console.error('Error decreasing quantity:', error);
                      }
                    };
                    
  
                    const removeFromCart = async (productId) => {
                      try {
                        const response = await axios.post(
                          `${BASE_URL_AND_PORT}/cart/removefromcart`,
                          {
                            productid: productId,
                            user_id: userId,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              'API-KEY': API_KEY,
                              'Content-Type': 'application/json',
                            },
                          }
                        );
                    
                        if (response.data) {
                          alert("✅ Product removed from cart successfully!");
                    
                          // ✅ Remove the item from local state instead of full reload
                          setCartItems(prevItems => prevItems.filter(item => item.productid !== productId));
                        }
                      } catch (error) {
                        console.error("❌ Error removing item from cart:", error);
                        alert("Failed to remove item from cart.");
                      }
                    };
                    
                  
                    const placeOrder = async () => {
                        try {
                            if (!cartItems.length) {
                                alert("Your cart is empty.");
                                return;
                            }
                    
                            const defaultAddr = userAddresses.find(address => address.is_default);
                            if (!defaultAddr) {
                                alert("Please set a default delivery address before placing an order.");
                                return;
                            }
                    
                            const deliveryAddress = `House Building: ${defaultAddr.house_building}, Locality/Street: ${defaultAddr.locality_street}, City: ${defaultAddr.city}, Landmark: ${defaultAddr.landmark}, PO/PS: ${defaultAddr.po_ps}, State: ${defaultAddr.state}, Country: ${defaultAddr.country}, Pin: ${defaultAddr.pin}`;
                    
                            // Prepare product info
                            const products = cartItems.map(item => ({
                                productid: item.productid,
                                quantity: item.quantity
                            }));
                    
                            const pricedProducts = cartItems.map(item => {
                                const product = productDetails[item.productid];
                                return {
                                    productid: item.productid,
                                    quantity: item.quantity,
                                    price: product.price
                                };
                            });
                    
                            const totalAmount = pricedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    
                            const orderPayload = {
                                user_id: userId,
                                paymentoption: globalPaymentOption,
                                orderstatus: "null",
                                deliveryaddress: deliveryAddress,
                                products: pricedProducts
                            };
                    
                            // 🔁 Handle Cash Payment (No Razorpay)
                            if (globalPaymentOption === "Cash") {
                                const response = await axios.post(`${BASE_URL_AND_PORT}/order/addorder`, orderPayload, {
                                    headers: { 'API-KEY': API_KEY },
                                });
                    
                                if (response.data) {
                                    alert("✅ Order placed successfully via Cash!");
                                    navigate("/order");
                                } else {
                                    alert("❌ Failed to place Cash order.");
                                }
                    
                                return;
                            }
                    
                            // 🔁 UPI or Card – Use Razorpay
                            const createPaymentRes = await axios.post(
                                `${BASE_URL_AND_PORT}/payments/createpayment`,
                                {
                                    user_id: userId,
                                    products: products // productid and quantity only
                                },
                                { headers: { 'API-KEY': API_KEY } }
                            );
                    
                            const razorpayOrderId = createPaymentRes.data.order_id;
                    
                            if (!razorpayOrderId) {
                                alert("❌ Failed to create Razorpay order.");
                                return;
                            }
                    
                            // ✅ Call Razorpay handler with full data
                            const script = document.createElement('script');
                            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                            script.async = true;
                            script.onload = () => {
                                handlePayment(razorpayOrderId, totalAmount, pricedProducts, orderPayload);
                            };
                            document.body.appendChild(script);
                    
                        } catch (error) {
                            console.error("❌ Error placing orders:", error);
                            alert("❌ Something went wrong while placing the order.");
                        }
                    };
                    // const handlePayment = async (orderId, totalAmount, pricedProducts, orderPayload) => {
                    //     const options = {
                    //         key: 'rzp_live_kaJZ4jkMErixqW',
                    //         amount: totalAmount * 100,
                    //         currency: 'INR',
                    //         name: 'Transmogrify Global Pvt Ltd',
                    //         description: 'Order Payment',
                    //         order_id: orderId,
                    //         handler: async function (response) {
                    //             try {
                    //                 const verifyResponse = await axios.post(
                    //                     `${BASE_URL_AND_PORT}/payments/verifypayment`,
                    //                     {
                    //                         razorpaypaymentid: response.razorpay_payment_id,
                    //                         user_id: userId,
                    //                         products: pricedProducts // Must include price here
                    //                     },
                    //                     {
                    //                         headers: { 'API-KEY': API_KEY },
                    //                     }
                    //                 );
                    
                    //                 if (verifyResponse.data) {
                    //                     // Order gets placed after successful verification
                    //                     const orderRes = await axios.post(
                    //                         `${BASE_URL_AND_PORT}/order/addorder`,
                    //                         orderPayload,
                    //                         {
                    //                             headers: { 'API-KEY': API_KEY },
                    //                         }
                    //                     );
                    
                    //                     if (orderRes.data) {
                    //                         alert("✅ Payment successful and order placed!");
                    //                         navigate("/order");
                    //                     } else {
                    //                         alert("❌ Order failed after payment.");
                    //                     }
                    //                 } else {
                    //                     alert("❌ Payment verification failed.");
                    //                 }
                    //             } catch (err) {
                    //                 console.error("❌ Error during payment verification:", err);
                    //                 alert("❌ Error placing order after payment.");
                    //             }
                    //         },
                    //         prefill: {
                    //             name: "Customer",
                    //             email: "customer@example.com",
                    //             contact: "9999999999",
                    //         },
                    //         theme: {
                    //             color: "#F37254",
                    //         },
                    //     };
                    
                    //     const rzp = new window.Razorpay(options);
                    //     rzp.open();
                    // };
                            const handlePayment = async (orderId, totalAmount, pricedProducts, orderPayload) => {
  const options = {
    key: 'rzp_live_kaJZ4jkMErixqW',
    amount: totalAmount * 100,
    currency: 'INR',
    name: 'Transmogrify Global Pvt Ltd',
    description: 'Order Payment',
    order_id: orderId,

    handler: async function (response) {
      try {
        const verifyResponse = await axios.post(
          `${BASE_URL_AND_PORT}/payments/verifypayment`,
          {
            razorpaypaymentid: response.razorpay_payment_id,
            user_id: userId,
            products: pricedProducts,
          },
          { headers: { 'API-KEY': API_KEY } }
        );

        if (verifyResponse.data) {
          const orderRes = await axios.post(
            `${BASE_URL_AND_PORT}/order/addorder`,
            orderPayload,
            { headers: { 'API-KEY': API_KEY } }
          );

          if (orderRes.data) {
            alert("✅ Payment successful and order placed!");
            navigate("/order");
          }
        }
      } catch (err) {
        alert("❌ Payment verification failed");
      }
    },

    prefill: {
      name: userProfile.name,
      email: userProfile.email,
      contact: userProfile.phone,
    },

    theme: {
      color: "#F37254",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
            
                    
    return (
        <div
            className="min-h-screen bg-gradient-to-r from-white-100 via-white-100 to-white-100 bg-cover bg-center bg-fixed"
            
        >
            <UserNavbar onToggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                {/* <div className="container mx-auto p-4 pt-6 mt-10 bg-[#f0f0f0] ml-55"> */}
                <div className="w-full px-4 py-6 mt-10 bg-orange sm:max-w-7xl mx-auto">
          
                   <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-green-600 text-center sm:text-left lg:text-center">
  Your Cart
</h2>
 
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                          

                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                    {cartItems.length > 0 && (
                                        <thead className="bg-white border-b">
                                            <tr>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product</th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Quantity</th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price</th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
                                            </tr>
                                        </thead>
 )}
                                       <tbody>
  {cartItems.length > 0 ? (
    cartItems.map((item) => (
      <tr key={item.productid} className="bg-white border-b">
        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {productDetails[item.productid] && (
            <div className="flex items-center space-x-4">
              <img
                src={productDetails[item.productid].image_paths[imageIndex[item.productid] || 0]}
                alt={productDetails[item.productid].name}
                className="w-20 h-20 object-cover rounded"
              />
              <span>{productDetails[item.productid].name}</span>
             
            </div>
          )}
        </td> */}
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
  {productDetails[item.productid] && (
    <div className="flex flex-col items-center space-y-2">
      <img
        src={productDetails[item.productid].image_paths[imageIndex[item.productid] || 0]}
        alt={productDetails[item.productid].name}
        className="w-20 h-20 object-cover rounded"
      />
      <span className="text-center">{productDetails[item.productid].name}</span>
    </div>
  )}
</td>

        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="flex items-center">
          
           <button
  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded"
  onClick={() => decreaseQuantity(item.productid, item.quantity)}
>
  -
</button>


            <span className="px-4">{item.quantity}</span>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded"
              onClick={() => increaseQuantity(item.productid)}
            >
              +
            </button>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          ₹{item.price}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => removeFromCart(item.productid)}
          >
            Remove Cart
            <ShoppingCartIcon className="h-5 w-5 ml-2" />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">
        No items in your cart.
      </td>
    </tr>
  )}
</tbody>

                                    </table>
                                    <div className="mt-6 text-center bg-white p-4 rounded shadow-lg">
           
            {cartItems.length > 0 && (
    <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded shadow"
        onClick={() => setIsModalOpen(true)}
    >
         Place Order
    </button>
)}

        </div>
      
   



        {isModalOpen && (
  <div
  className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-40"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>

 <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      {/* <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
      
      <select
        className="w-full border px-4 py-2 rounded mb-4"
        value={globalPaymentOption}
        onChange={(e) => setGlobalPaymentOption(e.target.value)}
      >
        <option value="Cash">POD (Pay On Delivery)</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>

      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>

     
        {globalPaymentOption === "Cash" ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setIsModalOpen(false);
              placeOrder(); 
            }}
          >
            Confirm Order
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setIsModalOpen(false);
              placeOrder(); 
            }}
          >
            Confirm & Pay
          </button>
        )} */}
        <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
  
 
 <select
    className="w-full border px-4 py-2 rounded mb-4"
    value={globalPaymentOption}
    onChange={(e) => setGlobalPaymentOption(e.target.value)}
  >
    <option value="">Select Payment Option</option>
    <option value="UPI">UPI</option>
    <option value="Card">Card</option>
  </select>
  <div className="flex justify-end gap-4">
    <button
      className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
      onClick={() => setIsModalOpen(false)}
    >
      Cancel
    </button>

    {/* Show Confirm button with label based on payment option */}
    {globalPaymentOption === "UPI" || globalPaymentOption === "Card" ? (
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setIsModalOpen(false);
          placeOrder(); // Razorpay for UPI / Card
        }}
      >
        Confirm & Pay
      </button>
    ) : null}
  </div>
</div>
      </div>
  //   </div>
  // </div>
)}



                                    <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-96 ml-auto mb-150">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold text-xl text-gray-800">Delivery Address</h3>
    <button
      onClick={() => navigate('/profile')}
      className="text-sm text-blue-600 hover:text-blue-800 underline "
    >
      Change
    </button>
  </div>

  {defaultAddress ? (
    <div className="space-y-1 text-sm text-gray-700">
      <p><strong>House Building:</strong> {defaultAddress.house_building}</p>
      <p><strong>Locality/Street:</strong> {defaultAddress.locality_street}</p>
      <p><strong>Land Mark:</strong> {defaultAddress.landmark}</p>
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