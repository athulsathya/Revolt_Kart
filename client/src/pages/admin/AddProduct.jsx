import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setProduct } from "@/redux/productSlice";

function AddProduct() {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      productImg: Array.from(e.target.files),
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (productData.productImg.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();

    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDesc", productData.productDesc);
    formData.append("brand", productData.brand);
    formData.append("category", productData.category);

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        dispatch(setProduct(res.data.product));

        toast.success("Product Added Successfully");

        setProductData({
          productName: "",
          productPrice: "",
          productDesc: "",
          productImg: [],
          brand: "",
          category: "",
        });
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="w-full">
  <Card className="max-w-5xl mx-auto shadow-xl border border-slate-200 overflow-hidden rounded-3xl">
    <CardHeader className="bg-gradient-to-r from-pink-600 to-rose-500 text-white">
      <CardTitle className="text-2xl md:text-3xl font-bold">
        Add Product
      </CardTitle>

      <CardDescription className="text-pink-100 text-sm md:text-base">
        Enter Product Details Below
      </CardDescription>
    </CardHeader>

    <CardContent className="p-4 sm:p-6 md:p-8 bg-white">
      <form onSubmit={submitHandler} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-medium text-slate-700">
              Product Name
            </Label>

            <Input
              placeholder="Enter product name"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              required
              className="h-11 focus-visible:ring-pink-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-slate-700">
              Brand
            </Label>

            <Input
              placeholder="Enter brand name"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              required
              className="h-11 focus-visible:ring-pink-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-slate-700">
              Price
            </Label>

            <Input
              type="number"
              placeholder="Enter price"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleChange}
              required
              className="h-11 focus-visible:ring-pink-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-slate-700">
              Category
            </Label>

            <Input
              placeholder="Electronics, Fashion..."
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              className="h-11 focus-visible:ring-pink-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-slate-700">
            Description
          </Label>

          <textarea
            name="productDesc"
            value={productData.productDesc}
            onChange={handleChange}
            placeholder="Write product description..."
            className="
              w-full
              min-h-[150px]
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-pink-500
            "
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-slate-700">
            Product Images
          </Label>

          <Input
            type="file"
            multiple
            onChange={handleImageChange}
            className="cursor-pointer"
          />
        </div>

        <div className="flex justify-end border-t pt-6">
          <Button
            type="submit"
            className="
              w-full
              sm:w-auto
              px-10
              h-11
              bg-pink-600
              hover:bg-pink-700
              shadow-md
            "
          >
            Add Product
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>
  );
}

export default AddProduct;
