import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { setProduct } from "@/redux/productSlice";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function AdminProduct() {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const filteredProducts = products.filter(
    (product) =>
      product?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.productDesc?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editProduct?._id) {
      toast.error("Product ID not found");
      console.log(editProduct);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("productName", editProduct.productName);
      formData.append("productDesc", editProduct.productDesc);
      formData.append("productPrice", editProduct.productPrice);
      formData.append("category", editProduct.category);
      formData.append("brand", editProduct.brand);

      const existingImages =
        editProduct.productImg
          ?.filter((img) => !(img instanceof File) && img.public_id)
          .map((img) => img.public_id) || [];

      formData.append("existingImages", JSON.stringify(existingImages));
      editProduct.productImg
        ?.filter((img) => img instanceof File)
        .forEach((file) => {
          console.log("Uploading file:", file);
          formData.append("files", file);
        });

      console.log("Edit Product:", editProduct);
      console.log("Product ID:", editProduct?._id);
      console.log(
        `${import.meta.env.VITE_URL}/api/product/update/${editProduct?._id}`,
      );

      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product updated successfully");

        const updatedProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );

        dispatch(setProduct(updatedProducts));
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (product) => product._id !== productId,
      );
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProduct(remainingProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full md:w-96">
          <Input
            type="text"
            placeholder="Search by name, brand, category..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.map((product, index) => (
          <Card
            key={product._id || index}
            className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Product Image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={product?.productImg?.[0]?.url}
                alt={product?.productName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold line-clamp-1">
                {product?.productName}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2">
                {product?.productDesc}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  ₹{product?.productPrice}
                </span>

                <span className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-700">
                  {product?.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {/* Edit Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="flex-1"
                      onClick={() => setEditProduct({ ...product })}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>
                        Update product details and save changes.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`name-${product._id}`}>
                          Product Name
                        </Label>
                        <Input
                          name="productName"
                          value={editProduct?.productName || ""}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`price-${product._id}`}>
                          Product Price
                        </Label>
                        <Input
                          name="productPrice"
                          value={editProduct?.productPrice || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`price-${product._id}`}>Brand</Label>
                        <Input
                          name="brand"
                          value={editProduct?.brand || ""}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`category-${product._id}`}>
                          Category
                        </Label>
                        <Input
                          name="category"
                          value={editProduct?.category || ""}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`desc-${product._id}`}>
                          Description
                        </Label>
                        <textarea
                          name="productDesc"
                          value={editProduct?.productDesc || ""}
                          onChange={handleChange}
                          className="w-full min-h-[120px] rounded-md border p-3 text-sm"
                        />
                      </div>
                      <ImageUpload
                        productData={editProduct}
                        setProductData={setEditProduct}
                      />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <Button onClick={handleSave}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex-1">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">📦</div>

          <h2 className="text-xl font-semibold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to see them here.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminProduct;
