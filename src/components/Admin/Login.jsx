// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import loginImage from "../../assets/new3.jpg";

// const BASE_URL = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [otpData, setOtpData] = useState({ otp_code: "" });
//   const [error, setError] = useState(null);
//   const [showOtpForm, setShowOtpForm] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [authToken, setAuthToken] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   const navigate = useNavigate();

//   const decodeAndStoreUser = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       if (decoded?.user_id) {
//         localStorage.setItem("user_id", decoded.user_id);
//         console.log("Decoded user ID:", decoded.user_id);
//       } else {
//         console.warn("User ID not found in token.");
//       }
//     } catch (err) {
//       console.error("Error decoding token:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "otp_code") {
//       setOtpData({ ...otpData, [name]: value });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${BASE_URL}/admin/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "API-Key": API_KEY,
//         },
//         body: JSON.stringify(formData),
//       });

//       const authorizationHeader = response.headers.get("Authorization");

//       if (authorizationHeader?.startsWith("Bearer ")) {
//         const token = authorizationHeader.substring(7);
//         localStorage.setItem("auth_token", token);
//         setAuthToken(token);
//         decodeAndStoreUser(token);
//       }

//       if (response.status === 308) {
//         setUserEmail(formData.email);
//         setShowOtpForm(true);
//       } else if (response.ok) {
//         setShowSuccessPopup(true);
//         setTimeout(() => navigate("/admin/dashboard"), 1500);
//       } else {
//         const data = await response.json();
//         setError(data.message || "Login failed.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred during login.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem("auth_token");

//       const response = await fetch(`${BASE_URL}/admin/2fa/verify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "API-Key": API_KEY,
//         },
//         body: JSON.stringify({
//           email: userEmail,
//           otp_code: otpData.otp_code,
//         }),
//       });

//       const authorizationHeader = response.headers.get("Authorization");

//       if (authorizationHeader?.startsWith("Bearer ")) {
//         const newToken = authorizationHeader.substring(7);
//         localStorage.setItem("auth_token", newToken);
//         setAuthToken(newToken);
//         decodeAndStoreUser(newToken);
//       }

//       if (response.ok) {
//         setShowSuccessPopup(true);
//         setTimeout(() => navigate("/admin/dashboard"), 1500);
//       } else {
//         const data = await response.json();
//         setError(data.message || "OTP verification failed.");
//       }
//     } catch (err) {
//       console.error("OTP error:", err);
//       setError("An error occurred during OTP verification.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${loginImage})` }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
//         <div className="bg-teal-600 text-white py-4 mb-6 rounded-t-lg">
//           <h2 className="text-3xl font-bold text-center">Login</h2>
//           {showSuccessPopup && (
        
//           <div className="bg-white p-2 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold text-green-600">Login Successful!</h2>
          
//           </div>
       
//       )}
//         </div>

