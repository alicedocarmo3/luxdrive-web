import "../styles/Contact.css";

import mapa from "../assets/mapa.png";

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

  return (

    <section className="contact-page">

      {/* TOPO */}
      <div className="contact-header">

        

        <div className="contact-line"></div>

      </div>

      {/* CONTAINER */}
      <div className="contact-container">

        {/* MAPA */}
        <div className="contact-map">

          <img
            src={mapa}
            alt="Mapa"
          />

          {/* BARRA */}
          <div className="map-search">

            <input
              type="text"
              placeholder="34525-320"
            />

            <button>

              VER ROTAS ↗

            </button>

          </div>

        </div>

        {/* DIREITA */}
        <div className="contact-right">

          {/* GRID TOP */}
          <div className="top-info-grid">

            {/* LOCALIZAÇÃO */}
            <div className="info-block">

              <div className="info-title">

                <MapPin size={17} />

                <h3>LOCALIZAÇÃO</h3>

              </div>

              <p>
                Av. José de Souza Campos, 1919
                <br />
                (Via Norte Sul) Campinas - SP
              </p>

            </div>

            {/* HORÁRIO */}
            <div className="info-block">

              <div className="info-title">

                <CalendarDays size={17} />

                <h3>
                  HORÁRIO DE FUNCIONAMENTO
                </h3>

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

          {/* CONTATO */}
          <div className="phone-box">

            <div className="info-title">

              <Phone size={17} />

              <h3>CONTATO</h3>

            </div>

            <h2>

              <span>019</span>
              3727-3800

            </h2>

          </div>

          {/* LISTA */}
          <div className="social-list">

            <a href="#" className="social-item">

              <div className="social-left">

                <Mail size={17} />

                <h4>E-MAIL</h4>

              </div>

              <div className="social-right">

                <span>
                  contato@andreveiculos.com.br
                </span>

                ↗

              </div>

            </a>

            <a href="#" className="social-item">

              <div className="social-left">

                <MessageCircle size={17} />

                <h4>WHATSAPP</h4>

              </div>

              <div className="social-right">

                <span>
                  (019) 99902-1829
                </span>

                ↗

              </div>

            </a>

            <a href="#" className="social-item">

              <div className="social-left">

                <MessageCircle size={17} />

                <h4>TIKTOK</h4>

              </div>

              <div className="social-right">

                <span>
                  @andreveiculos_oficial
                </span>

                ↗

              </div>

            </a>

            <a href="#" className="social-item">

              <div className="social-left">

                <Youtube size={17} />

                <h4>YOUTUBE</h4>

              </div>

              <div className="social-right">

                <span>
                  @andreveiculos
                </span>

                ↗

              </div>

            </a>

            <a href="#" className="social-item">

              <div className="social-left">

                <Instagram size={17} />

                <h4>INSTAGRAM</h4>

              </div>

              <div className="social-right">

                <span>
                  @andreveiculos
                </span>

                ↗

              </div>

            </a>

          </div>

        </div>

      </div>

    </section>

  );

}