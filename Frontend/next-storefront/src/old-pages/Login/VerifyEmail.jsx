"use client";

import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import { useRouter as useNavigate, useSearchParams } from "next/navigation";
import { AuthContext } from "../../context/AuthContext"; // Adjust path if needed

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verifyToken } = useContext(AuthContext);
  
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState("Verifying your email, please wait...");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }

    const verify = async () => {
      try {
        const data = await verifyToken(token);
        setStatus("success");
        setMessage(data.message);
        // Redirect to login page after a delay
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Verification failed. The link may be expired.");
      }
    };

    verify();
  }, [token, verifyToken, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        {status === "verifying" && (
          <svg className="animate-spin h-10 w-10 text-gray-800 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {status === "success" && (
           <svg className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
         {status === "error" && (
           <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {status === 'success' ? 'Success!' : status === 'error' ? 'Oops!' : 'Verifying...'}
        </h2>
        <p className="text-gray-600">{message}</p>
        {(status === 'success' || status === 'error') && (
            <Link  href="/login" className="mt-6 inline-block bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 transition">
                Go to Login
            </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
