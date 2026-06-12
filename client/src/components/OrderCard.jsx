import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


function OrderCard({userOrder}) {
     const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => navigate(-1)}
              size="icon"
              className="rounded-full shadow-md hover:scale-105 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                View and track your order history
              </p>
            </div>
          </div>

          {userOrder.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border p-10 text-center">
              <p className="text-lg text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {userOrder?.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Top Section */}
                  <div className="p-6 border-b bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="font-semibold text-lg text-gray-900">
                          Order ID
                        </h2>
                        <p className="text-sm text-gray-500 break-all">
                          {order._id}
                        </p>
                      </div>

                      <span
                        className={`w-fit px-4 py-1.5 rounded-full text-sm font-semibold ${
                          order.status?.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.status?.toLowerCase() === "failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Amount</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                          ₹{order.amount}
                        </h3>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Customer</p>
                        <h3 className="font-semibold text-gray-900 mt-1">
                          {order.user?.firstname || "Unknown"}{" "}
                          {order.user?.lastname}
                        </h3>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">Email</p>
                        <h3 className="font-medium text-gray-900 mt-1 break-all">
                          {order.user?.email || "N/A"}
                        </h3>
                      </div>
                    </div>

                    {/* Products */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Products
                      </h3>

                      <ul className="space-y-4">
                        {order.products.map((product, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                          >
                            <img
                              src={product.productId?.productImg?.[0]?.url}
                              alt={product.productId?.productName}
                              className="w-20 h-20 rounded-xl object-cover border"
                            />

                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {product.productId?.productName}
                              </h4>

                              <p className="text-sm text-gray-500 mt-1">
                                Quantity: {product.quantity}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
