import React from 'react';
import "../styles/AboutUs.css";
import Navbar from "../components/Navbar";


const HistorySection = ({ year, title, description, imageUrl, reverse }) => (
  <div className={`history-row ${reverse ? 'row-reverse' : ''}`}>
    <div className="history-image-box">
      <img src={imageUrl} alt={title} className="history-img" />
      <div className="geometric-accent"></div>
    </div>
    
    <div className="history-text-content">
      <div className="timeline-header">
        <span className="year-huge">{year}</span>
        <div className="accent-bar"></div>
      </div>
      <h2 className="history-section-title">{title}</h2>
      <p className="history-description">{description}</p>
    </div>
  </div>
);

const AboutUs = () => {
  const historyData = [
    {
      year: "2009",
      title: "O Nascimento de um Mito",
      description: "A Legacy Drive surgiu de uma visão audaciosa: transformar a paixão por supercarros em um padrão de excelência sem precedentes no Brasil. Nascemos para ser o ponto de encontro entre colecionadores exigentes e as obras-primas da engenharia mundial, onde cada veículo é selecionado como uma peça de arte única. Redefinimos o conceito de atendimento premium, elevando a aquisição de um automóvel a um rito de passagem para o restrito universo da alta performance. Na Legacy Drive, você não apenas adquire um carro de luxo, você assume o controle de um legado imortal.",
      imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000",
    },
    {
      year: "2015",
      title: "Expansão Sem Fronteiras",
      description: "Rompemos as barreiras continentais. Criamos o canal direto de importação que redefiniu o mercado de luxo nacional, conectando Maranello diretamente aos nossos clientes. Anulamos as distâncias geográficas para garantir que o lançamento mundial de hoje esteja na sua garagem amanhã. Nossa rede logística opera com a precisão de um cronógrafo suíço, assegurando que a exclusividade não conheça limites ou burocracias. Na Legacy Drive, o mundo automobilístico não tem fronteiras; ele tem um destino certo.",
      imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000",
    },
    {
      year: "2022",
      title: "O Padrão Legacy",
      description: "Consolidação da maior curadoria de hipercarros do país. Introduzimos critérios de certificação técnica que se tornaram o benchmark de confiança no setor. Nossa inspeção vai além da superfície, analisando cada componente com a precisão exigida pelos fabricantes originais. Criamos um selo de procedência que garante não apenas a performance, mas a integridade histórica de cada obra-prima em nosso acervo. Na Legacy Drive, a tranquilidade do cliente é o alicerce sobre o qual construímos o futuro do mercado de alto luxo.",
      imageUrl: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000",
    },
    {
      year: "2025",
      title: "Transmissão de Elite",
      description: "Onde a inteligência do câmbio automático encontra a força bruta do motor. Dominamos a engenharia das transmissões de dupla embreagem que antecipam seus desejos, entregando trocas imperceptíveis e uma aceleração visceral. Elevamos o controle a um novo patamar, onde cada mudança de marcha é uma nota na sinfonia da velocidade. Aqui, a tecnologia não substitui o prazer de acelerar; ela o torna absoluto, garantindo que você esteja sempre na faixa de torque perfeita para dominar o asfalto.",
      imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      {/* BANNER PRINCIPAL COM ALINHAMENTO IGUAL A MODELS */}
      <section className="about-hero">
        <div className="hero-video-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600" 
          className="hero-background-img"
          alt="Legacy Hero"
        />
        <div className="hero-text">
          <p>LEGACY DRIVE</p>
          <h1>HISTÓRIA</h1>
        </div>
      </section>

      {/* SEÇÃO INTRO */}
      <section className="about-intro-section">
        <div className="intro-container">
          <p>
            Fundada com o propósito de elevar a experiência automotiva, a <strong>Legacy Drive</strong> tornou-se a curadoria mais exclusiva de veículos de alta performance no país.
          </p>
          <p>
            Nossa trajetória é marcada pela busca incessante pelo extraordinário. Com formação técnica especializada e uma paixão que corre nas veias, o que começou como um sonho de entusiastas evoluiu para uma estrutura global de importação e consultoria, trazendo para garagens brasileiras as lendas que definem eras na indústria automobilística.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
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