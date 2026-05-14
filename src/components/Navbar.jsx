import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, Globe, Menu, X } from "lucide-react";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileClick = () => {
    !user ? navigate("/login") : setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="nav-container">
          
          {/* LADO ESQUERDO: MENU */}
          <div className="nav-left">
            <button className="nav-btn" onClick={() => setMenuOpen(true)}>
              <Menu size={22} strokeWidth={1.2} />
              <span className="nav-btn-label">Menu</span>
            </button>
          </div>

          {/* CENTRO: LOGO */}
          <div className="nav-center">
            <Link to="/" className="logo-link">
              <h1 className="logo">
                LEGACY<span className="logo-accent">D</span>RIVE
              </h1>
            </Link>
          </div>

          {/* LADO DIREITO: UTILITÁRIOS */}
          <div className="nav-right">
            <button className="nav-btn icon-only" aria-label="Idioma">
              <Globe size={22} strokeWidth={1.2} />
            </button>
            <button className="nav-btn icon-only" onClick={handleProfileClick} aria-label="Perfil">
              <CircleUserRound size={22} strokeWidth={1.2} />
            </button>
          </div>

        </div>
      </nav>

      {/* MENU LATERAL (FLYOUT) */}
      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="menu-panel" onClick={(e) => e.stopPropagation()}>

          {/* BOTÃO X POSICIONADO FORA DO PAINEL */}
        <button className="menu-close-outside" onClick={() => setMenuOpen(false)}>
          <X size={35} strokeWidth={1} />
        </button>
          
          <nav className="menu-nav">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/models" onClick={() => setMenuOpen(false)}>Modelos</Link>
            <Link to="/universe" onClick={() => setMenuOpen(false)}>Universe LD</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>Sobre</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Contato</Link>
          </nav>
        </div>
      </div>

      {/* MODAL DE PERFIL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} strokeWidth={1.5} />
            </button>
            <h2>Meu Perfil</h2>
            {user && (
              <div className="profile-info">
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={handleLogout} className="logout-btn">Sair</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;