import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { createAppointment } from "../../data/api";
import { Loading } from "../common";
import toast from "react-hot-toast";

const AllDoctors = () => {
  const [loading, setLoading] = useState(false);
  const { doctors, fetchDoctor, getDoctorfromEmail, getPatientfromEmail } =
    useData();
  const [openModal, setOpenModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctorEmail: null,
    patientEmail: "",
    slot: "",
    date: "",
    details: "",
  });

  function onCloseModal() {
    setOpenModal(false);
  }

  function handleBookAppointment(doctor) {
    const availableSlots = doctor.availability;
    setSlots(availableSlots);
    setAppointmentData({
      doctorEmail: doctor.email,
      patientEmail: "",
      slot: availableSlots.length > 0 ? availableSlots[0] : "", // Default to the first available slot
      date: "",
      details: "",
    });
    setOpenModal(true);
  }

  const handleCreateAppointment = async () => {
    const { doctorEmail, patientEmail, slot, date, details } = appointmentData;
    const patient = await getPatientfromEmail(patientEmail);
    const doctor = await getDoctorfromEmail(doctorEmail);
    const appointment = {
      doctorId: doctor._id,
      patientId: patient._id,
      date,
      slot,
      details,
    };
    setLoading(true);
    const data = await createAppointment(appointment);
    console.log("Appointment details:", data);
    setLoading(false);
    toast.success("Appointment created successfully");
    setOpenModal(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-center">All Doctors</h1>
      <button
        onClick={() => {
          fetchDoctor();
        }}
        className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-black rounded-md shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        getAllDoctors
      </button>
      {doctors.map((doctor) => {
        return (
          <div
            key={doctor.id}
            className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
          >
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl font-semibold">{doctor.name}</h1>
                <p className="text-sm font-semibold">{doctor.specility}</p>
                <p className="text-sm font-semibold">{doctor.email}</p>
              </div>
              <div>
                <Button
                  gradientMonochrome="lime"
                  onClick={() => handleBookAppointment(doctor)}
                >
                  Book Appointment
                </Button>

                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="space-y-6">
                      <div>
                        <div className="block mb-2">
                          <Label htmlFor="doctorEmail" value="Doctor Email" />
                        </div>
                        <TextInput
                          id="doctorEmail"
                          value={appointmentData.doctorEmail}
                        />
                      </div>
                      <div>
                        <div className="block mb-2">
                          <Label htmlFor="patientEmail" value="Patient Email" />
                        </div>
                        <TextInput
                          id="patientEmail"
                          placeholder="name@company.com"
                          value={appointmentData.patientEmail}
                          onChange={(e) =>
                            setAppointmentData({
                              ...appointmentData,
                              patientEmail: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <div className="block mb-2">
                          <Label htmlFor="slot" value="Appointment Slot" />
                        </div>
                        <select
                          id="slot"
                          value={appointmentData.slot}
                          onChange={(e) =>
                            setAppointmentData({
                              ...appointmentData,
                              slot: e.target.value,
                            })
                          }
                          required
                        >
                          {slots.map((slot) => (
                            <option key={slot} value={slot} className="p-2">
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <div className="block mb-2">
                          <Label
                            htmlFor="details"
                            value="Appointment Details"
                          />
                        </div>
                        <TextInput
                          id="details"
                          value={appointmentData.details}
                          onChange={(e) =>
                            setAppointmentData({
                              ...appointmentData,
                              details: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <div className="block mb-2">
                          <Label htmlFor="date" value="Appointment Date" />
                        </div>
                        <TextInput
                          id="date"
                          type="date"
                          value={appointmentData.date}
                          onChange={(e) =>
                            setAppointmentData({
                              ...appointmentData,
                              date: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                        <Button
                          gradientMonochrome="cyan"
                          onClick={handleCreateAppointment}
                        >
                          Create Appointment
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AllDoctors;
