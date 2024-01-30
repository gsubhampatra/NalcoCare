import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { Button } from "flowbite-react";
import { approveAppointment, rejectAppointment } from "../../data/api";
import { Loading } from "../common";
import toast from "react-hot-toast";

const AllAppointments = () => {
  const { appointments, fetchAppointment } = useData();
  const [isLoading, setIsLoading] = useState(true);

  const approveApp = async (id) => {
    try {
      setIsLoading(true);
      const data = await approveAppointment(id);
      setIsLoading(false);
      toast.success(data?.message || "Appointment Approved Successfully");
      getAppointments();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const rejectApp = async (id) => {
    try {
      setIsLoading(true);
      const data = await rejectAppointment(id);
      setIsLoading(false);
      toast.success(data?.message || "Appointment Rejected Successfully");
      getAppointments();
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAppointment();
      setIsLoading(false);
      toast.success(data?.message || "Appointments Fetched Successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <>
      <h1>All Appointments</h1>
      <button
        onClick={getAppointments}
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Refresh
      </button>

      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="grid grid-cols-2 ">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              handleApprove={approveApp}
              handleReject={rejectApp}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AllAppointments;

export function AppointmentCard({ appointment, handleApprove, handleReject }) {
  const { _id, patient, doctor, date, slot, details, status } = appointment;

  return (
    <div className="max-w-md overflow-hidden rounded shadow-md bg-sky-50 border-cyan-100">
      <div className="p-4">
        <h2 className="mb-2 text-lg font-bold">{patient.name}</h2>

        <div className="mb-2">
          <label className="text-sm text-gray-600">Doctor:</label>
          <p className="text-gray-800">{doctor.name}</p>
        </div>

        <div className="mb-2">
          <label className="text-sm text-gray-600">Date:</label>
          <p className="text-gray-800">{date}</p>
        </div>

        <div className="mb-2">
          <label className="text-sm text-gray-600">Time:</label>
          <p className="text-gray-800">{slot}</p>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Details:</label>
          <p className="text-gray-800">{details}</p>
        </div>

        {status === "pending" ? (
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleApprove(_id)}
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            >
              Approve
            </button>

            <button
              onClick={() => handleReject(_id)}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        ) : (
          <div
            className={`text-${
              status === "approved" ? "green" : "red"
            }-500 font-bold mb-2`}
          >
            <label className="text-sm text-gray-600">Status:</label>
            <span>{status}</span>
          </div>
        )}
      </div>
    </div>
  );
}
