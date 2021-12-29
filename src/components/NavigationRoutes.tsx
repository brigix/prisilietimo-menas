import { Home, About, Booking, Contact } from "../pages";
import { Routes, Route } from "react-router-dom";

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default NavigationRoutes;
