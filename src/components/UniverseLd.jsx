import React, { useEffect, useState } from "react";
import "../styles/UniverseLd.css";
import { Link } from "react-router-dom";
import axios from "axios";

import porscheCenter from "../assets/cars/porsche/porscheCenter.jpg";
import lamborghiniArena from "../assets/cars/lamborghini/lamborghiniArena.jpg";
import ferrariExpo from "../assets/cars/ferrari/ferrariExpo.jpg";
import paganiUtopia from "../assets/cars/pagani/paganiUtopia.jpg";
import RollsRoyceEvent from "../assets/cars/RollsRoyce/RollsRoyceEvent.jpg";
import garageExpo from "../assets/cars/garagem/garageExpo.jpg";

const imagens = {
  porsche: porscheCenter,
  lambo: lamborghiniArena,
  ferrari: ferrariExpo,
  pagani: paganiUtopia,
  rolls: RollsRoyceEvent,
  ultimate: garageExpo,
};

const getImagem = (evento) => {
  const nome = evento.nome?.toLowerCase() || "";
  if (nome.includes("porsche"))    return porscheCenter;
  if (nome.includes("lamborghini")) return lamborghiniArena;
  if (nome.includes("ferrari"))    return ferrariExpo;
  if (nome.includes("pagani"))     return paganiUtopia;
  if (nome.includes("rolls"))      return RollsRoyceEvent;
  if (nome.includes("supercars") || nome.includes("ultimate")) return garageExpo;
  return null;
};

export default function UniverseLd() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/eventos"
      );
      console.log("EVENTOS:", response.data);

      setEventos(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  const limitarDescricao = (texto, limite = 150) => {
    if (!texto) return "";
    if (texto.length <= limite) return texto;
    return texto.slice(0, limite) + "...";
  };

  if (loading) {
    return <div>Carregando eventos...</div>;
  }

  return (
    <div className="events-container">
      <section className="events-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-title-group">
            <span className="hero-top-label">LEGACYDRIVE</span>
            <h1 className="hero-main-title">UNIVERSOLD</h1>
          </div>
        </div>
      </section>

      <section className="events-grid">
        {eventos.map((evento) => (
          <div className="event-card" key={evento.id}>
            <div className="event-image">
              <img src={getImagem(evento)} alt={evento.nome}/>
              <div className="image-overlay"></div>
            </div>

            <div className="event-content">
              <span className="event-date">{evento.data}</span>

              <h2>{evento.nome}</h2>

              <p className="event-location">
                <i className="location-icon"></i>
                {evento.local}
              </p>

              <p className="event-desc">
                {limitarDescricao(evento.descricao, 160)}
              </p>

              <Link to={`/evento/${evento._id}`}>
                <button className="event-button">
                  Ver Detalhes
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}