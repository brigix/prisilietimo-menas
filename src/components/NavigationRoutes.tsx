import { Home, About, Booking, Contact, Login, Admin } from "../pages";
import { Routes, Route } from "react-router-dom";

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default NavigationRoutes;
