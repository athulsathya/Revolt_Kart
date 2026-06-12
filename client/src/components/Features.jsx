import React from "react";
import {
  Store,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Store size={40} />,
      title: "Trusted Vendors",
      description:
        "Shop from verified sellers offering quality products at competitive prices.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Secure Payments",
      description:
        "Your transactions are protected with safe and reliable payment methods.",
    },
    {
      icon: <Truck size={40} />,
      title: "Fast Delivery",
      description:
        "Get your orders delivered quickly with our trusted logistics partners.",
    },
    {
      icon: <Headphones size={40} />,
      title: "24/7 Support",
      description:
        "Our support team is always available to help with your questions and orders.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Why Choose Us
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Built For Modern Online Shopping
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Enjoy a seamless shopping experience with trusted vendors,
            secure payments, fast delivery, and dedicated customer support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-5 text-black">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-gray-500">Verified Vendors</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-gray-500">Products Listed</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-gray-500">Happy Customers</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">99%</h3>
            <p className="text-gray-500">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;