import "../styles/Contact.css";
import {
  MapPin,
  CalendarDays,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Youtube
} from "lucide-react";

export default function Contact() {

  function handleRoutes() {
    const address = "Av. Raja Gabáglia, 4343, Santa Lúcia, Belo Horizonte, MG";
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`, "_blank");
  }

  return (
    <section className="contact-page">

      <div className="contact-header">
        <div className="contact-line"></div>
      </div>

      <div className="contact-container">

        {/* MAPA */}
      <div className="contact-map">
  <iframe
    title="Localização Legacy Drive"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.1!2d-43.9731!3d-19.9621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.+Raja+Gab%C3%A1glia%2C+4343%2C+Santa+L%C3%BAcia%2C+Belo+Horizonte%2C+MG!5e0!3m2!1spt-BR!2sbr!4v1"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
  <div className="map-search">
    <span className="map-address">Av. Raja Gabáglia, 4343 — Santa Lúcia, BH</span>
    <button onClick={handleRoutes}>VER ROTAS ↗</button>
  </div>
</div>

        {/* DIREITA */}
        <div className="contact-right">

          <div className="top-info-grid">

            <div className="info-block">
              <div className="info-title">
                <MapPin size={17} />
                <h3>LOCALIZAÇÃO</h3>
              </div>
              <p>
                Av. Raja Gabáglia, 4343
                Santa Lúcia
                <br />
                Belo Horizonte - MG
              </p>
            </div>

            <div className="info-block">
              <div className="info-title">
                <CalendarDays size={17} />
                <h3>HORÁRIO DE FUNCIONAMENTO</h3>
              </div>
              <div className="hours">
                <div>
                  <span>Segunda à Sexta</span>
                  <strong>08h30 - 18h00</strong>
                </div>
                <div>
                  <span>Sábado</span>
                  <strong>09h00 - 13h00</strong>
                </div>
              </div>
            </div>

          </div>

          <div className="phone-box">
            <div className="info-title">
              <Phone size={17} />
              <h3>CONTATO</h3>
            </div>
            <h2>
              <span>(31)</span>
              93727-3800
            </h2>
          </div>

          <div className="social-list">

            <a href="mailto:contato@legacydrive.com.br" className="social-item">
              <div className="social-left">
                <Mail size={17} />
                <h4>E-MAIL</h4>
              </div>
              <div className="social-right">
                <span>contato@legacydrive.com.br</span>
                ↗
              </div>
            </a>

            <a href="https://wa.me/5531999021829" target="_blank" rel="noreferrer" className="social-item">
              <div className="social-left">
                <MessageCircle size={17} />
                <h4>WHATSAPP</h4>
              </div>
              <div className="social-right">
                <span>(31) 99902-1829</span>
                ↗
              </div>
            </a>

            <a href="https://www.tiktok.com/@LegacyDrive_oficial" target="_blank" rel="noreferrer" className="social-item">
              <div className="social-left">
                <MessageCircle size={17} />
                <h4>TIKTOK</h4>
              </div>
              <div className="social-right">
                <span>@LegacyDrive_oficial</span>
                ↗
              </div>
            </a>

            <a href="https://www.youtube.com/@legacydrive" target="_blank" rel="noreferrer" className="social-item">
              <div className="social-left">
                <Youtube size={17} />
                <h4>YOUTUBE</h4>
              </div>
              <div className="social-right">
                <span>@legacydrive</span>
                ↗
              </div>
            </a>

            <a href="https://www.instagram.com/LegacyDrive_oficial" target="_blank" rel="noreferrer" className="social-item">
              <div className="social-left">
                <Instagram size={17} />
                <h4>INSTAGRAM</h4>
              </div>
              <div className="social-right">
                <span>@LegacyDrive_oficial</span>
                ↗
              </div>
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}