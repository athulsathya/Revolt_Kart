import React from "react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              #1 Multi Vendor Marketplace
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Latest Electronics
              <span className="block text-gray-600">
                At The Best Prices
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Discover top-quality gadgets, smartphones, laptops, accessories,
              and more from trusted vendors. Compare prices and shop with
              confidence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg">
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-2"
              >
                View Deals
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-6">
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-gray-500">Vendors</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-gray-500">Products</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">50K+</h3>
                <p className="text-gray-500">Customers</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="/heroImg.jpg"
              alt="Electronics"
              className="w-full rounded-3xl shadow-2xl object-cover"
            />

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-sm text-gray-500">Today's Deal</p>
              <h3 className="font-bold text-lg">Up to 50% Off</h3>
              <p className="text-sm text-gray-600">
                Electronics & Accessories
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;