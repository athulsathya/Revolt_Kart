import Filtersidebar from "@/components/Filtersidebar";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/redux/productSlice";

function Products() {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const { products } = useSelector((store) => store.product);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  const [priceRange, setPriceRange] = useState([0, 999999]);

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/product/getallproducts`,
      );

      if (res.data.success) {
        setAllProduct(res.data.products);
        dispatch(setProduct(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProduct.length === 0) return;

    let filtered = [...allProduct];

    // Search
    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Brand
    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    // Price Range
    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
    );

    // Sorting
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProduct(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProduct, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Explore Products
          </h1>

          <p className="mt-2 text-slate-500">
            Discover premium products tailored for you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-sm p-5 lg:sticky lg:top-24">
              <Filtersidebar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                allProduct={allProduct}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-sm p-4 sm:p-6">
              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    All Products
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {products.length} Products Available
                  </p>
                </div>

                <Select onValueChange={setSortOrder}>
                  <SelectTrigger className="w-full md:w-64 h-11 rounded-xl border-slate-300">
                    <SelectValue placeholder="Sort Products" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="lowToHigh">
                        Price: Low to High
                      </SelectItem>

                      <SelectItem value="highToLow">
                        Price: High to Low
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Products Grid */}
              <div className="mt-6">
                {products.length > 0 ? (
                  <div
                    className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
                sm:gap-6
              "
                  >
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        loading={loading}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24">
                    <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center">
                      📦
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-slate-800">
                      No Products Found
                    </h2>

                    <p className="mt-2 text-slate-500 text-center max-w-md">
                      We couldn't find any products matching your filters. Try
                      adjusting your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Products;
