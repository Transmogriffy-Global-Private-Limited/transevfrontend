
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import signupImage from "../../assets/holiday.jpg";

// const BASE_URL = "https://api.static.ev.transev.site";
// const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

// const SignupPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [alertType, setAlertType] = useState("success");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlertMessage(null);

//     const requestBody = {
//       name,
//       email,
//       password,
//       phone_number: phoneNumber || null,
//     };

//     try {
//       // 1️⃣ Signup API
//       const signupRes = await fetch(`${BASE_URL}/users/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "API-KEY": API_KEY,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const signupData = await signupRes.json();

//       if (signupRes.ok) {
//         const token = signupData.token; // ✅ token from signup response
//         localStorage.setItem("auth_token", token);

//         // 2️⃣ Profile API
//         const profileRes = await fetch(`${BASE_URL}/users/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "API-KEY": API_KEY,
//           },
//         });

//         const profileData = await profileRes.json();

//         if (profileRes.ok) {
//           // 3️⃣ Check email_verified
//           if (!profileData.user_data.email_verified) {
//             setAlertMessage("Signup successful! Please verify your email.");
//             setAlertType("success");
//             setTimeout(() => navigate("/verify-email"), 2000);
//           } else {
//             setAlertMessage("Signup successful! Redirecting to dashboard...");
//             setAlertType("success");
//             setTimeout(() => navigate("/dashboard"), 2000);
//           }
//         } else {
//           setAlertMessage(profileData.message || "Failed to fetch profile");
//           setAlertType("error");
//         }
//       } else {
//         setAlertMessage(signupData.message || "Signup failed");
//         setAlertType("error");
//       }
//     } catch (err) {
//       console.error(err);
//       setAlertMessage("Something went wrong. Please try again.");
//       setAlertType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left image */}
//       <div
//         className="relative w-full lg:w-1/2 bg-cover bg-center"
//         style={{ backgroundImage: `url(${signupImage})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//       </div>

//       {/* Right form */}
//       <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg relative z-10 mx-auto my-auto">
//         <h2 className="text-3xl font-bold text-center mb-6 p-4 bg-teal-500 text-white rounded-t-lg">
//           Create Your Account
//         </h2>

//         {alertMessage && (
//           <div
//             className={`text-center py-2 mb-4 ${
//               alertType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
//             }`}
//           >
//             {alertMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2">Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your name"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2">Phone Number (optional):</label>
//             <input
//               type="tel"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your phone number"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full sm:w-40 p-3 bg-teal-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin w-6 h-6 mx-auto"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
//               </svg>
//             ) : (
//               "Sign Up"
//             )}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <p className="text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../../assets/holiday.jpg";

const BASE_URL = "https://api.static.ev.transev.site";
const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage(null);

    const requestBody = {
      name,
      email,
      password,
      phone_number: phoneNumber || null,
    };

    try {
      // Signup API call
      const signupRes = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-KEY": API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (signupRes.ok) {
        const signupData = await signupRes.json();
        const token = signupData.token;
        localStorage.setItem("auth_token", token);

        // Profile API call
        const profileRes = await fetch(`${BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": API_KEY,
          },
        });

        const profileData = await profileRes.json();

        if (profileRes.ok) {
          if (!profileData.user_data.email_verified) {
            setAlertMessage("Signup successful! Please verify your email.");
            setAlertType("success");
            setTimeout(() => navigate("/verify-email"), 2000);
          } else {
            setAlertMessage("Signup successful! Redirecting to dashboard...");
            setAlertType("success");
            setTimeout(() => navigate("/dashboard"), 2000);
          }
        } else {
          setAlertMessage(profileData.detail || "Failed to fetch profile");
          setAlertType("error");
        }
      } else {
        // ❌ Signup failed: show only API detail
        let errorMessage = "Signup failed";
        try {
          const data = await signupRes.json();
          if (data && data.detail) {
            errorMessage = data.detail;
          }
        } catch (err) {
          // fallback if response is not JSON
          errorMessage = await signupRes.text();
        }
        setAlertMessage(errorMessage);
        setAlertType("error");
      }
    } catch (err) {
      console.error(err);
      setAlertMessage("Something went wrong. Please try again.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div
        className="relative w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${signupImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg relative z-10 mx-auto my-auto">
        <h2 className="text-3xl font-bold text-center mb-6 p-4 bg-teal-500 text-white rounded-t-lg">
          Create Your Account
        </h2>

        {alertMessage && (
          <div
            className={`text-center py-2 mb-4 ${
              alertType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Phone Number (optional):</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-40 p-3 bg-teal-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
          >
            {loading ? (
              <svg
                className="animate-spin w-6 h-6 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;