import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import emailjs from "@emailjs/browser"; // ✅ ADICIONAR
import "../styles/EventDetails.css";
import { eventos as eventosData } from "../data/eventosData";

import porscheCenter from "../assets/cars/porsche/porscheCenter.jpg";
import lamborghiniArena from "../assets/cars/lamborghini/lamborghiniArena.jpg";
import ferrariExpo from "../assets/cars/ferrari/ferrariExpo.jpg";
import paganiUtopia from "../assets/cars/pagani/paganiUtopia.jpg";
import RollsRoyceEvent from "../assets/cars/RollsRoyce/RollsRoyceEvent.jpg";
import garageExpo from "../assets/cars/garagem/garageExpo.jpg";

import { comprarIngresso } from "../services/eventoService";
import { createTicket } from "../services/ticketService"; 

// ============================
// GERADOR DE PAYLOAD PIX EMV
// ============================
const gerarPayloadPix = (chave, nome, cidade, valor = null) => {
  const calcCRC16 = (str) => {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
  };

  const field = (id, value) => `${id}${String(value.length).padStart(2, "0")}${value}`;

  const gui        = field("00", "BR.GOV.BCB.PIX");
  const keyField   = field("01", chave);
  const merchant   = field("26", gui + keyField);
  const valorField = valor ? field("54", valor.toFixed(2)) : "";
  const nomeClean  = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 25);
  const cidadeClean = cidade.normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 15);

  const payload =
    field("00", "01")          +
    merchant                   +
    field("52", "0000")        +
    field("53", "986")         +
    valorField                 +
    field("58", "BR")          +
    field("59", nomeClean)     +
    field("60", cidadeClean)   +
    field("62", field("05", "***")) +
    "6304";

  return payload + calcCRC16(payload);
};

const PIX_CHAVE = "14411621606";
const PIX_NOME  = "Alice";
const PIX_CIDADE = "Sabara";

const getImagem = (nome = "") => {
  const n = nome.toLowerCase();
  if (n.includes("porsche"))     return porscheCenter;
  if (n.includes("lamborghini")) return lamborghiniArena;
  if (n.includes("ferrari"))     return ferrariExpo;
  if (n.includes("pagani"))      return paganiUtopia;
  if (n.includes("rolls"))       return RollsRoyceEvent;
  if (n.includes("supercars") || n.includes("ultimate")) return garageExpo;
  return porscheCenter;
};

// ✅ CONFIGURAÇÕES EMAILJS (mesmo padrão do CarsDetails)
const EMAILJS_SERVICE_ID  = "service_81j2voj";
const EMAILJS_TEMPLATE_ID = "template_kohotzg"; // ⚠️ Crie um template novo no EmailJS
const EMAILJS_PUBLIC_KEY  = "3IzifOeNqQKaMrdC6";

