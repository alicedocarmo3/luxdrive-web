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
} from "lucide-react";

import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // VERIFICA SE É A PAGE CONTACT
  const isContactPage = location.pathname === "/contact";

  // Carrega o usuário inicialmente ao montar a Navbar
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, [location]); // Executa também quando muda de página para re-checar o estado

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LÓGICA DO CLIQUE NO ÍCONE DE PERFIL CORRIGIDA
  const handleProfileClick = () => {
    // Força a checagem direto no localStorage para evitar atrasos de estado do React
    const loggedUser = localStorage.getItem("user");

    if (!loggedUser) {
      // Se não tiver conta/dados guardados, vai para o Login
      navigate("/login");
    } else {
      // Se estiver cadastrado/logado, vai direto para o perfil dele
      navigate("/perfil");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowModal(false);
    navigate("/");
  };

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
          {/* LADO ESQUERDO */}
          <div className="nav-left">
            <button
              className="nav-btn"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.2} />
              <span className="nav-btn-label">Menu</span>
            </button>
          </div>

          {/* CENTRO */}
          <div className="nav-center">
            <Link to="/" className="logo-link">
              <h1 className="logo">
                LEGACY
                <span className="logo-accent">D</span>
                RIVE
              </h1>
            </Link>
          </div>

          {/* DIREITA */}
          <div className="nav-right">


            {/* ÍCONE DE PERFIL COM A COORDENAÇÃO DE DIRECIONAMENTO */}
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
        <div
          className="menu-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="menu-close-outside"
            onClick={() => setMenuOpen(false)}
          >
            <X size={35} strokeWidth={1} />
          </button>

          <nav className="menu-nav">
            <Link to="/" onClick={() => setMenuOpen(false)}>Início</Link>
            <Link to="/models" onClick={() => setMenuOpen(false)}>Modelos</Link>
            <Link to="/universe" onClick={() => setMenuOpen(false)}>Universo LD</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>Sobre</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contato</Link>
              {/* ===== LINK ADMIN - SÓ APARECE SE FOR ADMIN ===== */}
  {user?.role === "admin" && (
    <Link
      to="/admin"
      onClick={() => setMenuOpen(false)}
      className="admin-link"
    >
      <Shield size={16} />
      Dashboard Admin
    </Link>
  )}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
