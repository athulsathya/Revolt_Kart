import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/user/all-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-6 sm:py-8">
  
  {/* Main Container (controls all spacing properly) */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:ml-[320px]">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          User Management
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Manage customers, orders and account activities
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-4 w-full md:w-auto">
        <p className="text-sm text-slate-500">Total Users</p>

        <h2 className="text-3xl font-bold text-slate-900">
          {users?.length || 0}
        </h2>
      </div>
    </div>

    {/* Search */}
    <div className="relative max-w-xl mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users by name or email..."
        className="pl-12 h-12 rounded-2xl border-slate-200 bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-slate-300"
      />
    </div>

    {/* Users Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
      {filteredUsers.map((user) => (
        <div
          key={user?._id}
          className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          
          {/* Top Glow */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900"></div>

          {/* User Info */}
          <div className="flex gap-4">
            <img
              src={
                user?.profilePic ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLOxRW9wIvJfJHNtxsSBRGG7drOdLd5NwKKAbnii5FA&s=10"
              }
              alt="profile"
              className="h-16 w-16 rounded-2xl object-cover border-4 border-white shadow"
            />

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-lg text-slate-900 truncate">
                {user?.firstname} {user?.lastname}
              </h3>

              <p className="text-sm text-slate-500 truncate">
                {user?.email}
              </p>

              <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Active User
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-xs text-slate-500">Orders</p>
              <h4 className="text-xl font-bold text-slate-900">
                {user?.orders?.length || 0}
              </h4>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-xs text-slate-500">User ID</p>
              <h4 className="text-sm font-semibold text-slate-700">
                #{user?._id?.slice(-6)}
              </h4>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-5">
            <Button
              onClick={() => navigate(`/dashboard/users/${user?._id}`)}
              className="flex-1 h-10 rounded-xl bg-slate-900 hover:bg-slate-800"
            >
              Edit
            </Button>

            <Button
              onClick={() => navigate(`/dashboard/users/orders/${user?._id}`)}
              variant="outline"
              className="flex-1 h-10 rounded-xl border-slate-300 hover:bg-slate-50"
            >
              Orders
            </Button>
          </div>

        </div>
      ))}
    </div>

  </div>
</div>
  );
}
export default AdminUsers;
