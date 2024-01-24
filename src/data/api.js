import axios from "axios"
const API = "https://nalco-care-api.onrender.com/api/v1"


const registerUser = async (user) => {
    try {
      const response = await axios.post(`${API}/auth/register`, { ...user });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };
  


const loginUser = async(user) => { 
try {
       const response = await axios.post(`${API}/auth/login`, 
        {...user})
        console.log(response.data)
          
          return response.data
} catch (error) {
    console.log(error)
    return error.massage
}
}

const getAllDoctors=async()=>{
  try {
    const res = await axios.get(`${API}/doctor/get-all-doctors`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.massage);
    return error.massage
  }
}
const getAllPatients=async()=>{
  try {
    const res = await axios.get(`${API}/patient/get-all-patients`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.massage);
    return error.massage
  }
}


const getAllAppointments = async()=>{
  try {
    const res = await axios.get(`${API}/admin/get-all-appointments`)
    console.log(res.data);
    return res.data
  } catch (error) {
    console.log(error.massage);
    return error.massage
  }
}


const approveAppointment = async(Id)=>{
  try {
    const res = await axios.post(`${API}/doctor/approve-appointment/${Id}`)
    console.log(res.data);
    return res.data
  } catch (error) {
     console.log(error.massage);
     return error.massage
  }
}
const rejectAppointment = async(Id)=>{
  try {
    const res = await axios.post(`${API}/doctor/reject-appointment/${Id}`)
    console.log(res.data);
    return res.data
  } catch (error) {
     console.log(error.massage);
     return error.massage
  }
}

const createAppointment = async(appointment)=>{
  try {
    const res = await axios.post(`${API}/patient/create-appointment`,{...appointment})
    console.log(res.data);
    return res.data
  } catch (error) {
    console.log(error.massage);
    return error.massage
  }
}







export {loginUser,registerUser,createAppointment,rejectAppointment,approveAppointment,getAllAppointments,getAllPatients,getAllDoctors}

