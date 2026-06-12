import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { clearCart } from "@/redux/productSlice";
import { persistor } from "@/redux/store";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);

  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin";

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
          <Link to="/" className="flex items-center gap-3">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-black font-medium"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-gray-600 hover:text-black font-medium"
            >
              Products
            </Link>

            {user && (
              <Link
                to={`/profile/${user._id}`}
                className="text-gray-600 hover:text-black font-medium"
              >
                Hi, <span className="font-semibold">{user.firstname}</span>
              </Link>
            )}

            {admin && (
              <Link
                to="/dashboard/sales"
                className="text-gray-600 hover:text-black font-medium"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">

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

            {/* Desktop Auth */}
            <div className="hidden md:block">
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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4 border-t bg-white">

            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>

            {user && (
              <Link
                to={`/profile/${user._id}`}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            )}

            {admin && (
              <Link
                to="/dashboard/sales"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {/* Mobile Auth */}
            {user ? (
              <Button
                onClick={() => {
                  logoutHandle();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white w-full"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className="bg-black text-white w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}

      </div>
    </header>
  );
}

export default Navbar;