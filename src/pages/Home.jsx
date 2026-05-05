import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets
import bannerVideo from "../assets/banner.mp4";
import ferrari from "../assets/marcas/ferrari.jpg";
import lamborghini from "../assets/marcas/lamborghini.jpg";
import porsche from "../assets/marcas/porsche.jpg";
import bmw from "../assets/marcas/bmw.jpg";
import mercedes from "../assets/marcas/mercedes.jpg";
import audi from "../assets/marcas/astonmartin.jpg";
import mclaren from "../assets/marcas/mclaren.jpg";

// Carrossel
import revuelto from "../assets/carros/lamborghini-revuelto.jpg";
import porscheTurbo from "../assets/carros/Porsche-911-Turbo.jpg";
import sf90 from "../assets/carros/SF90.jpg";

// Premium
import showroom from "../assets/legacydrive.png";
import LeadCaptureSection from "../components/LeadCaptureSection";

const marcas = [
  { nome: "Ferrari", imagem: ferrari },
  { nome: "Lamborghini", imagem: lamborghini },
  { nome: "Porsche", imagem: porsche },
  { nome: "BMW", imagem: bmw },
  { nome: "Mercedes", imagem: mercedes },
  { nome: "Audi", imagem: audi },
  { nome: "McLaren", imagem: mclaren },
];

const novidades = [
  { nome: "Lamborghini Revuelto", imagem: revuelto },
  { nome: "Porsche 911 Turbo", imagem: porscheTurbo },
  { nome: "Ferrari SF90", imagem: sf90 }
];

export default function Home() {
  const [indexAtual, setIndexAtual] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexAtual((prev) => (prev + 1) % novidades.length);
    }, 15000);
    return () => clearInterval(intervalo);
  }, []);

  const slideAnterior = () => setIndexAtual((prev) => (prev - 1 + novidades.length) % novidades.length);
  const proximoSlide = () => setIndexAtual((prev) => (prev + 1) % novidades.length);

  const getPosicao = (index) => {
    if (index === indexAtual) return "card-center";
    if (index === (indexAtual - 1 + novidades.length) % novidades.length) return "card-left";
    if (index === (indexAtual + 1) % novidades.length) return "card-right";
    return "card-hidden";
  };

  const toggleVideo = () => {
    const video = document.getElementById("heroVideo");
    if (isPlaying) { video.pause(); } else { video.play(); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="home">
      <Navbar />

      {/* HERO — ESTILO PORSCHE PIXEL PERFECT */}
      <section className="hero-video-section">
        <video 
          id="heroVideo"
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
        >
          <source src={bannerVideo} type="video/mp4" />
        </video>
        
        {/* Overlay com degradê suave para integração com a navbar */}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text-box">
            <h1 className="porsche-title">CONDUZINDO A EXCELÊNCIA!</h1>
            <Link to="/cars" className="porsche-btn-main">
              Saiba mais
            </Link>
          </div>
        </div>

        {/* Botão de Controle (Pause/Play) */}
        <button className="video-control-btn" onClick={toggleVideo}>
          <div className={isPlaying ? "pause-icon" : "play-icon"}>
            {isPlaying ? (
              <><span /><span /></>
            ) : (
              <div className="play-shape" />
            )}
          </div>
        </button>
      </section>

      {/* MARCAS */}
      <section className="brands-title">
        <h2>
          Sua viagem com a LEGACY<span className="log">D</span>RIVE começa agora.
        </h2>
      </section>

      <section className="brands-section">
        {marcas.map((marca, index) => (
          <div className="brand-card" key={index}>
            <img src={marca.imagem} alt={marca.nome} />
          </div>
        ))}
      </section>

      {/* CARROSSEL NOVIDADES */}
      <section className="novidades-section">
        <h2>Novidades da LEGACY<span className="carr">D</span>RIVE</h2>
        <div className="carousel-container-3d">
          <button className="carousel-btn prev" onClick={slideAnterior}>❮</button>
          <div className="carousel-view">
            {novidades.map((item, index) => (
              <div key={index} className={`carousel-item-3d ${getPosicao(index)}`}>
                <img src={item.imagem} alt={item.nome} />
                <div className="carousel-caption">
                  <h3>{item.nome}</h3>
                  <p>Lançamento 2025</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-btn next" onClick={proximoSlide}>❯</button>
        </div>
      </section>

      {/* PREMIUM SECTION */}
      <section className="premium-transition-section">
        <div className="premium-left">
          <div className="vertical-brand">LEGACY DRIVE</div>
          <div className="premium-text">
            <h3>Conduzindo a</h3>
            <h2>EXCELÊNCIA</h2>
            <p>
              Somos referência em veículos premium e experiências exclusivas,
              oferecendo excelência, confiança e sofisticação em cada detalhe.
            </p>
            <button>CONHEÇA</button>
          </div>
        </div>
        <div className="premium-image-container">
          <img src={showroom} alt="Legacy Drive Showroom" />
        </div>
      </section>

      <LeadCaptureSection />
    </div>
  );
}