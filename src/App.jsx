import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Models from "./pages/Models"; 
import AboutUs from "./components/AboutUs";
import UniverseLd from "./components/UniverseLd";
import EventDetails from "./components/EventDetails";
import CarDetails from "./pages/CarsDetails"; // Importação já está aqui!

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container">

        {/* NAVBAR GLOBAL */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/universe" element={<UniverseLd />} />
          <Route path="/evento/:id" element={<EventDetails />} />
          <Route path="/models" element={<Models />} /> 
          
          {/* ADICIONE ESTA LINHA ABAIXO */}
          <Route path="/carro/:id" element={<CarDetails />} />
          
        </Routes>

        {/* FOOTER GLOBAL */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;