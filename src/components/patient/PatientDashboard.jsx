import React from "react";
import Dashboard from "../common/Dashboard";
import { useAuth } from "../../context/AuthContext";
import CreateAppointment from "./CreateAppointment";
import PatientAppointments from "./PatientAppointment";

const PatientDashboard = () => {
  const items = [
    {
      name: "All Appointments",
      path: "/patient/all-appointments",
    },
  ];

  const { user } = useAuth();
  if (user?.role !== "patient") {
    return (
      <>
        <h1 className="mt-8 text-2xl font-semibold text-center">
          You are not authorized to view this page
        </h1>
      </>
    );
  }

  return (
    <>
      <Dashboard items={items} />
      <div className="p-4 sm:ml-64">
        <h1 className="text-2xl font-semibold text-center">
          Patient Dashboard
        </h1>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <CreateAppointment user={user} />
          <PatientAppointments user={user} />
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
