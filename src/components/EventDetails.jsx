import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import "../styles/EventDetails.css";


// SERVICE
import { comprarIngresso } from "../services/eventoService";
// NÃO USA MAIS DATA LOCAL
// import { eventos } from "../data/eventosData";

export default function EventDetails() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [metodo, setMetodo] = useState("cartao");
  const [copiadoPix, setCopiadoPix] = useState(false);

  const [cartao, setCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: ""
  });

  const [dadosComprador, setDadosComprador] = useState({
    primeiroNome: "",
    sobrenome: "",
    email: "",
    telefone: ""
  });

  const evento = eventos.find(e => e.id === Number(id));

  if (!evento) return <h1 className="not-found">Evento não encontrado</h1>;

  // Verificação de Strings para identificação de layout/tema
  const nomeMinusculo = evento.nome?.toLowerCase() || "";
  const isLambo = nomeMinusculo.includes("lamborghini");
  const isFerrari = nomeMinusculo.includes("ferrari");
  const isPagani = nomeMinusculo.includes("pagani");
  const isRolls = nomeMinusculo.includes("rolls-royce") || nomeMinusculo.includes("rolls royce");
  // Nova identificação: Verifica se o evento se refere ao Ultimate Supercar Garage de Paris
  const isUltimateParis = nomeMinusculo.includes("ultimate meeting") || nomeMinusculo.includes("ultimate supercar garage") || nomeMinusculo.includes("paris");
  
  // O Porsche continua sendo o fallback padrão caso nenhum outro seja correspondido
  const isPorsche = !isLambo && !isFerrari && !isPagani && !isRolls && !isUltimateParis;

  // Definição da classe de tema base do container superior
  let themeClass = "porsche-theme";
  if (isLambo) themeClass = "lambo-theme";
  if (isFerrari) themeClass = "ferrari-theme";
  if (isPagani) themeClass = "pagani-theme";
  if (isRolls) themeClass = "rolls-theme";
  if (isUltimateParis) themeClass = "ultimate-theme"; // Novo tema injetado no CSS global

  // Configuração dinâmica dos códigos de pagamento PIX
  let pixCode = "000201PIX-UNIVERSE-LD-123456";
  if (isLambo) pixCode = "000201PIX-LAMBO-ARENA-2026";
  if (isFerrari) pixCode = "000201PIX-FERRARI-GRAMADO-2026";
  if (isPagani) pixCode = "000201PIX-PAGANI-MOTORVALLEY-2026";
  if (isRolls) pixCode = "000201PIX-ROLLSROYCE-PRESTIGE-2026";
  if (isUltimateParis) pixCode = "000201PIX-ULTIMATESUPERCAR-PARIS-2027";

  const boletoCode = "341917900101043510047910201500089370000002000";

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiadoPix(true);
    setTimeout(() => setCopiadoPix(false), 3000);
  };

  const handleCompra = () => {
    if (isLambo) {
      alert("Compra realizada com sucesso para a Lamborghini Arena!");
    } else if (isFerrari) {
      alert("Compra realizada com sucesso para o Ferrari Luxury Expo Gramado!");
    } else if (isPagani) {
      alert("Acesso VIP confirmado para o Pagani Hypercar Experience!");
    } else if (isRolls) {
      alert("Sua solicitação de reserva privada para o Rolls-Royce Prestige Event foi enviada para análise do comitê executivo.");
    } else if (isUltimateParis) {
      alert("Seu bilhete oficial para o Ultimate Supercar Garage Paris foi emitido com sucesso! Verifique seu e-mail.");
    } else {
      alert("Compra realizada com sucesso para o Porsche Experience!");
    }
    setOpen(false);
  };

  return (
    <div className={`details-container ${themeClass}`}>
      
      {/* =========================================================================
    INFORMAÇÕES DO EVENTO DA PORSCHE
=========================================================================== */}
{isPorsche && (
  <div className="porsche-layout">

    {/* BOTÃO VOLTAR */}
    <button
      className="back-button-universeld"
      onClick={() => window.location.href = "/universeld"}
    >
      ← Voltar para UniverseLD
    </button>

    <section className="event-header">
      <img src={evento.imagem} alt={evento.nome} className="details-image" />
      <div className="header-overlay">
        <div className="header-text">
          <span className="label-porsche">PORSCHE EXPERIENCE</span>
          <h1 className="porsche-title">{evento.nome}</h1>
        </div>
      </div>
    </section>

    <section className="info-bar-porsche">
      <div className="info-item">
        <span className="info-label">LOCALIZAÇÃO</span>
        <span className="info-value">{evento.local || "Porsche Center, SP"}</span>
      </div>
      <div className="info-item">
        <span className="info-label">PREÇO</span>
        <span className="info-value">R$ 4.500,00</span>
      </div>
      <div className="info-item">
        <span className="info-label">INGRESSOS</span>
        <span className="info-value">12 VAGAS RESTANTES</span>
      </div>
      <div className="info-item">
        <span className="info-label">DURAÇÃO</span>
        <span className="info-value">90 MINUTOS</span>
      </div>
    </section>

    <section className="main-content">
      <div className="description-section">
        <h2 className="section-title-porsche">DOMINE A PERFORMANCE</h2>
        <p className="main-desc">
          Sinta a essência da engenharia alemã. O Porsche Experience coloca você no cockpit
          dos modelos mais icônicos do mundo para um treinamento de alta performance.
          Sob a supervisão de instrutores certificados, você aprenderá técnicas de
          frenagem de limite, transferência de peso e controle de tração.
        </p>

        <div className="details-list-porsche">
          <h3>O que está incluso:</h3>
          <ul>
            <li>Instrução 1-para-1 com pilotos profissionais.</li>
            <li>Acesso a toda a linha 911 e 718 Cayman.</li>
            <li>Sessão de telemetria e análise de dados.</li>
            <li>Almoço executivo no Lounge VIP.</li>
          </ul>
        </div>
      </div>

      <div className="booking-card-porsche">
        <div className="price-tag-porsche">
          <small>A partir de</small>
          <span>R$ 4.500</span>
        </div>

        <button
          className="buy-button-porsche"
          onClick={() => setOpen(true)}
        >
          RESERVAR EXPERIÊNCIA
        </button>

        <p className="tax-notice-porsche">
          Impostos inclusos. Sujeito a disponibilidade de agenda.
        </p>
      </div>
    </section>
  </div>
)}

      {/* =========================================================================
          INFORMAÇÕES DO EVENTO DA LAMBORGHINI
          ========================================================================= */}
      {isLambo && (
        <div className="lambo-layout">
          <section className="event-header">
            <img src={evento.imagem} alt={evento.nome} className="details-image" />
            <div className="header-overlay">
              <div className="header-text">
                <span className="label-lambo">AUTOMOBILI LAMBORGHINI</span>
                <h1 className="lambo-title">LAMBORGHINI ARENA</h1>
                <p className="subtitle-lambo">THE WORLD OF SANT'AGATA AT IMOLA CIRCUIT</p>
              </div>
            </div>
          </section>

          <section className="info-bar-lambo">
            <div className="info-item">
              <span className="info-label">LOCALIZAÇÃO</span>
              <span className="info-value">{evento.local || "Autódromo de Imola, Itália"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">PREÇO</span>
              <span className="info-value">R$ 2.850,00</span>
            </div>
            <div className="info-item">
              <span className="info-label">INGRESSOS</span>
              <span className="info-value">ÚLTIMOS PASSES</span>
            </div>
            <div className="info-item">
              <span className="info-label">DURAÇÃO</span>
              <span className="info-value">2 DIAS</span>
            </div>
          </section>

          <section className="main-content">
            <div className="description-section">
              <h2 className="section-title-lambo">UMA JORNADA ALÉM DA VELOCIDADE</h2>
              <p className="main-desc">
                A Lamborghini Arena não é apenas um evento de pista, é a celebration máxima do 
                DNA da marca. Pela primeira vez, o universo de Sant'Agata Bolognese se reúne 
                em Imola para um festival de performance, design e inovação. Prepare-se para 
                presenciar a história sendo escrita.
              </p>
              <div className="highlights-grid-lambo">
                <div className="highlight-item-lambo">
                  <h3>SQUADRA CORSE</h3>
                  <p>Desfile dos modelos Essenza SCV12 e a adrenalina do Super Trofeo.</p>
                </div>
                <div className="highlight-item-lambo">
                  <h3>AD PERSONAM</h3>
                  <p>Explore o estúdio de personalização e crie sua Lamborghini única.</p>
                </div>
              </div>
            </div>

            <div className="booking-card-lambo">
              <div className="price-tag-lambo">
                <small>ENTRY PASS</small>
                <span>R$ 2.850</span>
              </div>
              <button className="buy-button-lambo" onClick={() => setOpen(true)}>
                ADQUIRIR PASSAPORTE
              </button>
              <div className="lambo-badges">
                <span>● 2 DIAS DE ACESSO</span>
                <span>● VIP LOUNGE</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          INFORMAÇÕES DO EVENTO DA FERRARI
          ========================================================================= */}
      {isFerrari && (
        <div className="ferrari-layout">
          <section className="event-header">
            <img src={evento.imagem} alt={evento.nome} className="details-image" />
            <div className="header-overlay">
              <div className="header-text">
                <span className="label-ferrari">SCUDERIA FERRARI EXCLUSIVITY</span>
                <h1 className="ferrari-title">FERRARI LUXURY EXPO</h1>
                <p className="subtitle-ferrari">IL CAVALLINO RAMPANTE NAS SERRAS GAÚCHAS</p>
              </div>
            </div>
          </section>

          <section className="info-bar-ferrari">
            <div className="info-item">
              <span className="info-label">LOCALIZAÇÃO</span>
              <span className="info-value">{evento.local || "Gramado, RS - Brasil"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">PREÇO</span>
              <span className="info-value">R$ 6.200,00</span>
            </div>
            <div className="info-item">
              <span className="info-label">INGRESSOS</span>
              <span className="info-value">LOTE EXCLUSIVO LIMITADO</span>
            </div>
            <div className="info-item">
              <span className="info-label">DURAÇÃO</span>
              <span className="info-value">3 DIAS DE EXPOSIÇÃO</span>
            </div>
          </section>

          <section className="main-content">
            <div className="description-section">
              <h2 className="section-title-ferrari">A ESSÊNCIA DE MARANELLO EM GRAMADO</h2>
              <p className="main-desc">
                O Ferrari Luxury Expo traz ao coração de Gramado uma imersão sem precedentes no universo da 
                marca mais lendária do automobilismo. Uma exibição histórica reunindo hipercarros, clássicos 
                de colecionadores e os últimos lançamentos equipados com motores V8 e V12.
              </p>
              <div className="details-list-ferrari">
                <h3>Atrações Exclusivas:</h3>
                <ul>
                  <li>Exposição de supercarros históricos e edições limitadas (Icona Series).</li>
                  <li>Simuladores profissionais oficiais da Scuderia Ferrari de Fórmula 1.</li>
                  <li>Painéis com especialistas em restauração vindos diretamente da Itália.</li>
                  <li>Degustação de alta gastronomia italiana harmonizada no Lounge Cavallino.</li>
                </ul>
              </div>
            </div>

            <div className="booking-card-ferrari">
              <div className="price-tag-ferrari">
                <small>GOLDEN PASS</small>
                <span>R$ 6.200</span>
              </div>
              <button className="buy-button-ferrari" onClick={() => setOpen(true)}>
                RESERVAR PASSAPORTE LUXO
              </button>
              <p className="tax-notice-ferrari">Sujeito aos critérios de admissão do clube de colecionadores.</p>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          INFORMAÇÕES DO EVENTO DA PAGANI
          ========================================================================= */}
      {isPagani && (
        <div className="pagani-layout">
          <section className="event-header">
            <img src={evento.imagem} alt={evento.nome} className="details-image" />
            <div className="header-overlay">
              <div className="header-text">
                <span className="label-pagani">PAGANI AUTOMOBILI ART</span>
                <h1 className="pagani-title">PAGANI HYPERCAR EXPERIENCE</h1>
                <p className="subtitle-pagani">MOTOR VALLEY FEST — MODENA & FORMIGINE</p>
              </div>
            </div>
          </section>

          <section className="info-bar-pagani">
            <div className="info-item">
              <span className="info-label">LOCALIZAÇÃO</span>
              <span className="info-value">{evento.local || "Modena / Emília-Romanha, Itália"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">PREÇO</span>
              <span className="info-value">R$ 8.900,00</span>
            </div>
            <div className="info-item">
              <span className="info-label">INGRESSOS</span>
              <span className="info-value">PASSES VIP ATELIER DISPONÍVEIS</span>
            </div>
            <div className="info-item">
              <span className="info-label">DURAÇÃO</span>
              <span className="info-value">4 DIAS DE EXPERIÊNCIA</span>
            </div>
          </section>

          <section className="main-content">
            <div className="description-section">
              <h2 className="section-title-pagani">CRAFTED SCIENCE: ARTE E CIÊNCIA EM MOVIMENTO</h2>
              <p className="main-desc">
                Participe do prestigiado Motor Valley Fest ao lado da equipe de design da Pagani. Uma oportunidade única de 
                vivenciar de perto a filosofia renascentista de Horacio Pagani. O evento reúne engenharia de materiais compósitos e 
                la exclusividade máxima de hipercarros esculpidos à mão.
              </p>
              <div className="highlights-grid-pagani">
                <div className="highlight-item-pagani">
                  <h3>UTOPIA ROADSTER</h3>
                  <p>Exposição exclusiva na Piazza Roma em Modena. A pureza da engenharia en plein air limitada a 130 unidades.</p>
                </div>
                <div className="highlight-item-pagani">
                  <h3>HUAYRA CODALUNGA</h3>
                  <p>Uma obra da divisão Grandi Complicazioni baseada nos anos 60, exposta em Formigine. Apenas 5 exemplares no mundo.</p>
                </div>
              </div>
            </div>

            <div className="booking-card-pagani">
              <div className="price-tag-pagani">
                <small>ULTRA VIP ALL-ACCESS</small>
                <span>R$ 8.900</span>
              </div>
              <button className="buy-button-pagani" onClick={() => setOpen(true)}>
                SOLICITAR CREDENCIAL PAGANI
              </button>
              <div className="pagani-badges">
                <span>● TOUR NO ATELIER DE SAN CESARIO INCLUSO</span>
                <span>● ALMOÇO VIP COM ENGENHEIROS DA MARCA</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          INFORMAÇÕES DO EVENTO DA ROLLS-ROYCE
          ========================================================================= */}
      {isRolls && (
        <div className="rolls-layout">
          <section className="event-header">
            <img src={evento.imagem} alt={evento.nome} className="details-image" />
            <div className="header-overlay">
              <div className="header-text">
                <span className="label-rolls">ROLLS-ROYCE MOTOR CARS</span>
                <h1 className="rolls-title">PRESTIGE EXPERIENCE</h1>
                <p className="subtitle-rolls">INSPIRING GREATNESS — BY INVITATION ONLY</p>
              </div>
            </div>
          </section>

          <section className="info-bar-rolls">
            <div className="info-item">
              <span className="info-label">LOCALIZAÇÃO</span>
              <span className="info-value">{evento.local || "Goodwood / Villa d'Este"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">DISPONIBILIDADE</span>
              <span className="info-value">RESTRITO A CONVIDADOS</span>
            </div>
            <div className="info-item">
              <span className="info-label">CATEGORIA</span>
              <span className="info-value">ULTRA-LUXO PRIVATE</span>
            </div>
            <div className="info-item">
              <span className="info-label">DURAÇÃO</span>
              <span className="info-value">CALENDÁRIO EXCLUSIVO</span>
            </div>
          </section>

          <section className="main-content">
            <div className="description-section">
              <h2 className="section-title-rolls">EXPERIÊNCIAS SOB MEDIDA E PRIVADAS</h2>
              <p className="main-desc">
                A Rolls-Royce Motor Cars opera em um patamar de ultra-luxo, onde seus eventos são 
                experiências sob medida, fechadas para um grupo estrito de clientes, colecionadores 
                selecionados e entusiastas da alta costura automotiva. Participe de ecossistemas únicos de networking e arte.
              </p>
            </div>

            <div className="booking-card-rolls">
              <div className="price-tag-rolls">
                <small>MEMBERSHIP PASS</small>
                <span>PRIVATE ACCESS</span>
              </div>
              <button className="buy-button-rolls" onClick={() => setOpen(true)}>
                SOLICITAR ADMISSÃO PRIVADA
              </button>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          NOVO: INFORMAÇÕES DO ULTIMATE SUPERCAR GARAGE (PARIS, FRANÇA)
          ========================================================================= */}
      {isUltimateParis && (
        <div className="ultimate-layout">
          {/* HEADER (HERO) */}
          <section className="event-header">
            <img src={evento.imagem || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200"} alt={evento.nome} className="details-image" />
            <div className="header-overlay">
              <div className="header-text">
                <span className="label-ultimate">THE SUPERCARS ULTIMATE MEETING</span>
                <h1 className="ultimate-title">ULTIMATE SUPERCAR GARAGE</h1>
                <p className="subtitle-ultimate">IN COLLABORATION WITH RÉTROMOBILE — PARIS EXPO</p>
              </div>
            </div>
          </section>

          {/* BARRA DE INFORMAÇÕES RÁPIDAS (DADOS REAIS DO SITE) */}
          <section className="info-bar-ultimate">
            <div className="info-item">
              <span className="info-label">LOCALIZAÇÃO</span>
              <span className="info-value">{evento.local || "Porte de Versailles (Pavillon 4), Paris"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">TICKET INDIVIDUAL</span>
              <span className="info-value">R$ 135,00 (22€)</span>
            </div>
            <div className="info-item">
              <span className="info-label">EXPOSITORES</span>
              <span className="info-value">BUGATTI, PAGANI, MC LAREN & MAIS</span>
            </div>
            <div className="info-item">
              <span className="info-label">FORMATO</span>
              <span className="info-value">IMMERSIVE GENERAL PUBLIC & VIP</span>
            </div>
          </section>

          {/* CONTEÚDO DETALHADO (DADOS CONTEXTUAIS DA COMTEMPORANEIDADE DE PARIS) */}
          <section className="main-content">
            <div className="description-section">
              <h2 className="section-title-ultimate">O FUTURO DO AUTOMOBILISMO EXCEPCIONAL</h2>
              <p className="main-desc">
                Enquanto a histórica Rétromobile celebra o glorioso passado dos carros clássicos, o 
                <strong> Ultimate Supercar Garage</strong> foi projetado para moldar o amanhã. Este evento inédito une inovação, 
                artesanato de luxo e a performance extrema dos hipercarros modernos. Paris se transforma por uma semana 
                na maior vitrine contemporânea do ecossistema de supercarros, reunindo fabricantes, restomods, preparadores 
                de elite, clubes e artistas sob a refinada atmosfera de uma galeria moderna de arte.
              </p>
              <div className="highlights-grid-ultimate">
                <div className="highlight-item-ultimate">
                  <h3>THE LIVE STAGE</h3>
                  <p>Apresentações em tempo real com precisão coreográfica, revelações mundiais e conversas intimistas com engenheiros e designers renomados.</p>
                </div>
                <div className="highlight-item-ultimate">
                  <h3>NIGHT REVELATION</h3>
                  <p>Ao cair da noite, o palco ganha vida fundindo o compasso da música eletrônica a iluminações imersivas que amplificam a magia mecânica dos veículos.</p>
                </div>
                <div className="highlight-item-ultimate">
                  <h3>BRIDGE OF TIMELINES</h3>
                  <p>Um verdadeiro mergulho no fenômeno automotivo, permitindo ao público geral ver de perto as máquinas que costumam figurar apenas em telas e revistas.</p>
                </div>
              </div>
            </div>

            <div className="booking-card-ultimate">
              <div className="price-tag-ultimate">
                <small>VALOR EM CHECKOUT</small>
                <span>R$ 135 <small style={{display: 'inline', fontSize: '14px'}}> / Passe Geral</small></span>
              </div>
              <button className="buy-button-ultimate" onClick={() => setOpen(true)}>
                COMPRAR TICKET OFICIAL
              </button>
              <div className="ultimate-badges">
                <span>● GRATUITO PARA MENORES DE 12 ANOS</span>
                <span>● ACESSO INDIVIDUAL AO PAVILHÃO 4</span>
                <span>● GRUPOS OU CE (+10): DESCONTO PARA 15€ POR PESSOA</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          MODAL DE PAGAMENTO COMPARTILHADO (SUPORTA TODOS OS CASOS DINAMICAMENTE)
          ========================================================================= */}
      {open && (
        <div className="modal-overlay">
          <div className={`modal ${isLambo ? "lambo-modal" : isFerrari ? "ferrari-modal" : isPagani ? "pagani-modal" : isRolls ? "rolls-modal" : isUltimateParis ? "ultimate-modal" : "porsche-modal"}`}>
            <h2>
              {isLambo ? "CONFIRMAR RESERVA" : 
               isFerrari ? "SOLICITAR ACESSO" : 
               isPagani ? "RESERVAR ATELIER PASS" : 
               isRolls ? "CONCESSÃO DE ACESSO EXCLUSIVO" : 
               isUltimateParis ? "BILHETERIA RESTRITA PARIS" : 
               "Checkout Seguro"}
            </h2>

            <div className="payment-tabs">
               <button onClick={() => setMetodo("cartao")} className={metodo === "cartao" ? (isLambo ? "active-lambo" : isFerrari ? "active-ferrari" : isPagani ? "active-pagani" : isRolls ? "active-rolls" : isUltimateParis ? "active-ultimate" : "active-porsche") : ""}>Cartão</button>
               <button onClick={() => setMetodo("pix")} className={metodo === "pix" ? (isLambo ? "active-lambo" : isFerrari ? "active-ferrari" : isPagani ? "active-pagani" : isRolls ? "active-rolls" : isUltimateParis ? "active-ultimate" : "active-porsche") : ""}>Pix</button>
              <button
  onClick={() => setMetodo("boleto")}
  className={
    metodo === "boleto"
      ? (
          isLambo
            ? "active-lambo"
            : isFerrari
            ? "active-ferrari"
            : isPagani
            ? "active-pagani"
            : isRolls
            ? "active-rolls"
            : isUltimateParis
            ? "active-ultimate"
            : "active-porsche"
        )
      : ""
  }
>
  Boleto
</button>
            </div>

            <div className="payment-content">
              {metodo === "cartao" && (
                <div className="payment-box">
                  <input placeholder="Número do Cartão" onChange={(e)=>setCartao({...cartao,numero:e.target.value})}/>
                  <input placeholder="Nome Impresso" onChange={(e)=>setCartao({...cartao,nome:e.target.value})}/>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input placeholder="Validade" onChange={(e)=>setCartao({...cartao,validade:e.target.value})}/>
                    <input placeholder="CVV" onChange={(e)=>setCartao({...cartao,cvv:e.target.value})}/>
                  </div>
                </div>
              )}

              {metodo === "pix" && (
                <div className="payment-box qr-center">
                  <QRCodeCanvas value={pixCode} size={150} fgColor={isLambo ? "#c5ff00" : isFerrari ? "#ff2828" : isPagani ? "#9d8353" : isRolls ? "#6a5acd" : isUltimateParis ? "#00e5ff" : "#111"} bgColor={isLambo || isFerrari || isPagani || isRolls || isUltimateParis ? "#111" : "#fff"}/>
                  <button className={isLambo ? "copy-button-lambo" : isFerrari ? "copy-button-ferrari" : isPagani ? "copy-button-pagani" : isRolls ? "copy-button-rolls" : isUltimateParis ? "copy-button-ultimate" : "copy-button-porsche"} onClick={copiarPix}>Copiar Código PIX</button>
                </div>
              )}

              {metodo === "boleto" && (
                <div className="payment-box qr-center">
                   <Barcode value={boletoCode} height={50} width={1.5} background={isLambo || isFerrari || isPagani || isRolls || isUltimateParis ? "#111" : "#fff"} lineColor={isLambo ? "#fff" : isFerrari ? "#ff2828" : isPagani ? "#9d8353" : isRolls ? "#6a5acd" : isUltimateParis ? "#00e5ff" : "#000"} displayValue={false}/>
                   <p className="boleto-text">{boletoCode}</p>
                </div>
              )}
            </div>

            <button className={isLambo ? "confirm-button-lambo" : isFerrari ? "confirm-button-ferrari" : isPagani ? "confirm-button-pagani" : isRolls ? "confirm-button-rolls" : isUltimateParis ? "confirm-button-ultimate" : "confirm-button-porsche"} onClick={handleCompra}>
              {isLambo ? "CONFIRMAR AGORA" : isFerrari ? "CONCLUIR PEDIDO" : isPagani ? "FINALIZAR ADMISSÃO VIP" : isRolls ? "SOLICITAR CONVITE PRIVADO" : isUltimateParis ? "EMITIR ENTRADA INTERNACIONAL" : "Finalizar Reserva"}
            </button>
            <button className="close-link" onClick={() => setOpen(false)}>
              {isLambo || isFerrari || isPagani || isRolls || isUltimateParis ? "VOLTAR" : "Cancelar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}