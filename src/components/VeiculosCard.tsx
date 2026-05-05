import React from "react";
import { ICarros } from "../interfaces/ICarros";

function VeiculoCard({ veiculo }: { veiculo: ICarros }) {
  return (
    <div className="cardVeiculo">

      <img src={veiculo.imagem} alt={veiculo.modelo} />

      <div className="infoVeiculo">
        <h2>{veiculo.modelo}</h2>

        <p>
          {veiculo.ano} • {veiculo.km} km
        </p>

        <span className="preco">{veiculo.preco}</span>

        <button>Ver veículo</button>
      </div>

    </div>
  );
}

export default VeiculoCard;