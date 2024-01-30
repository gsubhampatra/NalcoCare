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
    const res = await axios.post(`${API}/auth/register`, { ...user });
    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUser = async (userdata) => {
  try {
    const res = await axios.post(`${API}/auth/login`, { ...userdata });
    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    const { token, user } = res.data;
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
    throw error;
  }
};

const getAllDoctors = async () => {
  try {
    const headers = getHeaders();
    const res = await axios.get(`${API}/doctor/get-all-doctors`, { headers });
    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
const getAllPatients = async () => {
  try {
    const headers = getHeaders();

    const res = await axios.get(`${API}/patient/get-all-patients`, { headers });

    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const getAllAppointments = async () => {
  try {
    const headers = getHeaders();

    const res = await axios.get(`${API}/admin/get-all-appointments`, {
      headers,
    });
    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
const getDoctorAppointments = async (id) => {
  try {
    const headers = getHeaders();

    const res = await axios.get(`${API}/doctor/get-doctor-appointments/${id}`, {
      headers,
    });
    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
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
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const approveAppointment = async (Id) => {
  try {
    const headers = getHeaders();

    const res = await axios.post(`${API}/doctor/approve-appointment/${Id}`, {
      headers,
    });
    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const rejectAppointment = async (Id) => {
  try {
    const headers = getHeaders();
    const res = await axios.post(`${API}/doctor/reject-appointment/${Id}`, {
      headers,
    });
    console.log(res.data);
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
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
    if (!res.data?.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
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
