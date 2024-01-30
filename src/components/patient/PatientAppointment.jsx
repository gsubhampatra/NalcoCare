import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { Button } from "flowbite-react";
import { approveAppointment, rejectAppointment } from "../../data/api";
import { Loading } from "../common";
import { AppointmentCard } from "../admin/AllAppointments";

const PatientAppointments = ({ user }) => {
  const {
    appointments,
    fetchPatientAppointment,
    getApprovedAppointments,
    getRejectedAppointments,
  } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState(appointments);
  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPatientAppointment(user._id);
      setApps(data.appointments);
      setIsLoading(false);
      toast.success(data?.message || "Appointments Fetched Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const ApprovedApps = () => {
    setApps(getApprovedAppointments());
  };
  const RejectedApps = () => {
    setApps(getRejectedAppointments());
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <>
      <h1>All Appointments</h1>
      <div className="flex flex-row md:flex-col">
        <button
          onClick={() => {
            getAppointments();
          }}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Refresh
        </button>
        <button
          onClick={ApprovedApps}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Approved Appointments
        </button>

        <button
          onClick={RejectedApps}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Rejected Appointments
        </button>
      </div>

      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="grid grid-cols-2 ">
          {apps.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              handleApprove={approveAppointment}
              handleReject={rejectAppointment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PatientAppointments;
