// components/Navbar.jsx
import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  CircleUserRound,
  Menu,
  X,
  Shield,
  LayoutDashboard,
  Car,
  CalendarDays,
  Tag,
  Building2,
  Users,
  MessageSquare,
} from "lucide-react";

import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isContactPage = location.pathname === "/contact";
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileClick = () => {
    const loggedUser = localStorage.getItem("user");
    if (!loggedUser) {
      navigate("/login");
    } else {
      navigate("/perfil");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowModal(false);
    navigate("/");
  };

  const publicMenuItems = [
    { to: "/", label: "Início" },
    { to: "/models", label: "Modelos" },
    { to: "/universe", label: "Universo LD" },
    { to: "/about", label: "Sobre" },
    { to: "/contact", label: "Contato" },
  ];

  const adminMenuItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/cars", label: "Carros", icon: Car },
    { to: "/admin/events", label: "Eventos", icon: CalendarDays },
    { to: "/admin/brands", label: "Marcas", icon: Tag },
    { to: "/admin/sedes", label: "Sedes", icon: Building2 },
    { to: "/admin/users", label: "Usuários", icon: Users },
    { to: "/admin/contact", label: "Contato", icon: MessageSquare },
  ];

  return (
    <>
      <nav
        className={`
          navbar
          ${scrolled ? "navbar--scrolled" : ""}
          ${isContactPage ? "navbar-contact" : ""}
        `}
      >
        <div className="nav-container">
          <div className="nav-left">
            <button className="nav-btn" onClick={() => setMenuOpen(true)}>
              <Menu size={22} strokeWidth={1.2} />
              <span className="nav-btn-label">Menu</span>
            </button>
          </div>

          <div className="nav-center">
            <Link to="/" className="logo-link">
              <h1 className="logo">
                LEGACY<span className="logo-accent">D</span>RIVE
              </h1>
            </Link>
          </div>

          <div className="nav-right">
            <button
              className="nav-btn icon-only"
              onClick={handleProfileClick}
              aria-label="Perfil"
            >
              <CircleUserRound size={22} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </nav>

      {/* MENU OVERLAY */}
      <div
        className={`menu-overlay ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
          <button
            className="menu-close-outside"
            onClick={() => setMenuOpen(false)}
          >
            <X size={35} strokeWidth={1} />
          </button>

          <nav className="menu-nav">
            {isAdmin ? (
              <>
                {/* ===== MENU ADMIN ===== */}
                {adminMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={location.pathname === item.to ? "active" : ""}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}

                {/* Logout no final do menu admin */}
                <div className="menu-divider" />
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="menu-logout-btn"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                {/* ===== MENU NORMAL ===== */}
                {publicMenuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="admin-link"
                  >
                    <Shield size={16} />
                    Dashboard Admin
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;