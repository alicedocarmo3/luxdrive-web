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
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);

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
  React.useEffect(() => {
    async function carregarEvento() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/eventos/${id}`
        );

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

  const nomeMinusculo = evento.nome?.toLowerCase() || "";

  const isLambo = nomeMinusculo.includes("lamborghini");
  const isFerrari = nomeMinusculo.includes("ferrari");
  const isPagani = nomeMinusculo.includes("pagani");
  const isRolls =
    nomeMinusculo.includes("rolls-royce") ||
    nomeMinusculo.includes("rolls royce");

  const isUltimateParis =
    nomeMinusculo.includes("ultimate meeting") ||
    nomeMinusculo.includes("ultimate supercar garage") ||
    nomeMinusculo.includes("paris");

  const isPorsche =
    !isLambo &&
    !isFerrari &&
    !isPagani &&
    !isRolls &&
    !isUltimateParis;

  let themeClass = "porsche-theme";

  if (isLambo) themeClass = "lambo-theme";
  if (isFerrari) themeClass = "ferrari-theme";
  if (isPagani) themeClass = "pagani-theme";
  if (isRolls) themeClass = "rolls-theme";
  if (isUltimateParis) themeClass = "ultimate-theme";

  const precoUnitario = evento.preco;

  const taxaServico = precoUnitario * 0.02;
  const subtotal = precoUnitario * quantidade;
  const total = subtotal + taxaServico;

  const pixCode = "000201PIX-UNIVERSE-LD-123456";
  const boletoCode = "341917900101043510047910201500";

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado!");
  };

  // ============================
  // COMPRA PELO SERVICE
  // ============================
  const handleCompra = async () => {
    try {
      setLoading(true);

      const payload = {
        eventoId: evento.id,
        quantidade,
        metodoPagamento: metodo,
        subtotal,
        taxaServico,
        total,

        comprador: dadosComprador,

        cartao:
          metodo === "cartao"
            ? cartao
            : null
      };

      // SERVICE
      const response = await comprarIngresso(payload);

      console.log(response);

      alert("Compra realizada com sucesso!");

      setOpen(false);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Erro ao finalizar compra"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`details-container ${themeClass}`}>

      <section className="event-header">
        <img
          src={evento.imagem}
          alt={evento.nome}
          className="details-image"
        />

        <div className="header-overlay">
          <div className="header-text">
            <h1>{evento.nome}</h1>
          </div>
        </div>
      </section>

      <section className="info-bar-porsche">
        <div className="info-item">
          <span className="info-label">LOCAL</span>
          <span className="info-value">
            {evento.local}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">PREÇO</span>
          <span className="info-value">
            R$ {evento.preco}
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">DATA</span>
          <span className="info-value">
            {evento.data}
          </span>
        </div>
      </section>

      <section className="main-content">
        <div className="description-section">
          <p className="main-desc">
            {evento.descricao}
          </p>
        </div>

        <div className="booking-card-porsche">
          <div className="price-tag-porsche">
            <small>A PARTIR DE</small>
            <span>
              R$ {evento.preco}
            </span>
          </div>

          <button
            className="buy-button-porsche"
            onClick={() => setOpen(true)}
          >
            RESERVAR EXPERIÊNCIA
          </button>
        </div>
      </section>

      {/* MODAL */}
      {open && (
        <div
          className="modal-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="payment-box">

              <h2>Finalizar Compra</h2>

              <input
                type="text"
                placeholder="Primeiro Nome"
                value={dadosComprador.primeiroNome}
                onChange={(e) =>
                  setDadosComprador({
                    ...dadosComprador,
                    primeiroNome: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Sobrenome"
                value={dadosComprador.sobrenome}
                onChange={(e) =>
                  setDadosComprador({
                    ...dadosComprador,
                    sobrenome: e.target.value
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                value={dadosComprador.email}
                onChange={(e) =>
                  setDadosComprador({
                    ...dadosComprador,
                    email: e.target.value
                  })
                }
              />

              <div className="payment-tabs-wix">
                <button onClick={() => setMetodo("cartao")}>
                  Cartão
                </button>

                <button onClick={() => setMetodo("pix")}>
                  PIX
                </button>

                <button onClick={() => setMetodo("boleto")}>
                  Boleto
                </button>
              </div>

              {metodo === "cartao" && (
                <>
                  <input
                    type="text"
                    placeholder="Número do cartão"
                    value={cartao.numero}
                    onChange={(e) =>
                      setCartao({
                        ...cartao,
                        numero: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Nome do cartão"
                    value={cartao.nome}
                    onChange={(e) =>
                      setCartao({
                        ...cartao,
                        nome: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Validade"
                    value={cartao.validade}
                    onChange={(e) =>
                      setCartao({
                        ...cartao,
                        validade: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="CVV"
                    value={cartao.cvv}
                    onChange={(e) =>
                      setCartao({
                        ...cartao,
                        cvv: e.target.value
                      })
                    }
                  />
                </>
              )}

              {metodo === "pix" && (
                <div className="qr-center">
                  <QRCodeCanvas
                    value={pixCode}
                    size={180}
                  />

                  <button onClick={copiarPix}>
                    Copiar PIX
                  </button>
                </div>
              )}

              {metodo === "boleto" && (
                <div className="qr-center">
                  <Barcode
                    value={boletoCode}
                    width={1}
                    height={40}
                  />
                </div>
              )}

              <button
                className="confirm-button-porsche"
                onClick={handleCompra}
                disabled={loading}
              >
                {loading
                  ? "Processando..."
                  : "Finalizar Compra"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}