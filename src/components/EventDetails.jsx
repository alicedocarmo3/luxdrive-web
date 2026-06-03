import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import { payload } from "pix-payload";
import "../styles/EventDetails.css";
import { eventos } from "../data/eventosData";

export default function EventDetails() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [metodo, setMetodo] = useState("cartao");
  const [quantidade, setQuantidade] = useState(1);
  const [erroMensagem, setErroMensagem] = useState(null);
  const [sucessoMensagem, setSucessoMensagem] = useState(null); 
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

  const themeClass = `${evento.tema}-theme`;

  const taxaServico = evento.precoIngresso * 0.02;
  const subtotal = evento.precoIngresso * quantidade;
  const total = subtotal + taxaServico;

  const formatarDataBR = (dataString) => {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const vagasRestantes = evento.limite - evento.ingressosVendidos;

  const data = {
    key: "14411621606",
    name: "UNIVERSELD",
    city: "BELOHORIZONTE",
    amount: Number(total.toFixed(2)),
    transactionId: `EVENTO${evento.id}`,
  };

  const pixCode = payload(data);
  const boletoFormatado = "34191.79001 01043.510047 91020.150008 2 91070000015000";
  const boletoCodeLinhaLimpa = boletoFormatado.replace(/[^0-9]/g, "");

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiadoPix(true);
    setTimeout(() => setCopiadoPix(false), 3000);
  };

  const handleCompra = () => {
    if (!dadosComprador.primeiroNome.trim() || !dadosComprador.sobrenome.trim() || !dadosComprador.email.trim()) {
      setErroMensagem({
        tipo: "comprador",
        texto: "Por favor, preencha o campo obrigatório."
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

    setErroMensagem(null);
    setSucessoMensagem(`Compra realizada com sucesso para a ${evento.nome}.`);
    
    setTimeout(() => {
      setOpen(false);
      setSucessoMensagem(null);
    }, 4000);
  };

  const handleInputChange = (e, setter, state) => {
    setter({ ...state, [e.target.name]: e.target.value });
  };

  const parseIncluso = (inclusoString) => {
    if (!inclusoString) return [];
    return inclusoString
      .split(/\.(?=\s|$)/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
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
              className={`tab-btn ${metodo === "cartao" ? `active-${evento.tema}` : ""}`}
              onClick={() => { setMetodo("cartao"); setErroMensagem(null); }}
            >
              Cartão
            </button>
            <button
              className={`tab-btn ${metodo === "pix" ? `active-${evento.tema}` : ""}`}
              onClick={() => { setMetodo("pix"); setErroMensagem(null); }}
            >
              PIX
            </button>
            <button
              className={`tab-btn ${metodo === "boleto" ? `active-${evento.tema}` : ""}`}
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
                <button className={`copy-button-${evento.tema}`} onClick={copiarPix}>
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

          <button className={`confirm-button-${evento.tema}`} onClick={handleCompra} disabled={sucessoMensagem !== null}>
            {metodo === "cartao" ? "Finalizar Compra" : metodo === "pix" ? "Confirmar Pagamento PIX" : "Gerar Boleto"}
          </button>

          <button className="close-link" onClick={() => { setOpen(false); setErroMensagem(null); setSucessoMensagem(null); }}>
            Voltar ao evento
          </button>
        </div>

        <div className={`checkout-summary ${themeClass}`}>
          <div className="summary-card">
            <h3>{evento.tituloResSummary || evento.tituloResumo}</h3>
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
      <div className={`${evento.tema}-layout`}>
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
              <h1 className={`${evento.tema}-title`}>{evento.nome}</h1>
              {evento.subtitulo && (
                <p className={`subtitle-${evento.tema}`}>{evento.subtitulo}</p>
              )}
            </div>
          </div>
        </section>

        <section className={`info-bar-${evento.tema}`}>
          <div className="info-item">
            <span className="info-label">LOCALIZAÇÃO</span>
            <span className="info-value">{evento.local}</span>
          </div>
          <div className="info-item">
            <span className="info-label">PREÇO</span>
            <span className="info-value">
              R$ {evento.precoIngresso.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">INGRESSOS</span>
            <span className="info-value">
              {vagasRestantes > 0
                ? (evento.vagasRestantes ? `${evento.vagasRestantes} VAGAS RESTANTES` : `${vagasRestantes} VAGAS RESTANTES`)
                : "ESGOTADO"}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">{evento.duracao.includes("DIA") || evento.duracao.includes("MINUTO") ? "DURAÇÃO" : "DATA"}</span>
            <span className="info-value">
              {evento.duracao.includes("DIA") || evento.duracao.includes("MINUTO") || evento.duracao.includes("EXPERIÊNCIA")
                ? evento.duracao
                : formatarDataBR(evento.data)}
            </span>
          </div>
        </section>

        <section className="main-content">
          <div className="description-section">
            <h2 className={`section-title-${evento.tema}`}>{evento.subtitulo || "EXPERIÊNCIA EXCLUSIVA"}</h2>
            <p className="main-desc">{evento.descricao}</p>

            {highlights.length > 0 && highlights[0].descricao ? (
              <div className={`highlights-grid-${evento.tema}`}>
                {highlights.map((item, index) => (
                  <div className={`highlight-item-${evento.tema}`} key={index}>
                    <h3>{item.titulo}</h3>
                    <p>{item.descricao}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`details-list-${evento.tema}`}>
                <h3>O que está incluso:</h3>
                <ul>
                  {inclusoItens.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={`booking-card-${evento.tema}`}>
            <div className={`price-tag-${evento.tema}`}>
              <small>A partir de</small>
              <span>R$ {evento.precoIngresso.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
            </div>

            <button
              className={`buy-button-${evento.tema}`}
              onClick={() => setOpen(true)}
              disabled={vagasRestantes <= 0}
            >
              {vagasRestantes > 0 ? "RESERVAR EXPERIÊNCIA" : "ESGOTADO"}
            </button>

            <p className={`tax-notice-${evento.tema}`}>
              Impostos inclusos. Sujeito a disponibilidade de agenda.
            </p>
          </div>
        </section>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => { setOpen(false); setErroMensagem(null); setSucessoMensagem(null); }}>
          <div className={`${evento.tema}-modal checkout-modal`} onClick={(e) => e.stopPropagation()}>
            {renderCheckoutForm()}
          </div>
        </div>
      )}
    </div>
  );
}