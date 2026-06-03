import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Models from "./pages/Models";
import CarsDetails from "./pages/CarsDetails";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Perfil from "./pages/Perfil"; // Apenas acrescentado aqui

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import UniverseLd from "./components/UniverseLd";
import EventDetails from "./components/EventDetails";

function App() {

  return (

    <Router>

      <div className="app-container">

        {/* NAVBAR GLOBAL */}
        <Navbar />

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<AboutUs />}
          />

          {/* UNIVERSE */}
          <Route
            path="/universe"
            element={<UniverseLd />}
          />

          {/* EVENTOS */}
          <Route
            path="/evento/:id"
            element={<EventDetails />}
          />

          {/* MODELS */}
          <Route
            path="/models"
            element={<Models />}
          />

          {/* DETALHES DO CARRO */}
          <Route
            path="/carsdetails/:id"
            element={<CarsDetails />}
          />

          {/* CONTATO */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={<Admin />}
          />

          {/* PERFIL */}
          <Route
            path="/perfil"
            element={<Perfil />}
          />

        </Routes>

        {/* FOOTER GLOBAL */}
        <Footer />

      </div>

    </Router>

  );

}

export default App;