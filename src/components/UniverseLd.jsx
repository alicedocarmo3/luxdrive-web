import React from "react";
import "../styles/UniverseLd.css";
import { Link } from "react-router-dom";

const eventos = [
  {
    id: 1,
    nome: "Porsche Experience Night",
    data: "15 Agosto 2026",
    local: "São Paulo - SP",
    imagem: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200",
    descricao: "Uma noite exclusiva com modelos icônicos da Porsche como 911 Turbo S e Taycan."
  },
  {
    id: 2,
    nome: "Lamborghini Power Show",
    data: "02 Setembro 2026",
    local: "Curitiba - PR",
    imagem: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200",
    descricao: "Experiência com Lamborghini Aventador, Huracán e outros superesportivos extremos."
  },
  {
    id: 3,
    nome: "Ferrari Luxury Expo",
    data: "20 Outubro 2026",
    local: "Rio de Janeiro - RJ",
    imagem: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200",
    descricao: "Exposição exclusiva com Ferrari 488, SF90 e outros modelos lendários."
  },
  {
    id: 4,
    nome: "Pagani Hypercar Experience",
    data: "10 Novembro 2026",
    local: "Interlagos - SP",
    imagem: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200",
    descricao: "Veja de perto o luxo extremo da Pagani com modelos como Huayra e Zonda."
  },
  {
    id: 5,
    nome: "Rolls-Royce Prestige Event",
    data: "05 Dezembro 2026",
    local: "Balneário Camboriú - SC",
    imagem: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200",
    descricao: "Evento sofisticado com Rolls-Royce Phantom, Ghost e Cullinan."
  },
  {
    id: 6,
    nome: "Supercars Ultimate Meeting",
    data: "18 Janeiro 2027",
    local: "Belo Horizonte - MG",
    imagem: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200",
    descricao: "Encontro com os maiores supercarros do mundo: Ferrari, Lamborghini, Porsche e mais."
  }
];

export default function UniverseLd() {
  return (
    <div className="events-container">
      
      <header className="events-header">
        <h1>Universe LD</h1>
        <p>Eventos exclusivos para apaixonados por carros</p>
      </header>

      <section className="events-grid">
        {eventos.map((evento) => (
          <div className="event-card" key={evento.id}>
            
            <div className="event-image">
              <img src={evento.imagem} alt={evento.nome} />
            </div>

            <div className="event-content">
              <h2>{evento.nome}</h2>
              <p className="event-date">{evento.data}</p>
              <p className="event-location">{evento.local}</p>
              <p className="event-desc">{evento.descricao}</p>

              <Link to={`/evento/${evento.id}`}>
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