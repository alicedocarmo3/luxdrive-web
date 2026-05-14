// CarDetails.jsx

import { useParams } from "react-router-dom";
import { useState } from "react";

import { carros } from "../data/cars";

import "../styles/CarsDetails.css";

export default function CarDetails() {

  const { id } = useParams();

  const carro = carros.find(
    (c) => c.id === Number(id)
  );

  const [currentImage, setCurrentImage] = useState(0);

  if (!carro) {
    return (
      <div className="car-not-found">
        Carro não encontrado.
      </div>
    );
  }

  return (
    <div className="details-page">

      {/* HERO */}
      <section className="details-hero">

        <img
          src={carro.imagens[currentImage]}
          alt={carro.modelo}
          className="hero-image"
        />

        <div className="hero-overlay" />

        <div className="hero-content">

          <span className="details-year">
            {carro.ano}
          </span>

          <h1>
            {carro.modelo}
          </h1>

          <p>
            Performance. Luxo. Exclusividade.
          </p>

          <button className="btn-contact">
            SOLICITAR VEÍCULO
          </button>

        </div>

      </section>

      {/* THUMBNAILS */}
      <section className="thumbs-wrapper">

        {carro.imagens.map((img, index) => (

          <img
            key={index}
            src={img}
            alt=""
            className={`thumb ${
              currentImage === index
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentImage(index)
            }
          />

        ))}

      </section>

      {/* INFO */}
      <section className="details-info">

        <div className="info-left">

          <span className="subtitle">
            LEGACY DRIVE
          </span>

          <h2>
            {carro.modelo}
          </h2>

          <p className="description">
            Um superesportivo criado para
            entregar o máximo desempenho,
            luxo e presença nas ruas.
            Design agressivo, acabamento
            premium e tecnologia de ponta
            em cada detalhe.
          </p>

        </div>

        <div className="info-right">

          <div className="spec-card">
            <span>Potência</span>
            <strong>
              {carro.potencia}
            </strong>
          </div>

          <div className="spec-card">
            <span>Motor</span>
            <strong>
              {carro.motor}
            </strong>
          </div>

          <div className="spec-card">
            <span>Câmbio</span>
            <strong>
              {carro.cambio}
            </strong>
          </div>

          <div className="spec-card">
            <span>Cor</span>
            <strong>
              {carro.cor}
            </strong>
          </div>

          <div className="spec-card">
            <span>Blindado</span>
            <strong>
              {carro.blindado
                ? "Sim"
                : "Não"}
            </strong>
          </div>

          <div className="spec-card">
            <span>KM</span>
            <strong>
              {carro.km.toLocaleString("pt-BR")}
            </strong>
          </div>

        </div>

      </section>

      {/* PREÇO */}
      <section className="price-section">

        <span>PREÇO</span>

        <h2>
          R$ {carro.preco.toLocaleString("pt-BR")}
        </h2>

      </section>

      {/* FORM */}
      <section className="contact-section">

        <div className="contact-box">

          <span className="subtitle">
            SOLICITAÇÃO
          </span>

          <h2>
            Solicite este veículo
          </h2>

          <form className="contact-form">

            <input
              type="text"
              placeholder="Seu nome"
            />

            <input
              type="email"
              placeholder="Seu e-mail"
            />

            <input
              type="tel"
              placeholder="Seu telefone"
            />

            <textarea
              placeholder={`Olá, tenho interesse no ${carro.modelo}.`}
            />

            <button type="submit">
              ENVIAR SOLICITAÇÃO
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}