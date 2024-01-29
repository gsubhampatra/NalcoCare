import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../common/Dashboard";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const items = [
  
    {
      name: "All Doctors",
      path: "/admin/all-doctors",
    },
    {
      name: "All Appointments",
      path: "/admin/all-appointments",
    },
    {
      name: "All Patients",
      path: "/admin/all-patients",
    },
  
  ];
  
  const { user } = useAuth();
  if (user?.role !== "admin") {
    return (
      <>
        <h1 className="text-2xl font-semibold text-center mt-8">
          You are not authorized to view this page
        </h1>
      </>
    );
  }

  return (
    <>
      <Dashboard items={items} />
      <div className="p-4 sm:ml-64">
        <h1 className="text-2xl text-center font-semibold">Admin Dashboard</h1>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
