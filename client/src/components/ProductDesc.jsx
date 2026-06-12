import React from "react";
import { Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";


function ProductDesc({ product }) {
    const accessToken=localStorage.getItem('accessToken')
    const dispatch = useDispatch();
     const addToCart=async(productId)=>{
try {
  const res=await axios.post(`${import.meta.env.VITE_URL}/api/cart/add`,{productId},{
    headers:{
      Authorization:`Bearer ${accessToken}`
    }
  })
  if(res.data.success){
    toast.success('Product Added to Cart')
    dispatch(setCart(res.data.cart))
  }

} catch (error) {
  console.log(error.message);
  
}
  }
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border space-y-6">
      {/* Brand */}
      <p className="text-sm text-blue-600 font-medium hover:underline cursor-pointer">
        {product.brand}
      </p>

      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
        {product.productName}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 border-b pb-4">
        <div className="flex items-center text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <Star key={index} size={18} fill="currentColor" />
          ))}
        </div>
        <span className="text-sm text-blue-600 cursor-pointer">
          4.8 Ratings
        </span>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-gray-900">
            ₹{product.productPrice}
          </span>

          <span className="text-lg text-gray-500 line-through">
            ₹{Math.round(product.productPrice * 1.3)}
          </span>

          <span className="text-green-600 font-semibold">
            23% OFF
          </span>
        </div>

        <p className="text-green-700 font-medium">
          Inclusive of all taxes
        </p>
      </div>

      {/* Category */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-gray-700">Category:</span>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {product.category}
        </span>
      </div>

      {/* Description */}
      <div className="border-t pt-5">
        <h3 className="text-lg font-semibold mb-3">
          About this item
        </h3>

        <p className="text-gray-600 leading-7">
          {product.productDesc}
        </p>
      </div>

      {/* Delivery & Trust Badges */}
      <div className="grid grid-cols-3 gap-4 border-t pt-6">
        <div className="flex flex-col items-center text-center gap-2">
          <Truck size={24} />
          <span className="text-xs text-gray-600">
            Fast Delivery
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <RotateCcw size={24} />
          <span className="text-xs text-gray-600">
            Easy Returns
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <ShieldCheck size={24} />
          <span className="text-xs text-gray-600">
            Secure Payment
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button onClick={()=>addToCart(product._id)} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-full transition">
          Add to Cart
        </button>

        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition">
          Buy Now
        </button>
      </div>

      {/* Stock */}
      <div className="border-t pt-4">
        <p className="text-green-600 font-semibold text-lg">
          In Stock
        </p>
        <p className="text-sm text-gray-500">
          FREE delivery available on eligible orders.
        </p>
      </div>
    </div>
  );
}

export default ProductDesc;