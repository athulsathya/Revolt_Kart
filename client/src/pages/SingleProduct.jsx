import BreadCrums from "@/components/BreadCrums";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const { id } = useParams();
  const { products } = useSelector((store) => store.product);

  const product = products.find((item) => item._id === id);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Product Not Found
          </h2>
          <p className="mt-2 text-slate-500">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <BreadCrums product={product} />
        </div>

        {/* Product Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 p-4 sm:p-6 lg:p-10">

            {/* Product Images */}
            <div className="w-full">
              <div className="sticky top-24">
                <ProductImg images={product?.productImg} />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full">
              <ProductDesc product={product} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;