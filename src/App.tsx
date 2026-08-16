import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Doctors from "@/pages/Doctors";
import DoctorProfile from "@/pages/DoctorProfile";
import Appointments from "@/pages/Appointments";
import Consultation from "@/pages/Consultation";
import PetHealth from "@/pages/PetHealth";
import Emergency from "@/pages/Emergency";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:slug" element={<DoctorProfile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="pet-health" element={<PetHealth />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
