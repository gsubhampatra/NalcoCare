
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [appointmentData, setAppointmentData] = useState({
    patientEmail: '',
    slot: '',
    date: '',
    details: '',
  })
  const { user } = useAuth()
  const { fetchDoctor } = useData()



  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const data = await fetchDoctor()


      setDoctors(data.doctors)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAppointment = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          ...appointmentData,
        }),
      })
      if (response.ok) {
        alert('Appointment created successfully')
        setSelectedDoctor(null)
        setAppointmentData({
          patientEmail: '',
          slot: '',
          date: '',
          details: '',
        })
      } else {
        throw new Error('Failed to create appointment')
      }
    } catch (error) {
      alert('Error creating appointment: ' + error.message)
    }
  }

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        const response = await fetch(`/api/doctors/${doctorId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setDoctors(doctors.filter((doctor) => doctor.id !== doctorId))
          alert('Doctor deleted successfully')
        } else {
          throw new Error('Failed to delete doctor')
        }
      } catch (error) {
        alert('Error deleting doctor: ' + error.message)
      }
    }
  }

  if (loading) {
    return <div className="py-8 text-center">Loading...</div>
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">All Doctors</h1>
      <button
        onClick={fetchDoctors}
        className="px-4 py-2 mb-8 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Refresh
      </button>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-6 bg-white rounded-lg shadow-md">
        
            <h2 className="mb-2 text-xl font-semibold text-center">{doctor.name}</h2>
            <p className="mb-2 text-center text-gray-600">{doctor.specialization}</p>
            <p className="mb-4 text-center text-gray-600">{doctor.email}</p>
            <div className="mb-4 text-sm text-gray-500">
              <p>Availability:</p>
              <p>{doctor.availability.length > 0 ? doctor.availability.join(', ') : 'Not Available'}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
              >
                Book Appointment
              </button>
              {user?.role === 'admin' && (
                <button
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg">
            <h2 className="mb-4 text-2xl font-bold">Book an Appointment</h2>
            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700">
                  Patient Email
                </label>
                <input
                  type="email"
                  id="patientEmail"
                  value={appointmentData.patientEmail}
                  onChange={(e) => setAppointmentData({ ...appointmentData, patientEmail: e.target.value })}
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="slot" className="block text-sm font-medium text-gray-700">
                  Appointment Slot
                </label>
                <select
                  id="slot"
                  value={appointmentData.slot}
                  onChange={(e) => setAppointmentData({ ...appointmentData, slot: e.target.value })}
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select a slot</option>
                  {selectedDoctor.availability.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Appointment Details
                </label>
                <textarea
                  id="details"
                  value={appointmentData.details}
                  onChange={(e) => setAppointmentData({ ...appointmentData, details: e.target.value })}
                  required
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 font-bold text-black bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllDoctors