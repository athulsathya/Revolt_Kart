import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  User2,
} from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function SideBar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      isActive
        ? "bg-slate-900 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 shadow-sm z-50">
      <div className="flex flex-col w-full p-5">
        {/* Logo */}
        <div className="pb-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">
            Admin Panel
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage your marketplace
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2">
          <NavLink to="/dashboard/sales" className={navLinkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/add-product" className={navLinkClass}>
            <PackagePlus size={20} />
            Add Product
          </NavLink>

          <NavLink to="/dashboard/products" className={navLinkClass}>
            <PackageSearch size={20} />
            Products
          </NavLink>

          <NavLink to="/dashboard/users" className={navLinkClass}>
            <User2 size={20} />
            Users
          </NavLink>

          <NavLink to="/dashboard/orders" className={navLinkClass}>
            <FaRegEdit size={18} />
            Orders
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default SideBar;