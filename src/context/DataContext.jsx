// context/DataContext.js
import React, { createContext, useContext, useState } from "react";
import {
  getAllDoctors,
  getAllPatients,
  getAllAppointments,
  getDoctorAppointments,
} from "../data/api";
import toast from "react-hot-toast";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchDoctor = async () => {
    try {
      const doctorsData = await getAllDoctors();

      setDoctors(doctorsData.doctors);

      return doctorsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const fetchPatient = async () => {
    try {
      const patientsData = await getAllPatients();

      setPatients(patientsData.patients);

      return patientsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");

      throw error;
    }
  };

  const fetchAppointment = async () => {
    try {
      const appointmentsData = await getAllAppointments();
      setAppointments(appointmentsData.appointments);
      return appointmentsData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const fetchDoctorAppointment = async (id) => {
    try {
      const appointmentsData = await getDoctorAppointments(id);

      setAppointments(appointmentsData.appointments);

      return appointmentsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
      throw error;
    }
  };
  const fetchPatientAppointment = async (id) => {
    try {
      const appointmentsData = await getDoctorAppointments(id);

      setAppointments(appointmentsData.appointments);

      return appointmentsData;
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");

      throw error;
    }
  };

  const getPatientfromEmail = (email) => {
    const patient = patients.find((patient) => patient.email === email);
    if (patient === undefined) {
      throw new Error("Patient not found");
    }
    return patient._id;
  };
  const getDoctorfromEmail = (email) => {
    const doctor = doctors.find((doctor) => doctor.email === email);
    if (doctor === undefined) {
      throw new Error("Doctor not found");
    }
    return doctor._id;
  };

  const getPendingAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.status === "pending"
    );
  };
  const getApprovedAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.status === "approved"
    );
  };
  const getRejectedAppointments = () => {
    return appointments.filter(
      (appointment) => appointment.status === "rejected"
    );
  };

  return (
    <DataContext.Provider
      value={{
        doctors,
        patients,
        appointments,
        fetchDoctor,
        fetchPatient,
        fetchAppointment,
        getPatientfromEmail,
        getDoctorfromEmail,
        fetchDoctorAppointment,
        fetchPatientAppointment,
        getPendingAppointments,
        getApprovedAppointments,
        getRejectedAppointments,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { DataProvider, useData };
