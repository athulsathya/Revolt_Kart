import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShieldCheck, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { setCart } from "@/redux/productSlice";
import axios from "axios";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { cart } = useSelector((store) => store.product);
  const { user } = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const API = `${import.meta.env.VITE_URL}/api/cart`;
  const accessToken = localStorage.getItem("accessToken");

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product Removed Succesfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart?.items?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-3 space-y-4">
              {cart.items.map((item, index) => (
                <Card
                  key={index}
                  className="p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="w-40 h-40 flex-shrink-0 bg-white rounded-lg border">
                      <img
                        src={item?.productId?.productImg?.[0]?.url}
                        alt={item?.productId?.productName}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">
                        {item?.productId?.productName}
                      </h2>

                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {item?.productId?.productDesc}
                      </p>

                      <div className="mt-3">
                        <span className="text-2xl font-bold">
                          ₹{item?.productId?.productPrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId._id,
                              "decrement",
                            )
                          }
                        >
                          -
                        </Button>

                        <span className="font-semibold text-lg">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId._id,
                              "increment",
                            )
                          }
                        >
                          +
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
                        <Truck size={16} />
                        Free Delivery Available
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold">
                          ₹
                          {(item?.productId?.productPrice || 0) *
                            (item?.quantity || 0)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemove(item?.productId?._id)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 p-6 shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold mb-5">Price Details</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Price ({totalItems} items)</span>
                    <span>₹{cart?.totalPrice || 0}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span>₹0</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">- ₹0</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount</span>
                    <span>₹{cart?.totalPrice || 0}</span>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
                    You will save on delivery charges with this order.
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <ShieldCheck size={18} />
                      Secure payments protected by encryption
                    </div>
                  </div>

                  <Button onClick={()=>navigate('/address')} className="w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600">
                    Place Order
                  </Button>

                  <Link to="/products">
                    <Button variant="outline" className="w-full h-12 mt-3">
                      Continue Shopping
                    </Button>
                  </Link>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-lg mx-auto p-10 text-center">
            <h2 className="text-2xl font-bold">Your Cart is Empty</h2>

            <p className="text-gray-500 mt-3">
              Looks like you haven't added anything yet.
            </p>

            <Link to="/products">
              <Button className="mt-6">Continue Shopping</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Cart;
