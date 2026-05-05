import React from 'react';
import "../styles/AboutUs.css";
import Navbar from "../components/Navbar";

const HistorySection = ({ year, title, description, imageUrl, reverse }) => (
  <div className={`history-row ${reverse ? 'row-reverse' : ''}`}>
    <div className="history-image-box">
      <img src={imageUrl} alt={title} className="history-img" />
      <div className="hexagon-detail"></div>
    </div>
    
    <div className="history-text-content">
      <div className="year-badge">
        <span className="year-number">{year}</span>
        <div className="yellow-line"></div>
      </div>
      <h2 className="history-section-title">{title}</h2>
      <p className="history-description">{description}</p>
      <button className="lamborghini-btn">
        <span>Descobrir mais</span>
      </button>
    </div>
  </div>
);

const AboutUs = () => {
  const historyData = [
    {
      year: "2009",
      title: "A Gênese da Legacy Drive",
      description: "Nascida da paixão pura por engenharia de precisão, a Legacy Drive surgiu como um clube privado para colecionadores de supercarros em Minas Gerais, antes de se tornar a maior curadoria de luxo do país.",
      imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000",
    },
    {
      year: "2015",
      title: "Expansão Continental",
      description: "Quebramos as barreiras geográficas. Com parcerias diretas em Sant'Agata Bolognese e Maranello, trouxemos unidades exclusivas que antes eram inacessíveis ao mercado latino-americano.",
      imageUrl: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000",
    },
    {
        year: "2020",
        title: "O Futuro Híbrido",
        description: "Hoje, a Legacy Drive lidera a transição para a performance sustentável, oferecendo curadoria especializada em hipercarros híbridos e elétricos de alta voltagem.",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600",
    },
    {
        year: "2026",
        title: "O Futuro Híbrido",
        description: "Hoje, a Legacy Drive lidera a transição para a performance sustentável, oferecendo curadoria especializada em hipercarros híbridos e elétricos de alta voltagem.",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600",
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      {/* HERO SECTION — ESTILO LAMBORGHINI */}
      <section className="about-hero">
        <div className="hero-video-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600" 
          className="hero-background-img"
          alt="Legacy History"
        />
        <div className="hero-content">
            <h1 className="hero-title">História</h1>
            <p className="hero-subtitle">LEGACY DRIVE COMPANY</p>
        </div>
        <div className="hero-scroll-indicator"></div>
      </section>

      {/* TIMELINE SECTION */}
      <main className="history-container">
        {historyData.map((item, index) => (
          <HistorySection 
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            reverse={index % 2 !== 0}
          />
        ))}
      </main>
    </div>
  );
};

export default AboutUs;