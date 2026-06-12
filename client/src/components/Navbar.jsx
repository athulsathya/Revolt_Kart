import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { setCart } from "@/redux/productSlice";
 import { clearCart } from "@/redux/productSlice";
 import { persistor } from "@/redux/store";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin" ? true : false;

 

const logoutHandle = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/api/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) {
      localStorage.removeItem("accessToken");

      dispatch(clearUser());
      dispatch(clearCart());

      // Clear persisted redux data
      await persistor.purge();

      toast.success(res.data.message);
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Logout failed");
  }
};
 

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logoRevolt.jpg"
              alt="Revolt Logo"
              className="h-10 w-10 rounded-full object-cover border border-gray-200"
            />

            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Revolt
              </h1>

              <p className="text-[10px] text-gray-500 -mt-1">Marketplace</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-black font-medium transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-gray-600 hover:text-black font-medium transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black hover:after:w-full after:transition-all"
            >
              Products
            </Link>

            {user && (
              <Link
                to={`/profile/${user._id}`}
                className="text-gray-600 hover:text-black font-medium transition"
              >
                Hi, <span className="font-semibold">{user.firstname}</span>
              </Link>
            )}

            {admin && (
              <Link
                to={`/dashboard/sales`}
                className="text-gray-600 hover:text-black font-medium transition"
              >
                DashBoard
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ShoppingCart size={22} className="text-gray-700" />

              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cart?.items?.length || 0}
              </span>
            </Link>

            {/* Auth */}
            {user ? (
              <Button
                onClick={logoutHandle}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-5"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-xl px-5">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
