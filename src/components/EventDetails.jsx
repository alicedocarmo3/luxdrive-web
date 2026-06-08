import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import "../styles/EventDetails.css";

// SERVICE
import { comprarIngresso } from "../services/eventoService";

export default function EventDetails() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [metodo, setMetodo] = useState("cartao");
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erroMensagem, setErroMensagem] = useState(null);
  const [sucessoMensagem, setSucessoMensagem] = useState(null);
  const [copiadoPix, setCopiadoPix] = useState(false);

  // EVENTO VINDO DO BACKEND
  const [evento, setEvento] = useState(null);

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

  // ============================
  // BUSCAR EVENTO NO BACKEND
  // ============================
  useEffect(() => {
    async function carregarEvento() {
      try {
        const response = await fetch(`http://localhost:3000/api/eventos/${id}`);
        const data = await response.json();
        setEvento(data);
      } catch (error) {
        console.log(error);
      }
    }

    carregarEvento();
  }, [id]);

  if (!evento) {
    return <h1>Carregando evento...</h1>;
  }

  // Lógica de Temas Baseada no Nome do Evento
  const nomeMinusculo = evento.nome?.toLowerCase() || "";
  const isLambo = nomeMinusculo.includes("lamborghini");
  const isFerrari = nomeMinusculo.includes("ferrari");
  const isPagani = nomeMinusculo.includes("pagani");
  const isRolls = nomeMinusculo.includes("rolls-royce") || nomeMinusculo.includes("rolls royce");
  const isUltimateParis = nomeMinusculo.includes("ultimate meeting") || nomeMinusculo.includes("ultimate supercar garage") || nomeMinusculo.includes("paris");

  let themeClass = "porsche-theme";
  if (isLambo) themeClass = "lambo-theme";
  if (isFerrari) themeClass = "ferrari-theme";
  if (isPagani) themeClass = "pagani-theme";
  if (isRolls) themeClass = "rolls-theme";
  if (isUltimateParis) themeClass = "ultimate-theme";

  const temaEvento = evento.tema || "porsche";

  // Cálculos de Preço
  const precoUnitario = evento.preco || evento.precoIngresso || 0;
  const taxaServico = precoUnitario * 0.02;
  const subtotal = precoUnitario * quantidade;
  const total = subtotal + taxaServico;

  const formatarDataBR = (dataString) => {
    if (!dataString) return "";
    const parts = dataString.split("-");
    if (parts.length !== 3) return dataString;
    const [ano, mes, dia] = parts;
    return `${dia}/${mes}/${ano}`;
  };

  const vagasRestantes = evento.limite && evento.ingressosVendidos ? (evento.limite - evento.ingressosVendidos) : 10;

  const pixCode = "000201PIX-UNIVERSE-LD-123456";
  const boletoFormatado = "34191.79001 01043.510047 91020.150008 2 91070000015000";
  const boletoCodeLinhaLimpa = boletoFormatado.replace(/[^0-9]/g, "");

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiadoPix(true);
    setTimeout(() => setCopiadoPix(false), 3000);
  };

  // ============================
  // COMPRA PELO SERVICE
  // ============================
  const handleCompra = async () => {
    if (!dadosComprador.primeiroNome.trim() || !dadosComprador.sobrenome.trim() || !dadosComprador.email.trim()) {
      setErroMensagem({
        tipo: "comprador",
        texto: "Por favor, preencha todos os campos obrigatórios."
      });
      return;
    }

    if (metodo === "cartao") {
      if (!cartao.numero.trim() || !cartao.nome.trim() || !cartao.validade.trim() || !cartao.cvv.trim()) {
        setErroMensagem({
          tipo: "cartao",
          texto: "Por favor, preencha todos os dados do cartão de crédito."
        });
        return;
      }
    }

    try {
      setLoading(true);
      setErroMensagem(null);

      const payloadEnvio = {
        eventoId: evento.id,
        quantidade,
        metodoPagamento: metodo,
        subtotal,
        taxaServico,
        total,
        comprador: dadosComprador,
        cartao: metodo === "cartao" ? cartao : null
      };

      await comprarIngresso(payloadEnvio);

      setSucessoMensagem(`Compra realizada com sucesso para o evento ${evento.nome}!`);
     
      setTimeout(() => {
        setOpen(false);
        setSucessoMensagem(null);
      }, 4000);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Erro ao finalizar compra");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, setter, state) => {
    setter({ ...state, [e.target.name]: e.target.value });
  };

  const parseIncluso = (inclusoString) => {
    if (!inclusoString) return [];
    return inclusoString.split(/\.(?=\s|$)/).map(item => item.trim()).filter(item => item.length > 0);
  };

  const parseHighlights = (inclusoString) => {
    if (!inclusoString) return [];
    return inclusoString
      .split(/\.(?=\s|$)/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(item => {
        const [titulo, ...descricaoParts] = item.split(":");
        return {
          titulo: titulo.trim(),
          descricao: descricaoParts.join(":").trim()
        };
      });
  };

  const inclusoItens = parseIncluso(evento.incluso);
  const highlights = parseHighlights(evento.incluso);

  const renderCheckoutForm = () => (
    <div className="checkout-wix-style">
      <div className="checkout-grid">
        <div className="checkout-form-section">
          <h2 className="checkout-title">Adicione seus dados</h2>

          <div className="payment-tabs-wix">
            <button
              className={`tab-btn ${metodo === "cartao" ? `active-${temaEvento}` : ""}`}
              onClick={() => { setMetodo("cartao"); setErroMensagem(null); }}
            >
              Cartão
            </button>
            <button
              className={`tab-btn ${metodo === "pix" ? `active-${temaEvento}` : ""}`}
              onClick={() => { setMetodo("pix"); setErroMensagem(null); }}
            >
              PIX
            </button>
            <button
              className={`tab-btn ${metodo === "boleto" ? `active-${temaEvento}` : ""}`}
              onClick={() => { setMetodo("boleto"); setErroMensagem(null); }}
            >
              Boleto
            </button>
          </div>

          <div className="form-group-row">
            <div className="form-field">
              <label>*Primeiro nome</label>
              <input
                type="text"
                name="primeiroNome"
                className={erroMensagem?.tipo === "comprador" && !dadosComprador.primeiroNome.trim() ? "input-error" : ""}
                value={dadosComprador.primeiroNome}
                onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
                placeholder="João"
                maxLength={50}
                required
              />
            </div>
            <div className="form-field">
              <label>*Sobrenome</label>
              <input
                type="text"
                name="sobrenome"
                className={erroMensagem?.tipo === "comprador" && !dadosComprador.sobrenome.trim() ? "input-error" : ""}
                value={dadosComprador.sobrenome}
                onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
                placeholder="Silva"
                maxLength={50}
                required
              />
            </div>
          </div>

          <div className="form-field full">
            <label>*Email</label>
            <input
              type="email"
              name="email"
              className={erroMensagem?.tipo === "comprador" && !dadosComprador.email.trim() ? "input-error" : ""}
              value={dadosComprador.email}
              onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
              placeholder="joao@email.com"
              maxLength={100}
              required
            />
          </div>

          <div className="form-field full">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={dadosComprador.telefone}
              onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
              placeholder="(11) 99999-9999"
              maxLength={15}
            />
          </div>

          {erroMensagem?.tipo === "comprador" && (
            <div className="error-message-wix" style={{ color: "#ff2828", fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>
              {erroMensagem.texto}
            </div>
          )}

          <div className="payment-content">
            {metodo === "cartao" && (
              <div className="payment-box">
                <h4>Dados do Cartão</h4>
                <input
                  type="text"
                  placeholder="Número do cartão"
                  className={erroMensagem?.tipo === "cartao" && !cartao.numero.trim() ? "input-error" : ""}
                  value={cartao.numero}
                  maxLength={16}
                  onChange={(e) => setCartao({ ...cartao, numero: e.target.value.replace(/[^0-9]/g, "") })}
                />
                <input
                  type="text"
                  placeholder="Nome no cartão"
                  className={erroMensagem?.tipo === "cartao" && !cartao.nome.trim() ? "input-error" : ""}
                  value={cartao.nome}
                  maxLength={60}
                  onChange={(e) => setCartao({ ...cartao, nome: e.target.value })}
                />
                <div className="form-group-row">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className={erroMensagem?.tipo === "cartao" && !cartao.validade.trim() ? "input-error" : ""}
                    value={cartao.validade}
                    maxLength={5}
                    onChange={(e) => setCartao({ ...cartao, validade: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className={erroMensagem?.tipo === "cartao" && !cartao.cvv.trim() ? "input-error" : ""}
                    value={cartao.cvv}
                    maxLength={4}
                    onChange={(e) => setCartao({ ...cartao, cvv: e.target.value.replace(/[^0-9]/g, "") })}
                  />
                </div>

                {erroMensagem?.tipo === "cartao" && (
                  <div className="error-message-wix" style={{ color: "#ff2828", fontSize: "14px", fontWeight: "bold", marginTop: "15px" }}>
                    {erroMensagem.texto}
                  </div>
                )}
              </div>
            )}

            {metodo === "pix" && (
              <div className="payment-box qr-center">
                <h4>Pagamento via PIX</h4>
                <div className="pix-qrcode-wrapper">
                  <QRCodeCanvas value={pixCode} size={220} bgColor="#ffffff" fgColor="#000000" />
                </div>
                <p className="pix-description">Escaneie o QR Code ou copie o código PIX abaixo.</p>
                <div className="pix-code-box"><span>{pixCode}</span></div>
                <button className={`copy-button-${temaEvento}`} onClick={copiarPix}>
                  {copiadoPix ? "✓ Código copiado!" : "Copiar código PIX"}
                </button>
              </div>
            )}

            {metodo === "boleto" && (
              <div className="payment-box qr-center">
                <h4>Pagamento via Boleto</h4>
                <div className="boleto-wrapper">
                  <Barcode value={boletoCodeLinhaLimpa} format="CODE128" width={1.2} height={60} displayValue={false} />
                </div>
                <div className="boleto-code-box" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                  {boletoFormatado}
                </div>
                <p className="boleto-info">O boleto vence em 3 dias úteis.</p>
              </div>
            )}
          </div>

          {sucessoMensagem && (
            <div className="success-banner-wix" style={{ backgroundColor: "#d4edda", color: "#155724", padding: "12px", borderRadius: "6px", marginTop: "20px", marginBottom: "10px", fontWeight: "bold", textAlign: "center", border: "1px solid #c3e6cb", fontSize: "15px" }}>
              {sucessoMensagem}
            </div>
          )}

          <button className={`confirm-button-${temaEvento}`} onClick={handleCompra} disabled={loading || sucessoMensagem !== null}>
            {loading ? "Processando..." : metodo === "cartao" ? "Finalizar Compra" : metodo === "pix" ? "Confirmar Pagamento PIX" : "Gerar Boleto"}
          </button>

          <button className="close-link" onClick={() => { setOpen(false); setErroMensagem(null); setSucessoMensagem(null); }}>
            Voltar ao evento
          </button>
        </div>

        <div className={`checkout-summary ${themeClass}`}>
          <div className="summary-card">
            <h3>{evento.tituloResSummary || evento.tituloResumo || evento.nome}</h3>
            <p className="summary-date">{formatarDataBR(evento.data)}</p>
            <p className="summary-location">{evento.local}</p>
            <div className="summary-divider"></div>
            <div className="quantity-selector">
              <label>Quantidade</label>
              <div className="qty-controls">
                <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="qty-btn" disabled={sucessoMensagem !== null}>−</button>
                <span className="qty-value">{quantidade}</span>
                <button onClick={() => setQuantidade(quantidade + 1)} className="qty-btn" disabled={sucessoMensagem !== null}>+</button>
              </div>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-line">
              <span>Ingresso ({quantidade}x)</span>
              <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="summary-line">
              <span>Taxa de serviço</span>
              <span>R$ {taxaServico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`details-container ${themeClass} page-with-navbar`}>
      <div className={`${temaEvento}-layout`}>
        <button
          className="back-button-universeld"
          onClick={() => window.location.href = "/universe"}
        >
          &larr;
        </button>

        <section className="event-header">
          <img src={evento.imagem} alt={evento.nome} className="details-image" />
          <div className="header-overlay">
            <div className="header-text">
              <h1 className={`${temaEvento}-title`}>{evento.nome}</h1>
              {evento.subtitulo && (
                <p className={`subtitle-${temaEvento}`}>{evento.subtitulo}</p>
              )}
            </div>
          </div>
        </section>

        <section className={`info-bar-${temaEvento}`}>
          <div className="info-item">
            <span className="info-label">LOCALIZAÇÃO</span>
            <span className="info-value">{evento.local}</span>
          </div>
          <div className="info-item">
            <span className="info-label">PREÇO</span>
            <span className="info-value">
              R$ {precoUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">INGRESSOS</span>
            <span className="info-value">
              {vagasRestantes > 0 ? `${vagasRestantes} VAGAS RESTANTES` : "ESGOTADO"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">{evento.duracao?.includes("DIA") ? "DURAÇÃO" : "DATA"}</span>
            <span className="info-value">
              {evento.duracao || formatarDataBR(evento.data)}
            </span>
          </div>
        </section>

        <section className="main-content">
          <div className="description-section">
            <h2 className={`section-title-${temaEvento}`}>{evento.subtitulo || "EXPERIÊNCIA EXCLUSIVA"}</h2>
            <p className="main-desc">{evento.descricao}</p>

            {highlights.length > 0 && highlights[0].descricao ? (
              <div className={`highlights-grid-${temaEvento}`}>
                {highlights.map((item, index) => (
                  <div className={`highlight-item-${temaEvento}`} key={index}>
                    <h3>{item.titulo}</h3>
                    <p>{item.descricao}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`details-list-${temaEvento}`}>
                <h3>O que está incluso:</h3>
                <ul>
                  {inclusoItens.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={`booking-card-${temaEvento}`}>
            <div className={`price-tag-${temaEvento}`}>
              <small>A partir de</small>
              <span>R$ {precoUnitario.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
            </div>

            <button
              className={`buy-button-${temaEvento}`}
              onClick={() => setOpen(true)}
              disabled={vagasRestantes <= 0}
            >
              {vagasRestantes > 0 ? "RESERVAR EXPERIÊNCIA" : "ESGOTADO"}
            </button>

            <p className={`tax-notice-${temaEvento}`}>
              Impostos inclusos. Sujeito a disponibilidade de agenda.
            </p>
          </div>
        </section>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => { setOpen(false); setErroMensagem(null); setSucessoMensagem(null); }}>
          <div className={`${temaEvento}-modal checkout-modal`} onClick={(e) => e.stopPropagation()}>
            {renderCheckoutForm()}
          </div>
        </div>
      )}
    </div>
  );
}