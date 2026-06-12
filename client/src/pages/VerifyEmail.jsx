import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, MailCheck, AlertCircle } from "lucide-react";

function VerifyEmail() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [status, setStatus] = useState("Verifying your email...");

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStatus("Email verified successfully");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setStatus("Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200 p-8 sm:p-10 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {status === "Email verified successfully" ? (
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          ) : status === "Verification failed. Please try again." ? (
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
              <MailCheck className="h-10 w-10 text-blue-600" />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Email Verification
        </h1>

        {/* Status */}
        <p
          className={`text-base leading-relaxed ${
            status === "Email verified successfully"
              ? "text-green-600"
              : status === "Verification failed. Please try again."
              ? "text-red-600"
              : "text-slate-600"
          }`}
        >
          {status}
        </p>

        {/* Success Message */}
        {status === "Email verified successfully" && (
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Redirecting to login...
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {status === "Verifying your email..." && (
          <div className="mt-6 flex justify-center">
            <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error Button */}
        {status === "Verification failed. Please try again." && (
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;