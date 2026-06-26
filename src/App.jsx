import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Models from "./pages/Models";
import CarsDetails from "./pages/CarsDetails";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Cars from "./pages/tabelas/Cars";
import Events from "./pages/tabelas/Events";
import Brands from "./pages/tabelas/Brands";
import Sedes from "./pages/tabelas/Sedes";
import UsersPage from "./pages/tabelas/Users"; // ← importa como UsersPage
import Perfil from "./pages/Perfil";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import UniverseLd from "./components/UniverseLd";
import EventDetails from "./components/EventDetails";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/universe" element={<UniverseLd />} />
          <Route path="/evento/:id" element={<EventDetails />} />
          <Route path="/models" element={<Models />} />
          <Route path="/carsdetails/:id" element={<CarsDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* Rotas Admin protegidas */}
          <Route
            path="/admin/cars"
            element={
              <AdminRoute>
                <Cars />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <Events />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/brands"
            element={
              <AdminRoute>
                <Brands />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/sedes"
            element={
              <AdminRoute>
                <Sedes />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route path="/perfil" element={<Perfil />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;