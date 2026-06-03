import React, { useState, useEffect } from "react";
import Filters2 from "../components/Filters2";
import { useLocation, useNavigate } from "react-router-dom";

import bannerModels from "../assets/bannermodels.png";
import "../styles/Models.css";

import { getCars } from "../services/carService";
import { getMarcas } from "../services/marcaService";

export default function Models() {

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const marcaId = Number(queryParams.get("marca"));

  const [carros, setCarros] = useState([]);
  const [marcasData, setMarcasData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtros, setFiltros] = useState({
    marca: "Todas",
    preco: "Todos",
    ano: "Todos",
    min: "",
    max: "",
    blindado: ""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [cars, marcas] = await Promise.all([
          getCars(),
          getMarcas()
        ]);

        setCarros(cars || []);
        setMarcasData(marcas || []);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!marcaId || !marcasData.length) return;

    const marca = (marcasData || []).find((m) => m.id === marcaId);

    if (marca) {
      setFiltros((prev) => ({
        ...prev,
        marca: marca.nome
      }));
    }
  }, [marcaId, marcasData]);

  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) => {
        const updated = { ...prev };

        (carros || []).forEach((car) => {
          if (!car?.imagens?.length) return;

          const currentIndex = prev[car.id] || 0;

          updated[car.id] = (currentIndex + 1) % car.imagens.length;
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [carros]);

  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const limparFiltros = () => {
    setFiltros({
      marca: "Todas",
      preco: "Todos",
      ano: "Todos",
      min: "",
      max: "",
      blindado: ""
    });
  };

  const getMarcaDoCarro = (carId) => {
    const marca = (marcasData || []).find((m) =>
      m?.carrosId?.includes(carId)
    );

    return marca?.nome || "Sem marca";
  };

  const marcaSelecionada = (marcasData || []).find(
    (marca) => marca.nome === filtros.marca
  );

  const bannerAtual =
    filtros.marca !== "Todas" && marcaSelecionada?.linkBanner
      ? marcaSelecionada.linkBanner
      : bannerModels;

  const faixasPreco = [
    { label: "Até R$ 500 mil", min: 0, max: 500000 },
    { label: "R$ 500 mil - R$ 1 milhão", min: 500000, max: 1000000 },
    { label: "Acima de R$ 1 milhão", min: 1000000, max: Infinity }
  ];

  const filtered = (carros || []).filter((car) => {

    if (filtros.marca !== "Todas") {
      const marca = (marcasData || []).find(
        (m) => m.nome === filtros.marca
      );

      if (!marca?.carrosId?.includes(car.id)) return false;
    }

    if (filtros.preco !== "Todos") {
      const faixa = faixasPreco.find((f) => f.label === filtros.preco);

      if (faixa && (car.preco < faixa.min || car.preco > faixa.max)) return false;
    }

    if (filtros.min && car.preco < Number(filtros.min)) return false;
    if (filtros.max && car.preco > Number(filtros.max)) return false;

    if (filtros.ano !== "Todos" && car.ano < Number(filtros.ano)) return false;

    if (filtros.blindado !== "" && car.blindado !== filtros.blindado) return false;

    return true;
  });

  if (loading) {
    return <div className="loading-page"><h1>Carregando carros...</h1></div>;
  }

  return (
    <div className="models-page">

      <section className="hero">
        <div className="hero-bg" />

        <div className="hero-image-wrapper">
          <img src={bannerAtual} alt="Banner Models" className="hero-image" />
        </div>

        <div className="hero-text">
          <p>LEGACY <span className="banner">D</span>RIVE</p>

          <h1>
            {filtros.marca === "Todas"
              ? "MODELS"
              : filtros.marca.toUpperCase()}
          </h1>
        </div>
      </section>

      <div className="models-layout">

        <aside className="models-sidebar">
          <Filters2
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            onLimparFiltros={limparFiltros}
            totalCarros={filtered.length}
            marcasData={marcasData}
          />
        </aside>

        <section className="showroom">
          <h2>Showroom ({filtered.length})</h2>

          {filtered.length === 0 ? (
            <p className="empty">Nenhum modelo encontrado.</p>
          ) : (
            <div className="grid">
              {filtered.map((car) => (
                <div
                  key={car.id}
                  className="card"
                  onClick={() => navigate(`/carsdetails/${car.id}`)}
                >
                  {car.blindado && <span className="badge">BLINDADO</span>}

                  <div className="card-header">
                    <span>{car.modelo}</span>
                    <span>{getMarcaDoCarro(car.id)}</span>
                  </div>

                  <div className="image-box">

                    <img
                      src={car.imagens?.[currentImages[car.id] || 0]}
                      alt={car.modelo}
                      className="car-image"
                    />

                  </div>

                  <div className="card-info">
                    <p>{getMarcaDoCarro(car.id)}</p>
                    <p>{car.ano}</p>
                    <p>R$ {car.preco?.toLocaleString("pt-BR")}</p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

      </div>

    </div>
  );
}