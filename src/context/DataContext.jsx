// context/DataContext.js
import React, { createContext, useContext, useState } from 'react';
import {
  getAllDoctors,
  getAllPatients,
  getAllAppointments,
} from '../data/api';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const doctorsData = await getAllDoctors();
      const patientsData = await getAllPatients();
      const appointmentsData = await getAllAppointments();

      setDoctors(doctorsData);
      setPatients(patientsData);
      setAppointments(appointmentsData);

      return { doctors: doctorsData, patients: patientsData, appointments: appointmentsData };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  


  return (
    <DataContext.Provider
      value={{ doctors, patients, appointments, fetchData }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { DataProvider, useData };
