import React from "react";
import { useData } from "../../context/DataContext";

const AllPatients = () => {
  const { patients, fetchPatient } = useData();

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">All Patients</h1>
      <button
        onClick={() => {
          fetchPatient();
        }}
        className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-black rounded-md shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        getAllPatients
      </button>
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
        >
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl font-semibold">{patient.name}</h1>
              <p className="text-sm font-semibold">{patient.medHistory}</p>
              <p className="text-sm font-semibold">{patient.email}</p>
            </div>
            <div>
              <button className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-md shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllPatients;
