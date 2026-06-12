import React from "react";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-10 text-center border border-green-100">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-5 rounded-full animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-bold text-gray-900">
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          Thank you for your purchase. Your order has been placed successfully
          and is being processed. You'll receive updates about your shipment
          shortly.
        </p>

        {/* Order Info */}
        <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-4">
          <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
            <Package size={18} />
            Order Confirmed
          </div>
          <p className="text-sm text-green-600 mt-1">
            Estimated delivery details will be available in your orders section.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/products")}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/order")}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-green-500 hover:text-green-600 font-semibold py-3 rounded-xl transition-all duration-300"
          >
            <Package size={18} />
            View Orders
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-400">
          Thank you for shopping with us ❤️
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;