
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const VerifyEmail = () => {
//   const navigate = useNavigate();
//   const BASE_URL = "https://api.static.ev.transev.site";
//   const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // 1️⃣ Check profile on load
//   useEffect(() => {
//     const checkProfile = async () => {
//       const token = localStorage.getItem("auth_token");

//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await fetch(`${BASE_URL}/users/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "API-KEY": API_KEY,
//           },
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           navigate("/login");
//           return;
//         }

//         setEmail(data.user_data.email);

//         // 🔒 Already verified → logout & login
//         if (data.user_data.email_verified) {
//           localStorage.removeItem("auth_token");
//           localStorage.removeItem("email_verified");
//           localStorage.removeItem("logged_in");
//           navigate("/login");
//         }
//       } catch {
//         navigate("/login");
//       }
//     };

//     checkProfile();
//   }, [navigate]);

//   // 2️⃣ Send OTP
//   const handleSendOtp = async () => {
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("auth_token");

//       const res = await fetch(`${BASE_URL}/users/otp/generate`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           "API-KEY": API_KEY,
//         },
//         body: JSON.stringify({
//           email,
//           purpose: "Mail Verification",
//         }),
//       });

//       if (res.ok) {
//         setMessage("OTP sent to your email");
//       } else {
//         setError("Failed to send OTP");
//       }
//     } catch {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3️⃣ Verify OTP
//   const handleVerifyOtp = async () => {
//     if (!otp) {
//       setError("Please enter OTP");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("auth_token");

//       const res = await fetch(`${BASE_URL}/users/otp/verify/email`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           "API-KEY": API_KEY,
//         },
//         body: JSON.stringify({
//           email,
//           otp_code: otp,
//           purpose: "Mail Verification",
//         }),
//       });

//       if (res.ok) {
//         // ✅ VERIFY SUCCESS → DELETE TOKEN → LOGIN
//         localStorage.removeItem("auth_token");
//         localStorage.removeItem("email_verified");
//         localStorage.removeItem("logged_in");

//         navigate("/login");
//       } else {
//         setError("Invalid OTP");
//       }
//     } catch {
//       setError("Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
//           Verify Your Email
//         </h2>

//         <p className="text-center text-gray-600 mb-6">
//           We sent an OTP to your email:{" "}
//           <span className="font-medium">{email}</span>
//         </p>

//         {message && (
//           <div className="bg-green-100 text-green-700 text-center py-2 rounded mb-3">
//             {message}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 text-red-700 text-center py-2 rounded mb-3">
//             {error}
//           </div>
//         )}

//         <button
//           onClick={handleSendOtp}
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-4 font-medium"
//         >
//           {loading ? "Sending OTP..." : "Send OTP"}
//         </button>

//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full border border-gray-300 rounded-lg p-3 mb-4"
//         />

//         <button
//           onClick={handleVerifyOtp}
//           disabled={loading}
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
//         >
//           {loading ? "Verifying..." : "Verify Email"}
//         </button>

//         <p className="text-center text-gray-500 mt-4 text-sm">
//           Didn't receive OTP? Click "Send OTP" again.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const BASE_URL = "https://api.static.ev.transev.site";
  const API_KEY = "mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf";

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 1️⃣ Check profile on load
  useEffect(() => {
    const checkProfile = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "API-KEY": API_KEY,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          navigate("/login");
          return;
        }

        setEmail(data.user_data.email);

        if (data.user_data.email_verified) {
          localStorage.removeItem("auth_token");
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    checkProfile();
  }, [navigate]);

  // 2️⃣ Send OTP
  const handleSendOtp = async () => {
    if (sendingOtp) return;

    setError("");
    setMessage("");
    setSendingOtp(true);

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`${BASE_URL}/users/otp/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "API-KEY": API_KEY,
        },
        body: JSON.stringify({
          email,
          purpose: "Mail Verification",
        }),
      });

      if (res.ok) {
        setMessage("OTP sent to your email");
      } else {
        setError("Failed to send OTP");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setSendingOtp(false);
    }
  };

  // 3️⃣ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    if (verifyingOtp) return;

    setError("");
    setVerifyingOtp(true);

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`${BASE_URL}/users/otp/verify/email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "API-KEY": API_KEY,
        },
        body: JSON.stringify({
          email,
          otp_code: otp,
          purpose: "Mail Verification",
        }),
      });

      if (res.ok) {
        localStorage.removeItem("auth_token");
        navigate("/login");
      } else {
        setError("Invalid OTP");
      }
    } catch {
      setError("Verification failed");
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-600 mb-6">
          We sent an OTP to your email:{" "}
          <span className="font-medium">{email}</span>
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 text-center py-2 rounded mb-3">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 text-center py-2 rounded mb-3">
            {error}
          </div>
        )}

        {/* ✅ Send OTP Button */}
        <button
          onClick={handleSendOtp}
          disabled={sendingOtp}
          className={`w-full py-2 rounded-lg mb-4 font-medium text-white
            ${sendingOtp ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {sendingOtp ? "Sending OTP..." : "Send OTP"}
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        {/* ✅ Verify Email Button */}
        <button
          onClick={handleVerifyOtp}
          disabled={verifyingOtp}
          className={`w-full py-2 rounded-lg font-medium text-white
            ${verifyingOtp ? "bg-green-400" : "bg-green-600 hover:bg-green-700"}`}
        >
          {verifyingOtp ? "Verifying..." : "Verify Email"}
        </button>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Didn't receive OTP? Click "Send OTP" again.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
