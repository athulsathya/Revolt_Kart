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

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
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
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // API call goes here
      // const response = await axios.post("/api/auth/register", formData);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Full Error:", error);

      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-6xl overflow-hidden border-0 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-3xl">
        <div className="grid lg:grid-cols-2 min-h-[700px]">
          {/* Left Side */}
          <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-12 flex-col justify-between">
            <div>
              <span className="inline-flex px-4 py-2 rounded-full bg-white/10 text-sm font-medium">
                Welcome 👋
              </span>

              <h1 className="mt-8 text-5xl font-bold leading-tight">
                Build Your
                <br />
                Shopping
                <br />
                Experience
              </h1>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
                Join thousands of customers discovering premium products,
                exclusive offers, and seamless shopping experiences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <p className="text-slate-300">Trusted by 10,000+ customers</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <p className="text-slate-300">Secure & Fast Checkout</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <p className="text-slate-300">Premium Customer Support</p>
              </div>
            </div>

            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />
          </div>

          {/* Right Side */}
          <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
            <CardHeader className="px-0 pb-8">
              <CardTitle className="text-3xl sm:text-4xl font-bold text-slate-900">
                Create Account
              </CardTitle>

              <CardDescription className="text-base mt-2">
                Start your journey with us today.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={submitHandler} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstname" className="mb-2 block">
                      First Name
                    </Label>

                    <Input
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="John"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastname" className="mb-2 block">
                      Last Name
                    </Label>

                    <Input
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
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
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                      className="h-12 rounded-xl pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl text-base font-semibold"
                >
                  {loading ? "Creating Account..." : "Create Account"}
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

              <Button variant="outline" className="w-full h-12 rounded-xl">
                Continue with Google
              </Button>

              <p className="text-sm text-slate-500 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-slate-900 hover:text-blue-600 transition"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Signup;
