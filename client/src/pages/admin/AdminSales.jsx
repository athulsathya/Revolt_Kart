import React from "react";

function AdminSales() {
  const stats = [
    { title: "Total Revenue", value: "₹1,25,000", color: "text-green-600" },
    { title: "Total Orders", value: "1,240", color: "text-slate-900" },
    { title: "Pending Orders", value: "32", color: "text-yellow-600" },
    { title: "Delivered Orders", value: "1,150", color: "text-blue-600" },
  ];

  const recentOrders = [
    {
      id: "ORD1023",
      customer: "John Doe",
      amount: "₹1,499",
      status: "Paid",
    },
    {
      id: "ORD1024",
      customer: "Sarah Khan",
      amount: "₹2,999",
      status: "Pending",
    },
    {
      id: "ORD1025",
      customer: "Aman Verma",
      amount: "₹799",
      status: "Paid",
    },
    {
      id: "ORD1026",
      customer: "Neha Sharma",
      amount: "₹1,299",
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Sales Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Overview of revenue, orders and performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <p className="text-slate-500 text-sm">{item.title}</p>
            <h2 className={`text-2xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Revenue Overview
        </h2>

        <div className="h-64 flex items-center justify-center text-slate-400 border-2 border-dashed rounded-xl">
          📊 Chart Area (You can add Recharts / Chart.js here)
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Orders
          </h2>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 font-semibold">{order.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSales;