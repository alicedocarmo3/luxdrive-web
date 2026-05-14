import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import "../styles/EventDetails.css";

const eventos = [
  {
    id: 1,
    nome: "LD Supercars Night",
    data: "15 Agosto 2026",
    local: "São Paulo - SP",
    imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
    descricao: "Uma noite exclusiva com os supercarros mais desejados do mundo.",
    detalhes: "Evento premium com acesso VIP, open bar e exposição de supercarros raros."
  },
  {
    id: 2,
    nome: "Universe Drift Experience",
    data: "02 Setembro 2026",
    local: "Curitiba - PR",
    imagem: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200",
    descricao: "Adrenalina pura com pilotos profissionais.",
    detalhes: "Experiência completa com drift ao vivo e interação com pilotos."
  },
  {
    id: 3,
    nome: "Luxury Cars Expo",
    data: "20 Outubro 2026",
    local: "Rio de Janeiro - RJ",
    imagem: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
    descricao: "Exposição de carros luxuosos.",
    detalhes: "Marcas internacionais e experiências exclusivas."
  },
  {
    id: 4,
    nome: "Universe F1 Experience",
    data: "10 Novembro 2026",
    local: "Interlagos - SP",
    imagem: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=1200",
    descricao: "Experiência Fórmula 1.",
    detalhes: "Simuladores profissionais e exposição de carros históricos."
  },
  {
    id: 5,
    nome: "Encontro Nacional de Carros",
    data: "05 Dezembro 2026",
    local: "Balneário Camboriú - SC",
    imagem: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200",
    descricao: "Grande encontro automotivo.",
    detalhes: "Carros esportivos, clássicos e modificados reunidos."
  },
  {
    id: 6,
    nome: "Museu de Clássicos LD",
    data: "18 Janeiro 2027",
    local: "Belo Horizonte - MG",
    imagem: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200",
    descricao: "Carros históricos.",
    detalhes: "Coleção exclusiva de veículos clássicos e raros."
  }
];

export default function EventDetails() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [metodo, setMetodo] = useState("cartao");

  const [cartao, setCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: ""
  });

  const evento = eventos.find(e => e.id === Number(id));

  if (!evento) return <h1>Evento não encontrado</h1>;

  const pixCode = "000201PIX-UNIVERSE-LD-123456";
  const boletoCode = "341917900101043510047910201500089370000002000";

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado!");
  };

  const handleCompra = () => {
    if (metodo === "cartao") {
      if (!cartao.numero || !cartao.nome || !cartao.validade || !cartao.cvv) {
        alert("Preencha os dados do cartão!");
        return;
      }
      alert("Pagamento aprovado!");
    }

    if (metodo === "pix") alert("Pix gerado!");
    if (metodo === "boleto") alert("Boleto gerado!");

    alert("Compra realizada!");
    setOpen(false);
  };

  return (
    <div className="details-container">

      <img src={evento.imagem} alt={evento.nome} className="details-image"/>

      <div className="details-content">
        <h1>{evento.nome}</h1>
        <p className="details-date">{evento.data}</p>
        <p className="details-location">{evento.local}</p>
        <p>{evento.descricao}</p>
        <p>{evento.detalhes}</p>

        <button className="buy-button" onClick={() => setOpen(true)}>
          Comprar Ingresso
        </button>
      </div>

      {open && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>Finalizar Compra</h2>

            <div className="payment-tabs">
              <button onClick={() => setMetodo("cartao")}>Cartão</button>
              <button onClick={() => setMetodo("pix")}>Pix</button>
              <button onClick={() => setMetodo("boleto")}>Boleto</button>
            </div>

            {metodo === "cartao" && (
              <div className="payment-box">
                <input placeholder="Número"
                  onChange={(e)=>setCartao({...cartao,numero:e.target.value})}/>
                <input placeholder="Nome"
                  onChange={(e)=>setCartao({...cartao,nome:e.target.value})}/>
                <input placeholder="Validade"
                  onChange={(e)=>setCartao({...cartao,validade:e.target.value})}/>
                <input placeholder="CVV"
                  onChange={(e)=>setCartao({...cartao,cvv:e.target.value})}/>
              </div>
            )}

            {metodo === "pix" && (
              <div className="payment-box">
                <QRCodeCanvas value={pixCode} size={160}/>
                <div className="pix-box">{pixCode}</div>

                <button className="copy-button" onClick={copiarPix}>
                  Copiar PIX
                </button>
              </div>
            )}

            {metodo === "boleto" && (
              <div className="payment-box">
                <div className="boleto-box">
                  34191.79001 01043.510047 91020.150008 5 89370000002000
                </div>

                <Barcode value={boletoCode} height={70} displayValue={false}/>
              </div>
            )}

            <button className="confirm-button" onClick={handleCompra}>
              Confirmar Compra
            </button>

            <button className="close-button" onClick={() => setOpen(false)}>
              Fechar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}