import React from "react";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";

function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-10 text-center">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <Mail className="text-white h-10 w-10 sm:h-12 sm:w-12" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl sm:text-4xl font-bold text-slate-900">
          Check Your Email
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          We've sent a verification link to your email address. Please
          check your inbox and click the link to activate your account and
          continue using our platform.
        </p>

        {/* Info Box */}
        <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Didn't receive the email?
          </p>

          <button className="mt-3 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition">
            <RefreshCw size={16} />
            Resend Verification Email
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition duration-300">
            Open Email App
          </button>

          <a
            href="/login"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 transition duration-300"
          >
            Back to Login
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-slate-400">
          If the email doesn't appear within a few minutes, check your spam
          or promotions folder.
        </p>
      </div>
    </div>
  );
}

export default Verify;