import SideBar from "@/components/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SideBar />

      <main className="lg:ml-72 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
