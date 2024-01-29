import axios from "axios";
const API = "https://nalco-care-api.onrender.com/api/v1";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };

  return headers;
};

const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API}/auth/register`, { ...user });
    console.log(response.data);
    return response.data.user;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const loginUser = async (userdata) => {
  try {
    const response = await axios.post(`${API}/auth/login`, { ...userdata });
    console.log(response.data);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    if (user.role === "patient" || user.role === "doctor") {
      const { data } = await axios.get(
        `${API}/${user.role}/get-${user.role}/${user.email}`
      );
      console.log(data);
      return data.user;
    }
    return user;
  } catch (error) {
    console.log(error);
    return error.massage;
  }
};

const getAllDoctors = async () => {
  try {
    const headers = getHeaders();
    const res = await axios.get(`${API}/doctor/get-all-doctors`, { headers });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};
const getAllPatients = async () => {
  try {
    const headers = getHeaders();

    const res = await axios.get(`${API}/patient/get-all-patients`, { headers });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};

const getAllAppointments = async () => {
  try {
    const headers = getHeaders();

    const res = await axios.get(`${API}/admin/get-all-appointments`, {
      headers,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};
const getDoctorAppointments = async (id) => {
  try {
    const headers = getHeaders();

    const res = await axios.get(`${API}/doctor/get-doctor-appointments/${id}`, {
      headers,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};
const getPatientAppointments = async (id) => {
  try {
    const headers = getHeaders();

    const res = await axios.get(
      `${API}/patient/get-patient-appointments/${id}`,
      {
        headers,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};

const approveAppointment = async (Id) => {
  try {
    const headers = getHeaders();

    const res = await axios.post(`${API}/doctor/approve-appointment/${Id}`, {
      headers,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};
const rejectAppointment = async (Id) => {
  try {
    const headers = getHeaders();
    const res = await axios.post(`${API}/doctor/reject-appointment/${Id}`, {
      headers,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};

const createAppointment = async (appointment) => {
  try {
    const headers = getHeaders();

    const res = await axios.post(
      `${API}/patient/create-appoinment`,
      {
        ...appointment,
      },
      { headers }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.massage);
    return error.massage;
  }
};

export {
  loginUser,
  registerUser,
  createAppointment,
  rejectAppointment,
  approveAppointment,
  getAllAppointments,
  getAllPatients,
  getAllDoctors,
  getDoctorAppointments,
  getPatientAppointments,
};
