import React from "react";
import "../styles/UniverseLd.css"; // Se o CSS estiver na pasta styles
import { Link } from "react-router-dom";
import { eventos } from "../data/eventosData"; // ajuste o caminho se necessário

export default function UniverseLd() {
  return (
    <div className="events-container">
      {/* BANNER HERO - ESTILO POLO STORICO */}
      <section className="events-hero">
        <div className="hero-overlay"></div>

        {/* Substitua a parte do hero-content por esta estrutura */}
        <div className="hero-content">
         <div className="hero-title-group">
           <span className="hero-top-label">LEGACYDRIVE</span>
           <h1 className="hero-main-title">UNIVERSOLD</h1>
          </div>
        </div> 
      </section>

      {/* GRID DE EVENTOS */}
      <section className="events-grid">
        {eventos.map((evento) => (
          <div className="event-card" key={evento.id}>
            <div className="event-image">
              <img src={evento.imagem} alt={evento.nome} />
              <div className="image-overlay"></div>
            </div>

            <div className="event-content">
              <span className="event-date">{evento.data}</span>
              <h2>{evento.nome}</h2>
              <p className="event-location">
                <i className="location-icon"></i> {evento.local}
              </p>
              <p className="event-desc">{evento.descricao}</p>

              <Link to={`/evento/${evento.id}`}>
                <button className="event-button">Ver Detalhes</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}