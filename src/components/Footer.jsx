import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Mail,
  Phone,
  Clock,
  ArrowUp,
  FileText,
  Shield
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Footer.css";

function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const footer = document.querySelector(".footer");

    const handleMouseMove = (e) => {
      const rect = footer.getBoundingClientRect();

      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    if (footer) {
      footer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (footer) {
        footer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <footer className="footer">
      {/* Luz seguindo o mouse */}
      <div
        className="footer-light"
        style={{
          background: `radial-gradient(
            300px circle at ${mousePos.x}px ${mousePos.y}px,
            rgba(212, 175, 55, 0.12),
            transparent 40%
          )`,
        }}
      ></div>

      <div className="footer-container">

        <div className="footer-main">

          <div className="footer-brand">
            <h2>
              LEGACY<span>D</span>RIVE
            </h2>

            <p>
              A LegacyDrive oferece uma seleção exclusiva de veículos premium,
              unindo sofisticação, desempenho e experiências únicas.
            </p>
          </div>

          <div className="footer-column">
            <h3>Navegação</h3>
            <Link to="/">Início</Link>
            <Link to="/models">Veículos</Link>
            <Link to="/universe">Eventos</Link>
            <Link to="/contact">Contato</Link>
          </div>

          <div className="footer-column">
            <h3>Contato</h3>
            <p><MapPin size={16} /> Minas Gerais, Brasil</p>
            <p><Mail size={16} /> legacydrive@gmail.com</p>
            <p><Phone size={16} /> +55 31 99999-9999</p>
            <p><Clock size={16} /> Seg - Sex, 9h às 18h</p>
          </div>

          <div className="footer-column">
            <h3>Segurança</h3>
            <Link to="/termos">
              <FileText size={14} /> Termos de Serviço
            </Link>
            <Link to="/privacidade">
              <Shield size={14} /> Política de Privacidade
            </Link>
          </div>
        </div>

        <div className="footer-social">
          <a href="#"><Instagram size={18} /></a>
          <a href="#"><Facebook size={18} /></a>
          <a href="#"><Youtube size={18} /></a>
        </div>

        <div className="footer-bottom">
          <p>© 2026 LegacyDrive — Todos os direitos reservados</p>

          <button
            className="back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

