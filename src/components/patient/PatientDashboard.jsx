import React from "react";
import Dashboard from "../common/Dashboard";
import { useAuth } from "../../context/AuthContext";
import CreateAppointment from "./CreateAppointment";
import PatientAppointments from "./PatientAppointment";

const PatientDashboard = () => {
  const items = [
    {
      name: "All Appointments",
      path: "/patient/#appointments",
    },
    {
      name: "Book Appointments",
      path: "/patient/#bookappointment",
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
        <div className="p-4 space-y-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div id="bookappointment">
            <h1 className="text-xl font-semibold">Book Appointment</h1>
            <CreateAppointment user={user} />
          </div>
          <div id="appointments">
            <h1 className="text-xl font-semibold">Your Appointments</h1>
            <PatientAppointments user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
