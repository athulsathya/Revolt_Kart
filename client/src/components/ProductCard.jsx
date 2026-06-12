import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart, Star } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";

function ProductCard({ product }) {
  const { productImg, productPrice, productName, productDesc } = product;
  const accessToken=localStorage.getItem('accessToken')
  const dispatch=useDispatch()
  const navigate=useNavigate()

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
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      
      {/* Product Image */}
      <div className="overflow-hidden">
        <img
        onClick={()=>navigate(`/products/${product._id}`)}
          src={productImg?.[0]?.url}
          alt={productName}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        
        {/* Product Name */}
        <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {productName}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((star) => (
            <Star key={star} size={16} fill="orange" color="orange" />
          ))}
          <Star size={16} color="orange" />
          <span className="text-xs text-blue-600">(128)</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2">
          {productDesc}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">
            ₹{productPrice}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{Math.floor(productPrice * 1.3)}
          </span>
        </div>

        <p className="text-xs text-green-600 font-medium">
          FREE Delivery
        </p>

        {/* Add To Cart Button */}
        <Button onClick={()=>addToCart(product._id)} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
