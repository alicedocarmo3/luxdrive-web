import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  CircleUserRound,
  Globe,
  Menu,
  X
} from "lucide-react";

import "../styles/Navbar.css";

function Navbar() {

  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // LOCATION
  const location = useLocation();

  // VERIFICA SE É A PAGE CONTACT
  const isContactPage =
    location.pathname === "/contact";

  useEffect(() => {

    const userData =
      localStorage.getItem("user");

    if (userData) {

      try {

        setUser(JSON.parse(userData));

      } catch (error) {

        localStorage.removeItem("user");

      }

    }

  }, []);

  useEffect(() => {

    const handleScroll = () =>
      setScrolled(window.scrollY > 50);

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  const handleProfileClick = () => {

    !user
      ? navigate("/login")
      : setShowModal(true);

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

              <Menu
                size={22}
                strokeWidth={1.2}
              />

              <span className="nav-btn-label">
                Menu
              </span>

            </button>

          </div>

          {/* CENTRO */}
          <div className="nav-center">

            <Link
              to="/"
              className="logo-link"
            >

              <h1 className="logo">
                LEGACY
                <span className="logo-accent">
                  D
                </span>
                RIVE
              </h1>

            </Link>

          </div>

          {/* DIREITA */}
          <div className="nav-right">

            <button
              className="nav-btn icon-only"
              aria-label="Idioma"
            >

              <Globe
                size={22}
                strokeWidth={1.2}
              />

            </button>

            <button
              className="nav-btn icon-only"
              onClick={handleProfileClick}
              aria-label="Perfil"
            >

              <CircleUserRound
                size={22}
                strokeWidth={1.2}
              />

            </button>

          </div>

        </div>

      </nav>

      {/* MENU */}
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

            <X
              size={35}
              strokeWidth={1}
            />

          </button>

          <nav className="menu-nav">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Início
            </Link>

            <Link
              to="/models"
              onClick={() => setMenuOpen(false)}
            >
              Modelos
            </Link>

            <Link
              to="/universe"
              onClick={() => setMenuOpen(false)}
            >
              Universo LD
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </Link>

          </nav>

        </div>

      </div>

      {/* MODAL PREMIUM */}
{showModal && (

  <div
    className="modal-overlay"
    onClick={() => setShowModal(false)}
  >

    <div
      className="modal-content premium-modal-v2"
      onClick={(e) => e.stopPropagation()}
    >

      {/* BOTÃO FECHAR */}
      <button
        className="modal-close"
        onClick={() => setShowModal(false)}
      >

        <X
          size={20}
          strokeWidth={1.7}
        />

      </button>

      {/* BANNER */}
      <div className="profile-banner">

        <div className="banner-gradient"></div>

      </div>

      {/* HEADER */}
      <div className="profile-main">

        {/* AVATAR */}
        <div className="profile-avatar-wrapper">

          <img
            src={
              user?.foto ||
              "https://i.pinimg.com/736x/4f/37/1e/4f371e6f7d6c0e4b2d2f9d44e6f4b0f2.jpg"
            }
            alt="Foto Perfil"
            className="profile-avatar"
          />

          <button className="edit-avatar-btn">
            Editar
          </button>

        </div>

        {/* INFOS */}
        <div className="profile-user-data">

          <div className="profile-top">

            <div>

              <h2 className="profile-name">
                {user?.nome}
              </h2>

              <span className="profile-username">
                @{user?.nome?.toLowerCase()?.replace(/\s/g, "")}
              </span>

            </div>

            <div className="profile-badges">

              <span className="badge premium">
                PREMIUM
              </span>

              {
                user?.role === "admin" && (

                  <span className="badge admin">
                    ADMIN
                  </span>

                )
              }

            </div>

          </div>

          <p className="profile-description">
            Apaixonado por carros de luxo,
            performance extrema e experiências
            exclusivas da LegacyDrive.
          </p>

        </div>

      </div>

      {/* INFORMAÇÕES */}
      <div className="profile-sections">

        <div className="profile-card">

          <span className="card-title">
            EMAIL
          </span>

          <p>
            {user?.email || "Não informado"}
          </p>

        </div>

        <div className="profile-card">

          <span className="card-title">
            TELEFONE
          </span>

          <p>
            {user?.telefone || "Não informado"}
          </p>

        </div>

        <div className="profile-card">

          <span className="card-title">
            CIDADE
          </span>

          <p>
            {user?.cidade || "Não informado"}
          </p>

        </div>

        <div className="profile-card">

          <span className="card-title">
            MEMBRO DESDE
          </span>

          <p>
            2026
          </p>

        </div>

      </div>

      

      {/* AÇÕES */}
      <div className="profile-actions-v2">

        <button className="edit-profile-btn">
          Editar Perfil
        </button>

        {
          user?.role === "admin" && (

            <button
              className="admin-panel-btn"
              onClick={() => navigate("/admin")}
            >
              Painel Admin
            </button>

          )
        }

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Sair
        </button>

      </div>

    </div>

  </div>

)}

    </>

  );

}

export default Navbar;