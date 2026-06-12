import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative mt-16 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 pt-10 relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Stay Updated
              </h2>

              <p className="text-slate-400 mt-2 text-sm md:text-base">
                Get new arrivals, exclusive offers and marketplace updates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none w-full sm:w-72 transition"
              />

              <button className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-slate-200 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logoRevolt.jpg"
                alt="Revolt"
                className="h-10 w-10 rounded-full object-cover border border-white/10"
              />

              <h2 className="text-2xl font-bold">Revolt</h2>
            </div>

            <p className="text-slate-400 text-sm leading-6 mt-4">
              Modern multi-vendor marketplace connecting customers with
              trusted sellers and quality products.
            </p>

            <div className="flex gap-3 mt-5">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    <Icon size={14} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>

            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link to="/products" className="hover:text-white transition">
                All Products
              </Link>

              <Link to="/deals" className="hover:text-white transition">
                Deals & Offers
              </Link>

              <Link to="/vendors" className="hover:text-white transition">
                Vendors
              </Link>

              <Link
                to="/new-arrivals"
                className="hover:text-white transition"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>

            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link to="/faq" className="hover:text-white transition">
                FAQ
              </Link>

              <Link to="/shipping" className="hover:text-white transition">
                Shipping
              </Link>

              <Link to="/returns" className="hover:text-white transition">
                Returns
              </Link>

              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} />
                <span>Kerala, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>support@revolt.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Revolt Marketplace. All rights reserved.
            </p>

            <div className="flex gap-5 text-sm text-slate-500">
              <Link to="/privacy" className="hover:text-white transition">
                Privacy
              </Link>

              <Link to="/terms" className="hover:text-white transition">
                Terms
              </Link>

              <Link to="/cookies" className="hover:text-white transition">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;