export default function EventDetails() {
  const { id } = useParams();

  const [open, setOpen]               = useState(false);
  const [metodo, setMetodo]           = useState("cartao");
  const [quantidade, setQuantidade]   = useState(1);
  const [loading, setLoading]         = useState(false);
  const [erroMensagem, setErroMensagem]     = useState(null);
  const [sucessoMensagem, setSucessoMensagem] = useState(null);
  const [copiadoPix, setCopiadoPix]   = useState(false);
  const [evento, setEvento]           = useState(null);

  const [cartao, setCartao] = useState({
    numero: "", nome: "", validade: "", cvv: ""
  });

  const [dadosComprador, setDadosComprador] = useState({
    primeiroNome: "", sobrenome: "", email: "", telefone: ""
  });

  useEffect(() => {
    async function carregarEvento() {
      try {
        const response     = await fetch(`http://localhost:3000/eventos/${id}`);
        const dadosBackend = await response.json();
        const dadosLocais  = eventosData.find(e => e.id === dadosBackend.id);
        setEvento({ ...dadosBackend, ...dadosLocais });
      } catch (error) {
        console.log(error);
      }
    }
    carregarEvento();
  }, [id]);

  if (!evento) return <h1>Carregando evento...</h1>;

  const nomeMinusculo = evento.nome?.toLowerCase() || "";
  let themeClass = "porsche-theme";
  if (nomeMinusculo.includes("lamborghini")) themeClass = "lambo-theme";
  if (nomeMinusculo.includes("ferrari"))     themeClass = "ferrari-theme";
  if (nomeMinusculo.includes("pagani"))      themeClass = "pagani-theme";
  if (nomeMinusculo.includes("rolls-royce") || nomeMinusculo.includes("rolls royce")) themeClass = "rolls-theme";
  if (nomeMinusculo.includes("ultimate meeting") || nomeMinusculo.includes("ultimate supercar garage") || nomeMinusculo.includes("paris")) themeClass = "ultimate-theme";

  const temaEvento = evento.tema || "porsche";

  const precoUnitario = evento.preco || evento.precoIngresso || 0;
const taxaServico = (precoUnitario * quantidade) * 0.02;
  const subtotal      = precoUnitario * quantidade;
  const total         = subtotal + taxaServico;

  const pixPayload = gerarPayloadPix(PIX_CHAVE, PIX_NOME, PIX_CIDADE, total);
  const pixCodeMascarado =
    PIX_CHAVE.substring(0, 3) + "•••••" + PIX_CHAVE.substring(PIX_CHAVE.length - 3);

  const boletoFormatado    = "34191.79001 01043.510047 91020.150008 2 91070000015000";
  const boletoCodeLinhaLimpa = boletoFormatado.replace(/[^0-9]/g, "");

  const formatarDataBR = (dataString) => {
    if (!dataString) return "";
    const parts = dataString.split("-");
    if (parts.length !== 3) return dataString;
    const [ano, mes, dia] = parts;
    return `${dia}/${mes}/${ano}`;
  };

  const vagasRestantes = evento.limite && evento.ingressosVendidos
    ? (evento.limite - evento.ingressosVendidos)
    : 10;

  const copiarPix = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopiadoPix(true);
    setTimeout(() => setCopiadoPix(false), 3000);
  };

  // ✅ FUNÇÃO PARA ENVIAR EMAIL DE CONFIRMAÇÃO
  const enviarEmailConfirmacao = async () => {
    const templateParams = {
      nome: `${dadosComprador.primeiroNome} ${dadosComprador.sobrenome}`,
      email: dadosComprador.email,
      message: `Confirmação de compra para o evento ${evento.nome}.\n\n` +
               `Data: ${formatarDataBR(evento.data)}\n` +
               `Local: ${evento.local}\n` +
               `Quantidade: ${quantidade} ingresso(s)\n` +
               `Método: ${metodo.toUpperCase()}\n` +
               `Total: R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}\n\n` +
               `Status: ${metodo === "pix" || metodo === "boleto" ? "Aguardando pagamento" : "Pago"}`,
      car_model: evento.nome, // reutiliza a variável do template
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      console.log("Email de confirmação enviado!");
    } catch (err) {
      console.error("Erro ao enviar email:", err);
      // Não quebra o fluxo se o email falhar
    }
  };

    const handleCompra = async () => {
    if (!dadosComprador.primeiroNome.trim() || !dadosComprador.sobrenome.trim() || !dadosComprador.email.trim()) {
      setErroMensagem({ tipo: "comprador", texto: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }
    
    if (metodo === "cartao") {
      if (!cartao.numero.trim() || !cartao.nome.trim() || !cartao.validade.trim() || !cartao.cvv.trim()) {
        setErroMensagem({ tipo: "cartao", texto: "Por favor, preencha todos os dados do cartão de crédito." });
        return;
      }
    }

    try {
      setLoading(true);
      setErroMensagem(null);

      // ✅ GARANTE QUE TEMOS UM ID VÁLIDO
    const eventoId = evento._id ? String(evento._id) : evento.id;
console.log("Evento ID usado:", eventoId, "| Tipo:", typeof eventoId);
      if (!eventoId) {
        setErroMensagem({ tipo: "geral", texto: "ID do evento não encontrado. Recarregue a página." });
        setLoading(false);
        return;
      }

      // ✅ PAYLOAD LIMPO E VALIDADO
const ticketPayload = {
  eventoId: String(eventoId),        // ✅ Schema espera eventoId (String)
  eventoNome: evento.nome || "Evento", // ✅ Schema exige eventoNome
  quantidade: Number(quantidade),
  metodoPagamento: metodo,
  subtotal: Number(subtotal),        // ✅ Schema exige subtotal
  taxaServico: Number(taxaServico),  // ✅ Schema exige taxaServico
  total: Number(total),
  
  comprador: {                       // ✅ Schema espera objeto comprador
    primeiroNome: dadosComprador.primeiroNome.trim(),
    sobrenome: dadosComprador.sobrenome.trim(),
    email: dadosComprador.email.trim(),
    telefone: dadosComprador.telefone?.trim() || "",
  },
  
  status: metodo === "pix" || metodo === "boleto" ? "pendente" : "pago",
  
  ...(metodo === "pix" && { pixPayload }),
  ...(metodo === "boleto" && { boletoCodigo: boletoCodeLinhaLimpa }),
  
  ...(metodo === "cartao" && { 
    cartao: {
      ultimos4: cartao.numero.slice(-4),  // Controller vai extrair para cartaoUltimos4
    }
  }),
};

      console.log("Payload enviado:", ticketPayload); // DEBUG

      const response = await createTicket(ticketPayload);
      console.log("Resposta do backend:", response); // DEBUG

      // ✅ ENVIA EMAIL DE CONFIRMAÇÃO (só se o ticket foi criado com sucesso)
      await enviarEmailConfirmacao();

      setSucessoMensagem(`Compra realizada com sucesso para o evento ${evento.nome}! Verifique seu email.`);
      setTimeout(() => { setOpen(false); setSucessoMensagem(null); }, 4000);

    } catch (error) {
      console.error("Erro na compra:", error);
      
      // ✅ MELHOR TRATAMENTO DE ERRO
      let mensagemErro = "Erro ao finalizar compra. Tente novamente.";
      
      if (error.response) {
        // Erro com resposta do servidor
        mensagemErro = error.response.data?.message 
          || error.response.data?.error 
          || `Erro ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // Requisição feita mas sem resposta
        mensagemErro = "Servidor não respondeu. Verifique sua conexão.";
      } else if (error.message) {
        mensagemErro = error.message;
      }

      setErroMensagem({ 
        tipo: "geral", 
        texto: mensagemErro
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, setter, state) => {
    setter({ ...state, [e.target.name]: e.target.value });
  };

  const parseIncluso = (inclusoString) => {
    if (!inclusoString) return [];
    return inclusoString.split(/\.(?=\s|$)/).map(i => i.trim()).filter(i => i.length > 0);
  };

  const parseHighlights = (inclusoString) => {
    if (!inclusoString) return [];
    return inclusoString
      .split(/\.(?=\s|$)/)
      .map(i => i.trim())
      .filter(i => i.length > 0)
      .map(i => {
        const [titulo, ...descricaoParts] = i.split(":");
        return { titulo: titulo.trim(), descricao: descricaoParts.join(":").trim() };
      });
  };

  const inclusoItens = parseIncluso(evento.incluso);
  const highlights   = parseHighlights(evento.incluso);

  const renderCheckoutForm = () => (
    <div className="checkout-wix-style">
      <div className="checkout-grid">
        <div className="checkout-form-section">
          <h2 className="checkout-title">Adicione seus dados</h2>

          <div className="payment-tabs-wix">
            <button className={`tab-btn ${metodo === "cartao" ? `active-${temaEvento}` : ""}`} onClick={() => { setMetodo("cartao"); setErroMensagem(null); }}>Cartão</button>
            <button className={`tab-btn ${metodo === "pix"    ? `active-${temaEvento}` : ""}`} onClick={() => { setMetodo("pix");    setErroMensagem(null); }}>PIX</button>
            <button className={`tab-btn ${metodo === "boleto" ? `active-${temaEvento}` : ""}`} onClick={() => { setMetodo("boleto"); setErroMensagem(null); }}>Boleto</button>
          </div>

          <div className="form-group-row">
            <div className="form-field">
              <label>*Primeiro nome</label>
              <input type="text" name="primeiroNome"
                className={erroMensagem?.tipo === "comprador" && !dadosComprador.primeiroNome.trim() ? "input-error" : ""}
                value={dadosComprador.primeiroNome}
                onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
                placeholder="João" maxLength={50} required />
            </div>
            <div className="form-field">
              <label>*Sobrenome</label>
              <input type="text" name="sobrenome"
                className={erroMensagem?.tipo === "comprador" && !dadosComprador.sobrenome.trim() ? "input-error" : ""}
                value={dadosComprador.sobrenome}
                onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
                placeholder="Silva" maxLength={50} required />
            </div>
          </div>

          <div className="form-field full">
            <label>*Email</label>
            <input type="email" name="email"
              className={erroMensagem?.tipo === "comprador" && !dadosComprador.email.trim() ? "input-error" : ""}
              value={dadosComprador.email}
              onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
              placeholder="joao@email.com" maxLength={100} required />
          </div>

          <div className="form-field full">
            <label>Telefone</label>
            <input type="tel" name="telefone"
              value={dadosComprador.telefone}
              onChange={(e) => handleInputChange(e, setDadosComprador, dadosComprador)}
              placeholder="(11) 99999-9999" maxLength={15} />
          </div>

          {erroMensagem?.tipo === "comprador" && (
            <div style={{ color: "#ff2828", fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>
              {erroMensagem.texto}
            </div>
          )}

          <div className="payment-content">

            {metodo === "cartao" && (
              <div className="payment-box">
                <h4>Dados do Cartão</h4>
                <input type="text" placeholder="Número do cartão"
                  className={erroMensagem?.tipo === "cartao" && !cartao.numero.trim() ? "input-error" : ""}
                  value={cartao.numero} maxLength={16}
                  onChange={(e) => setCartao({ ...cartao, numero: e.target.value.replace(/[^0-9]/g, "") })} />
                <input type="text" placeholder="Nome no cartão"
                  className={erroMensagem?.tipo === "cartao" && !cartao.nome.trim() ? "input-error" : ""}
                  value={cartao.nome} maxLength={60}
                  onChange={(e) => setCartao({ ...cartao, nome: e.target.value })} />
                <div className="form-group-row">
                  <input type="text" placeholder="MM/AA"
                    className={erroMensagem?.tipo === "cartao" && !cartao.validade.trim() ? "input-error" : ""}
                    value={cartao.validade} maxLength={5}
                    onChange={(e) => setCartao({ ...cartao, validade: e.target.value })} />
                  <input type="text" placeholder="CVV"
                    className={erroMensagem?.tipo === "cartao" && !cartao.cvv.trim() ? "input-error" : ""}
                    value={cartao.cvv} maxLength={4}
                    onChange={(e) => setCartao({ ...cartao, cvv: e.target.value.replace(/[^0-9]/g, "") })} />
                </div>
                {erroMensagem?.tipo === "cartao" && (
                  <div style={{ color: "#ff2828", fontSize: "14px", fontWeight: "bold", marginTop: "15px" }}>
                    {erroMensagem.texto}
                  </div>
                )}
              </div>
            )}

            {metodo === "pix" && (
              <div className="payment-box qr-center">
                <h4>Pagamento via PIX</h4>
                <div className="pix-qrcode-wrapper">
                  <QRCodeCanvas value={pixPayload} size={220} bgColor="#ffffff" fgColor="#000000" level="H" />
                </div>
                <p className="pix-description">Escaneie o QR Code ou copie o código PIX abaixo.</p>
                <div className="pix-code-box">
                  <span>{pixCodeMascarado}</span>
                </div>
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
                <div className="boleto-code-box" style={{ fontSize: "13px", letterSpacing: "0.5px" }}>
                  {boletoFormatado}
                </div>
                <p className="boleto-info">O boleto vence em 3 dias úteis.</p>
              </div>
            )}
          </div>

          {sucessoMensagem && (
            <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "12px", borderRadius: "6px", marginTop: "20px", marginBottom: "10px", fontWeight: "bold", textAlign: "center", border: "1px solid #c3e6cb", fontSize: "15px" }}>
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
              <span>R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="summary-line">
              <span>Taxa de serviço</span>
              <span>R$ {taxaServico.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total</span>
              <span>R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`details-container ${themeClass} page-with-navbar`}>
      <div className={`${temaEvento}-layout`}>
        <button className="back-button-universeld" onClick={() => window.location.href = "/universe"}>
          &larr;
        </button>

        <section className="event-header">
          <img src={getImagem(evento.nome)} alt={evento.nome} className="details-image" />
          <div className="header-overlay">
            <div className="header-text">
              <h1 className={`${temaEvento}-title`}>{evento.nome}</h1>
              {evento.subtitulo && <p className={`subtitle-${temaEvento}`}>{evento.subtitulo}</p>}
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
            <span className="info-value">R$ {precoUnitario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="info-item">
            <span className="info-label">INGRESSOS</span>
            <span className="info-value">{vagasRestantes > 0 ? `${vagasRestantes} VAGAS RESTANTES` : "ESGOTADO"}</span>
          </div>
          <div className="info-item">
            <span className="info-label">{evento.duracao?.includes("DIA") ? "DURAÇÃO" : "DATA"}</span>
            <span className="info-value">{evento.duracao || formatarDataBR(evento.data)}</span>
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
                  {inclusoItens.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>

          <div className={`booking-card-${temaEvento}`}>
            <div className={`price-tag-${temaEvento}`}>
              <small>A partir de</small>
              <span>R$ {precoUnitario.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</span>
            </div>
            <button className={`buy-button-${temaEvento}`} onClick={() => setOpen(true)} disabled={vagasRestantes <= 0}>
              {vagasRestantes > 0 ? "RESERVAR EXPERIÊNCIA" : "ESGOTADO"}
            </button>
            <p className={`tax-notice-${temaEvento}`}>Impostos inclusos. Sujeito a disponibilidade de agenda.</p>
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