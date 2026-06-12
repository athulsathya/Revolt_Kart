import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("accessToken");

  console.log("orders", orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/orders/all",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (data?.success) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.log("Failed to fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="p-6 text-slate-600 font-medium">
        Loading all orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border overflow-x-auto">

        <table className="w-full text-sm text-left">
          
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Products</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-slate-50 transition"
              >
                {/* ORDER ID */}
                <td className="p-4 font-medium text-slate-700">
                  {order._id}
                </td>

                {/* USER */}
                <td className="p-4">
                  <div className="font-medium text-slate-800">
                    {order.user?.name || "Unknown User"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {order.user?.email}
                  </div>
                </td>

                {/* PRODUCTS */}
                <td className="p-4">
                  <div className="space-y-1">
                    {order.products?.map((p, idx) => (
                      <div key={idx} className="text-slate-700">
                        {p?.productName || "Product"} × {p?.quantity || 1}
                      </div>
                    ))}
                  </div>
                </td>

                {/* AMOUNT */}
                <td className="p-4 font-semibold text-slate-800">
                  Rs{" "}
                  {order.amount
                    ? order.amount.toLocaleString("en-IN")
                    : "0"}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {order.status || "Unknown"}
                  </span>
                </td>

                {/* DATE */}
                <td className="p-4 text-slate-600 text-sm">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default AdminOrders;