//         {!showOtpForm ? (
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full p-3 border border-gray-300 rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full p-3 border border-gray-300 rounded"
//                 required
//               />
//             </div>
//             {error && <div className="text-red-500 mb-4">{error}</div>}
//             <button
//               type="submit"
//               className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full flex items-center justify-center"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//               ) : (
//                 "Login"
//               )}
//             </button>
//             <div className="text-center mt-4">
//               {/* <p>
//                 Don’t have an account?{" "}
//                 <Link to="/admin/signup" className="text-teal-600">
//                   Sign Up
//                 </Link>
//               </p> */}
//               <p className="mt-2">
//                 <Link to="/admin/forgot-password" className="text-teal-600">
//                   Forgot Password?
//                 </Link>
//               </p>
//             </div>
//           </form>
//         ) : (
//           <form onSubmit={handleOtpSubmit}>
//             <h3 className="text-xl font-semibold mb-4 text-center">Enter OTP</h3>
//             <div className="mb-4">
//               <label className="block text-gray-700">OTP</label>
//               <input
//                 type="text"
//                 name="otp_code"
//                 value={otpData.otp_code}
//                 onChange={handleChange}
//                 placeholder="Enter 6-digit OTP"
//                 className="w-full p-3 border border-gray-300 rounded"
//                 maxLength={6}
//                 required
//               />
//             </div>
//             {error && <div className="text-red-500 mb-4">{error}</div>}
//             <button
//               type="submit"
//               className="bg-teal-600 text-white py-3 px-5 rounded-md hover:bg-teal-700 w-full flex items-center justify-center"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//               ) : (
//                 "Verify OTP"
//               )}
//             </button>
//           </form>
//         )}
//       </div>

    
     
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { 
//   FaEnvelope, 
//   FaLock, 
//   FaEye, 
//   FaEyeSlash,
//   FaArrowRight,
//   FaGoogle,
//   FaGithub,
//   FaFacebook,
//   FaShieldAlt,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaSpinner,
//   FaKey,
//   FaUserShield
// } from "react-icons/fa";
// import loginImage from "../../assets/new3.jpg";

// const BASE_URL = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [otpData, setOtpData] = useState({ otp_code: "" });
//   const [error, setError] = useState(null);
//   const [showOtpForm, setShowOtpForm] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [authToken, setAuthToken] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const navigate = useNavigate();

//   const decodeAndStoreUser = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       if (decoded?.user_id) {
//         localStorage.setItem("user_id", decoded.user_id);
//         console.log("Decoded user ID:", decoded.user_id);
//       } else {
//         console.warn("User ID not found in token.");
//       }
//     } catch (err) {
//       console.error("Error decoding token:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "otp_code") {
//       setOtpData({ ...otpData, [name]: value });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${BASE_URL}/admin/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "API-Key": API_KEY,
//         },
//         body: JSON.stringify(formData),
//       });

//       const authorizationHeader = response.headers.get("Authorization");

//       if (authorizationHeader?.startsWith("Bearer ")) {
//         const token = authorizationHeader.substring(7);
//         localStorage.setItem("auth_token", token);
//         setAuthToken(token);
//         decodeAndStoreUser(token);
//       }

//       if (response.status === 308) {
//         setUserEmail(formData.email);
//         setShowOtpForm(true);
//       } else if (response.ok) {
//         setShowSuccessPopup(true);
//         setTimeout(() => navigate("/admin/dashboard"), 1500);
//       } else {
//         const data = await response.json();
//         setError(data.message || "Login failed.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred during login.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem("auth_token");

//       const response = await fetch(`${BASE_URL}/admin/2fa/verify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "API-Key": API_KEY,
//         },
//         body: JSON.stringify({
//           email: userEmail,
//           otp_code: otpData.otp_code,
//         }),
//       });

//       const authorizationHeader = response.headers.get("Authorization");

//       if (authorizationHeader?.startsWith("Bearer ")) {
//         const newToken = authorizationHeader.substring(7);
//         localStorage.setItem("auth_token", newToken);
//         setAuthToken(newToken);
//         decodeAndStoreUser(newToken);
//       }

//       if (response.ok) {
//         setShowSuccessPopup(true);
//         setTimeout(() => navigate("/admin/dashboard"), 1500);
//       } else {
//         const data = await response.json();
//         setError(data.message || "OTP verification failed.");
//       }
//     } catch (err) {
//       console.error("OTP error:", err);
//       setError("An error occurred during OTP verification.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
//       {/* Decorative Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Main Container */}
//       <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
//         {/* Left Side - Image Section */}
//         <div className="relative lg:w-1/2 hidden lg:block">
//           <div 
//             className="absolute inset-0 bg-cover bg-center"
//             style={{ backgroundImage: `url(${loginImage})` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-pink-900/80"></div>
//           </div>
//           <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white">
//             <div>
//               <div className="flex items-center gap-2 mb-8">
//                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                   <FaUserShield className="text-white text-xl" />
//                 </div>
//                 <span className="text-xl font-bold">Admin Portal</span>
//               </div>
//               <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
//               <p className="text-white/80 mb-6 leading-relaxed">
//                 Access your admin dashboard and manage your EV charging infrastructure with ease.
//               </p>
//               <div className="space-y-3">
//                 {[
//                   "Secure admin access",
//                   "Advanced analytics dashboard",
//                   "Real-time order management",
//                   "24/7 dedicated support"
//                 ].map((feature, idx) => (
//                   <div key={idx} className="flex items-center gap-2">
//                     <FaCheckCircle className="text-green-400" size={14} />
//                     <span className="text-sm">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="mt-8">
//               <div className="flex items-center gap-2 text-sm text-white/60">
//                 <FaShieldAlt size={12} />
//                 <span>Secure & Encrypted Connection</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Form Section */}
//         <div className="w-full lg:w-1/2 p-6 md:p-10">
//           <div className="max-w-md mx-auto">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg mb-4">
//                 <FaUserShield className="text-white text-2xl" />
//               </div>
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//               <p className="text-gray-500 text-sm">Sign in to your admin account</p>
//             </div>

//             {/* Success Popup */}
//             {showSuccessPopup && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-slideDown">
//                 <FaCheckCircle className="text-green-600" size={20} />
//                 <div>
//                   <p className="text-green-700 font-medium">Login Successful!</p>
//                   <p className="text-green-600 text-sm">Redirecting to dashboard...</p>
//                 </div>
//               </div>
//             )}

//             {!showOtpForm ? (
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="admin@example.com"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Enter your password"
//                       className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Remember Me & Forgot Password */}
//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                       className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
//                     />
//                     <span className="text-sm text-gray-600">Remember me</span>
//                   </label>
//                   <Link to="/admin/forgot-password" className="text-sm text-purple-600 hover:underline">
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
//                     <FaExclamationCircle className="text-red-500" size={16} />
//                     <span className="text-red-600 text-sm">{error}</span>
//                   </div>
//                 )}

//                 {/* Login Button */}
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <>
//                       <FaSpinner className="animate-spin" size={18} />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign In
//                       <FaArrowRight size={14} />
//                     </>
//                   )}
//                 </button>

//                 {/* Divider */}
//                 <div className="relative my-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-200"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-4 bg-white text-gray-500">Or continue with</span>
//                   </div>
//                 </div>

//                 {/* Social Login */}
//                 <div className="flex gap-3">
//                   <button className="flex-1 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-600">
//                     <FaGoogle size={18} className="text-red-500" />
//                     <span className="text-sm hidden sm:inline">Google</span>
//                   </button>
//                   <button className="flex-1 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-600">
//                     <FaGithub size={18} className="text-gray-800" />
//                     <span className="text-sm hidden sm:inline">GitHub</span>
//                   </button>
//                   <button className="flex-1 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-600">
//                     <FaFacebook size={18} className="text-blue-600" />
//                     <span className="text-sm hidden sm:inline">Facebook</span>
//                   </button>
//                 </div>

//                 {/* Sign Up Link */}
//                 <div className="text-center">
//                   <p className="text-sm text-gray-600">
//                     Don't have an account?{" "}
//                     <Link to="/admin/signup" className="text-purple-600 font-medium hover:underline">
//                       Create Account
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             ) : (
//               <form onSubmit={handleOtpSubmit} className="space-y-5">
//                 <div className="text-center mb-6">
//                   <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                     <FaKey className="text-white text-3xl" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800">Two-Factor Authentication</h3>
//                   <p className="text-gray-500 text-sm mt-2">
//                     Enter the verification code sent to your email
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Verification Code
//                   </label>
//                   <input
//                     type="text"
//                     name="otp_code"
//                     value={otpData.otp_code}
//                     onChange={handleChange}
//                     placeholder="Enter 6-digit OTP"
//                     className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     maxLength={6}
//                     required
//                   />
//                 </div>

//                 {error && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
//                     <FaExclamationCircle className="text-red-500" size={16} />
//                     <span className="text-red-600 text-sm">{error}</span>
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
//                 >
//                   {isLoading ? (
//                     <>
//                       <FaSpinner className="animate-spin" size={18} />
//                       Verifying...
//                     </>
//                   ) : (
//                     <>
//                       Verify & Sign In
//                       <FaArrowRight size={14} />
//                     </>
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowOtpForm(false);
//                     setError(null);
//                   }}
//                   className="w-full py-2.5 text-gray-600 hover:text-gray-800 transition-colors text-sm"
//                 >
//                   ← Back to login
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaKey,
  FaUserShield,
  FaArrowLeft
} from "react-icons/fa";
import loginImage from "../../assets/new3.jpg";

