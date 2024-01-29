import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, PageNotFound, Home } from "./components/common";
import { Login, Register } from "./components/auth";
import PatientDashboard from "./components/patient/PatientDashboard";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import RegisterDoctor from "./components/auth/RegisterDoctor";
import AllDoctors from "./components/admin/AllDoctors";
import AllAppointments from "./components/admin/AllAppointments";
import AllPatients from "./components/admin/AllPatients";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-doctor" element={<RegisterDoctor />} />
          <Route path="/patient">
            <Route path="" element={<PatientDashboard />} />
          </Route>
          <Route path="/doctor" element={<DoctorDashboard />} />

          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route path="all-doctors" element={<AllDoctors />} />
            <Route path="all-appointments" element={<AllAppointments />} />
            <Route path="all-patients" element={<AllPatients />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
