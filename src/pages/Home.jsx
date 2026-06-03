import "../styles/Home.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// VIDEO
import bannerVideo from "../assets/bannervideo/videobanner.mp4";

// Carrossel
import revuelto from "../assets/carros/lamborghini-revuelto.jpg";
import porscheTurbo from "../assets/carros/Porsche-911-Turbo.jpg";
import sf90 from "../assets/carros/SF90.jpg";

// Premium
import showroom from "../assets/legacydrive.png";

import LeadCaptureSection from "../components/LeadCaptureSection";

import { getMarcas } from "../services/marcaService";

export default function Home() {

  const navigate = useNavigate();

  const [indexAtual, setIndexAtual] = useState(0);

  const [marcasData, setMarcasData] = useState([]);

  // ============================================
  // BUSCAR MARCAS
  // ============================================

useEffect(() => {

  const carregarMarcas = async () => {

    try {

      const marcas = await getMarcas();

      setMarcasData(marcas);

    } catch (error) {

      console.error("Erro ao carregar marcas:", error);

    }

  };

  carregarMarcas();

}, []);

  // ============================================
  // NOVIDADES
  // ============================================

  const novidades = [
    {
      nome: "Lamborghini Revuelto",
      imagem: revuelto,
    },
    {
      nome: "Porsche 911 Turbo",
      imagem: porscheTurbo,
    },
    {
      nome: "Ferrari SF90",
      imagem: sf90,
    },
  ];

  // ============================================
  // AUTO PLAY CARROSSEL
  // ============================================

  useEffect(() => {

    const intervalo = setInterval(() => {

      setIndexAtual((prev) =>
        (prev + 1) % novidades.length
      );

    }, 15000);

    return () => clearInterval(intervalo);

  }, [novidades.length]);

  // ============================================
  // SLIDES
  // ============================================

  const slideAnterior = () => {

    setIndexAtual((prev) =>
      (prev - 1 + novidades.length) %
      novidades.length
    );

  };

  const proximoSlide = () => {

    setIndexAtual((prev) =>
      (prev + 1) % novidades.length
    );

  };

  // ============================================
  // POSIÇÕES
  // ============================================

  const getPosicao = (index) => {

    if (index === indexAtual)
      return "card-center";

    if (
      index ===
      (indexAtual - 1 + novidades.length) %
        novidades.length
    ) {
      return "card-left";
    }

    if (
      index ===
      (indexAtual + 1) % novidades.length
    ) {
      return "card-right";
    }

    return "card-hidden";

  };

  // ============================================
  // IR PARA MARCA
  // ============================================

  const irParaMarca = (marcaId) => {

    navigate(`/models?marca=${marcaId}`);

  };

  // ============================================
  // JSX
  // ============================================

  return (

    <div className="home">

      {/* HERO CINEMATIC */}
      <section className="hero-video-section">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source
            src={bannerVideo}
            type="video/mp4"
          />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-text-box">

            <h1 className="porsche-title">
              CONDUZINDO
              <br />
              a excelência.
            </h1>

            <Link
              to="/about"
              className="porsche-btn-main"
            >
              Saiba mais
            </Link>

          </div>

        </div>

      </section>

      {/* TITULO */}
      <section className="brands-title">

        <h2>
          Sua viagem com a LEGACY
          <span className="log">D</span>
          RIVE começa agora.
        </h2>

      </section>

      {/* MARCAS */}
      <section className="brands-section">

        {marcasData.map((marca) => (

          <div
            className="brand-card"
            key={marca.id}
            onClick={() =>
              irParaMarca(marca.id)
            }
          >

            <img
              src={marca.linkLogo}
              alt={marca.nome}
            />

          </div>

        ))}

      </section>

      {/* NOVIDADES */}
      <section className="novidades-section">

        <h2>
          Novidades da LEGACY
          <span className="carr">D</span>
          RIVE
        </h2>

        <div className="carousel-container-3d">

          <button
            className="carousel-btn prev"
            onClick={slideAnterior}
          >
            ❮
          </button>

          <div className="carousel-view">

            {novidades.map((item, index) => (

              <div
                key={index}
                className={`carousel-item-3d ${getPosicao(index)}`}
              >

                <img
                  src={item.imagem}
                  alt={item.nome}
                />

                <div className="carousel-caption">

                  <h3>{item.nome}</h3>

                  <p>
                    Lançamento 2025
                  </p>

                </div>

              </div>

            ))}

          </div>

          <button
            className="carousel-btn next"
            onClick={proximoSlide}
          >
            ❯
          </button>

        </div>

      </section>

      {/* PREMIUM */}
      <section className="premium-transition-section">

        <div className="premium-left">

          <div className="vertical-brand">
            LEGACY DRIVE
          </div>

          <div className="premium-text">

            <h3>Conduzindo a</h3>

            <h2>EXCELÊNCIA</h2>

            <p>
              Somos referência em veículos
              premium e experiências exclusivas,
              oferecendo excelência,
              confiança e sofisticação em
              cada detalhe.
            </p>

            <button>
              CONHEÇA
            </button>

          </div>

        </div>

        <div className="premium-image-container">

          <img
            src={showroom}
            alt="Legacy Drive Showroom"
          />

        </div>

      </section>

      <LeadCaptureSection />

    </div>

  );

}