const BASE_URL = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otpData, setOtpData] = useState({ otp_code: "" });
  const [error, setError] = useState(null);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const decodeAndStoreUser = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded?.user_id) {
        localStorage.setItem("user_id", decoded.user_id);
        console.log("Decoded user ID:", decoded.user_id);
      } else {
        console.warn("User ID not found in token.");
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "otp_code") {
      setOtpData({ ...otpData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": API_KEY,
        },
        body: JSON.stringify(formData),
      });

      const authorizationHeader = response.headers.get("Authorization");

      if (authorizationHeader?.startsWith("Bearer ")) {
        const token = authorizationHeader.substring(7);
        localStorage.setItem("auth_token", token);
        setAuthToken(token);
        decodeAndStoreUser(token);
      }

      if (response.status === 308) {
        setUserEmail(formData.email);
        setShowOtpForm(true);
      } else if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        const data = await response.json();
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${BASE_URL}/admin/2fa/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "API-Key": API_KEY,
        },
        body: JSON.stringify({
          email: userEmail,
          otp_code: otpData.otp_code,
        }),
      });

      const authorizationHeader = response.headers.get("Authorization");

      if (authorizationHeader?.startsWith("Bearer ")) {
        const newToken = authorizationHeader.substring(7);
        localStorage.setItem("auth_token", newToken);
        setAuthToken(newToken);
        decodeAndStoreUser(newToken);
      }

      if (response.ok) {
        setShowSuccessPopup(true);
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        const data = await response.json();
        setError(data.message || "OTP verification failed.");
      }
    } catch (err) {
      console.error("OTP error:", err);
      setError("An error occurred during OTP verification.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
        
        {/* Card Header with Gradient */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-6 py-8 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4 shadow-lg">
              {!showOtpForm ? (
                <FaUserShield className="text-white text-3xl" />
              ) : (
                <FaKey className="text-white text-3xl" />
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {!showOtpForm ? "Welcome Back!" : "Two-Factor Authentication"}
            </h2>
            <p className="text-white/80 text-sm">
              {!showOtpForm 
                ? "Sign in to your admin account" 
                : "Enter the verification code sent to your email"}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8">
          {/* Success Popup */}
          {showSuccessPopup && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-slideDown">
              <FaCheckCircle className="text-green-600" size={20} />
              <div>
                <p className="text-green-700 font-medium">Login Successful!</p>
                <p className="text-green-600 text-sm">Redirecting to dashboard...</p>
              </div>
            </div>
          )}

          {!showOtpForm ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaEnvelope size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaLock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/admin/forgot-password" className="text-sm text-purple-600 hover:underline transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 animate-shake">
                  <FaExclamationCircle className="text-red-500" size={16} />
                  <span className="text-red-600 text-sm">{error}</span>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" size={18} />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight size={14} />
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/admin/signup" className="text-purple-600 font-medium hover:underline transition-colors">
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              {/* OTP Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  name="otp_code"
                  value={otpData.otp_code}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Didn't receive the code? Check your email or spam folder
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 animate-shake">
                  <FaExclamationCircle className="text-red-500" size={16} />
                  <span className="text-red-600 text-sm">{error}</span>
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" size={18} />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Sign In
                    <FaArrowRight size={14} />
                  </>
                )}
              </button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={() => {
                  setShowOtpForm(false);
                  setError(null);
                  setOtpData({ otp_code: "" });
                }}
                className="w-full py-2.5 text-gray-500 hover:text-purple-600 transition-colors text-sm flex items-center justify-center gap-1 group"
              >
                <FaArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Back to login
              </button>
            </form>
          )}
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-100">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <FaShieldAlt size={10} />
              <span>Secure</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-1">
              <FaCheckCircle size={10} />
              <span>Encrypted</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-1">
              <FaUserShield size={10} />
              <span>Protected</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;