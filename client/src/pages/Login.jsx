import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
     

      if (res.data.success) {
        navigate("/");
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        console.log("Stored Token:", localStorage.getItem("accessToken"));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
  <Card className="w-full max-w-5xl overflow-hidden border-0 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-3xl">
    <div className="grid lg:grid-cols-2">

      {/* Left Section */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-12 flex-col justify-between">

        <div>
          <span className="inline-flex px-4 py-2 rounded-full bg-white/10 text-sm font-medium">
            Welcome Back 👋
          </span>

          <h2 className="mt-8 text-5xl font-bold leading-tight">
            Continue Your
            <br />
            Shopping
            <br />
            Journey
          </h2>

          <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
            Access your account, track orders, manage your profile, and discover exclusive offers.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-slate-300">
              Secure Login Experience
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-slate-300">
              Fast Checkout Access
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
            <span className="text-slate-300">
              Track Orders Easily
            </span>
          </div>
        </div>

        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"></div>
      </div>

      {/* Right Section */}
      <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">

        <CardHeader className="px-0 pb-8">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-slate-900">
            Login
          </CardTitle>

          <CardDescription className="mt-2 text-base">
            Sign in to your account and continue shopping.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <form className="space-y-5" onSubmit={submitHandler}>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email Address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-12 rounded-xl"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-2 block">
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 rounded-xl pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl text-base font-semibold bg-slate-900 hover:bg-slate-800"
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="px-0 flex-col gap-4">

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-500">
                Or Continue With
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl"
          >
            Continue with Google
          </Button>

          <p className="text-sm text-slate-500 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-slate-900 hover:text-blue-600 transition"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>

      </div>
    </div>
  </Card>
</div>
  );
}

export default Login;
