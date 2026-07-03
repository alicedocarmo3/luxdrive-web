import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Models from "./pages/Models";
import CarsDetails from "./pages/CarsDetails";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Cars from "./pages/tabelas/Cars";
import Events from "./pages/tabelas/Events";
import Brands from "./pages/tabelas/Brands";
import Sedes from "./pages/tabelas/Sedes";
import UsersPage from "./pages/tabelas/Users";
import Perfil from "./pages/Perfil";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

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

// Componente wrapper para lógica condicional do Navbar
function AppContent() {
  const location = useLocation();
  
  // Rotas onde o Navbar NÃO deve aparecer
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/universe" element={<UniverseLd />} />
        <Route path="/evento/:id" element={<EventDetails />} />
        <Route path="/models" element={<Models />} />
        <Route path="/carsdetails/:id" element={<CarsDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/privacidade" element={<Privacy />} />

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
          path="/admin/contact"
          element={
            <AdminRoute>
              <Contact />
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;