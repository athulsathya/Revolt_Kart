import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  addAddress,
  deleteAddress,
  setCart,
  setSelectedAddress,
} from "@/redux/productSlice";
import axios from "axios";
import { Currency } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddressForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const product = useSelector((store) => store.product);

  console.log(product);

  const cart = product.cart;

  const { addresses, selectedAddress } = useSelector((store) => store.product);

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      !formData.fullname ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.country
    ) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addAddress(formData));
    setShowForm(false);

    setFormData({
      fullname: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      zip: "",
      address: "",
    });

    setForm(false);
  };

  const subtotal = Number(cart?.totalPrice || 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/orders/create-order`,
        {
          products: cart?.items?.map((item) => ({
            productId: item.productId?._id,
            quantity: item.quantity,
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!data.success) {
        toast.error("Something went wrong");
        return;
      }

      console.log("Razorpay Data:", data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,

        name: "RevoltKart",
        description: "Order Payment",

        prefill: {
          name: selectedAddress?.fullname || formData.fullname,
          email: selectedAddress?.email || formData.email,
          contact: selectedAddress?.phone || formData.phone,
        },

        theme: {
          color: "#F472B6",
        },

        handler: async function (response) {
        console.log("Payment Response:", response);
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_URL}/api/orders/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful");

              dispatch(
                setCart({
                  items: [],
                  totalPrice: 0,
                }),
              );

              navigate("/order-success");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error verifying payment");
          }
        },

        modal: {
          ondismiss: async function () {
            try {
              await axios.post(
                `${import.meta.env.VITE_URL}/api/orders/verify-payment`,
                {
                  razorpay_order_id: data.order.id,
                  paymentFailed: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                },
              );

              toast.error("Payment cancelled");
            } catch (error) {
              console.error(error);
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function (response) {
        console.log("FULL PAYMENT ERROR:", response);
        console.log("ERROR OBJECT:", response.error);
        try {
          await axios.post(
            `${import.meta.env.VITE_URL}/api/orders/verify-payment`,
            {
              razorpay_order_id: data.order.id,
              paymentFailed: true,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          toast.error("Payment Failed. Please try again.");
        } catch (error) {
          console.error(error);
        }
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Address Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {showForm ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                      className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                      className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter City"
                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter State"
                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="Enter Zip Code"
                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter Country"
                        className="w-full mt-2 h-11 rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSave}
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                  >
                    Save & Continue
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>

                <div className="space-y-4">
                  {addresses.map((addr, index) => (
                    <div
                      key={index}
                      onClick={() => dispatch(setSelectedAddress(index))}
                      className={`relative border rounded-xl p-5 cursor-pointer transition-all ${
                        selectedAddress === index
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <h3 className="font-semibold text-lg">{addr.fullname}</h3>

                      <p className="text-gray-600">{addr.phone}</p>

                      <p className="text-gray-600">{addr.email}</p>

                      <p className="mt-2 text-gray-700">
                        {addr.address}, {addr.city}, {addr.state}, {addr.zip},{" "}
                        {addr.country}
                      </p>

                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-4 right-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteAddress(index));
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setShowForm(true)}>
                    + Add New Address
                  </Button>

                  <Button
                    onClick={handlePayment}
                    disabled={selectedAddress === null}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/*rightside Order Summary */}
        <div>
          <Card className="sticky top-6 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal?.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping?.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax?.toLocaleString("en-IN")}</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total?.toLocaleString("en-IN")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
