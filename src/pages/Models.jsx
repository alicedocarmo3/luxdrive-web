import React, { useState, useEffect } from "react";
import { carros, faixasPreco } from "../data/cars";
import { marcasData } from "../data/marcasData";
import { useLocation } from "react-router-dom";
import Filters2 from "../components/Filters2";

import bannerModels from "../assets/bannermodels.png";

import "../styles/Models.css";

export default function Models() {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const marcaId = Number(queryParams.get("marca"));

  // ============================================
  // FILTROS
  // ============================================

  const [filtros, setFiltros] = useState({
    marca: "Todas",
    preco: "Todos",
    ano: "Todos",
    min: "",
    max: "",
    blindado: ""
  });

  // ============================================
  // PEGAR MARCA DA URL
  // ============================================

  useEffect(() => {

    if (!marcaId) return;

    const marca = marcasData.find(
      (m) => m.id === marcaId
    );

    if (marca) {

      setFiltros((prev) => ({
        ...prev,
        marca: marca.nome
      }));

    }

  }, [marcaId]);

  // ============================================
  // CAROUSEL
  // ============================================

  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImages((prev) => {

        const updated = { ...prev };

        carros.forEach((car) => {

          if (!car.imagens?.length) return;

          const currentIndex = prev[car.id] || 0;

          updated[car.id] =
            (currentIndex + 1) % car.imagens.length;

        });

        return updated;

      });

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  // ============================================
  // ALTERAR FILTROS
  // ============================================

  const handleFiltroChange = (campo, valor) => {

    setFiltros((prev) => ({
      ...prev,
      [campo]: valor
    }));

  };

  // ============================================
  // LIMPAR FILTROS
  // ============================================

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

  // ============================================
  // PEGAR MARCA ATUAL
  // ============================================

  const marcaSelecionada = marcasData.find(
    (marca) => marca.nome === filtros.marca
  );

  // ============================================
  // BANNER DINÂMICO
  // ============================================

  const bannerAtual =
    filtros.marca !== "Todas" &&
    marcaSelecionada?.linkBanner
      ? marcaSelecionada.linkBanner
      : bannerModels;

  // ============================================
  // FILTRAGEM
  // ============================================

  const filtered = carros.filter((car) => {

    // FILTRO DE MARCA
    if (filtros.marca !== "Todas") {

      const marca = marcasData.find(
        (m) => m.nome === filtros.marca
      );

      if (!marca?.carrosId?.includes(car.id)) {
        return false;
      }

    }

    // FILTRO DE PREÇO
    if (filtros.preco !== "Todos") {

      const faixa = faixasPreco.find(
        (f) => f.label === filtros.preco
      );

      if (
        faixa &&
        (
          car.preco < faixa.min ||
          car.preco > faixa.max
        )
      ) {
        return false;
      }

    }

    // PREÇO MÍNIMO
    if (
      filtros.min &&
      car.preco < Number(filtros.min)
    ) {
      return false;
    }

    // PREÇO MÁXIMO
    if (
      filtros.max &&
      car.preco > Number(filtros.max)
    ) {
      return false;
    }

    // FILTRO DE ANO
    if (
      filtros.ano !== "Todos" &&
      car.ano < Number(filtros.ano)
    ) {
      return false;
    }

    // FILTRO BLINDADO
    if (
      filtros.blindado !== "" &&
      car.blindado !== filtros.blindado
    ) {
      return false;
    }

    return true;

  });

  // ============================================
  // PEGAR NOME DA MARCA
  // ============================================

  const getMarcaDoCarro = (carId) => {

    const marca = marcasData.find(
      (marca) =>
        marca.carrosId?.includes(carId)
    );

    return marca?.nome || "Sem marca";

  };

  // ============================================
  // JSX
  // ============================================

  return (

    <div className="models-page">

      {/* HERO */}
      <section className="hero">

        <div className="hero-bg" />

        <div className="hero-image-wrapper">

          <img
            src={bannerAtual}
            alt="Banner Models"
            className="hero-image"
          />

        </div>

        <div className="hero-text">

          <p>
            LEGACY
            <span className="banner">D</span>
            RIVE
          </p>

          <h1>
            {filtros.marca === "Todas"
              ? "MODELS"
              : filtros.marca.toUpperCase()}
          </h1>

        </div>

      </section>

      {/* LAYOUT */}
      <div className="models-layout">

        {/* SIDEBAR */}
        <aside className="models-sidebar">

          <Filters2
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            onLimparFiltros={limparFiltros}
            totalCarros={filtered.length}
          />

        </aside>

        {/* SHOWROOM */}
        <section className="showroom">

          <h2>
            Showroom ({filtered.length})
          </h2>

          {filtered.length === 0 ? (

            <p className="empty">
              Nenhum modelo encontrado.
            </p>

          ) : (

            <div className="grid">

              {filtered.map((car) => (

                <div
                  key={car.id}
                  className="card"
                >

                  {/* BLINDADO */}
                  {car.blindado && (
                    <span className="badge">
                      BLINDADO
                    </span>
                  )}

                  {/* HEADER */}
                  <div className="card-header">

                    <span>{car.modelo}</span>

                    <span>
                      {getMarcaDoCarro(car.id)}
                    </span>

                  </div>

                  {/* IMAGE */}
                  <div className="image-box">

                    {/* SETA ESQUERDA */}
                    <button
                      className="arrow left"
                      onClick={() => {

                        setCurrentImages((prev) => {

                          const total = car.imagens.length;

                          const current =
                            prev[car.id] || 0;

                          return {
                            ...prev,
                            [car.id]:
                              current === 0
                                ? total - 1
                                : current - 1
                          };

                        });

                      }}
                    >
                      ❮
                    </button>

                    {/* IMAGEM */}
                    <img
                      src={
                        car.imagens[
                          currentImages[car.id] || 0
                        ]
                      }
                      alt={car.modelo}
                      className="car-image"
                    />

                    {/* SETA DIREITA */}
                    <button
                      className="arrow right"
                      onClick={() => {

                        setCurrentImages((prev) => {

                          const total =
                            car.imagens.length;

                          const current =
                            prev[car.id] || 0;

                          return {
                            ...prev,
                            [car.id]:
                              (current + 1) % total
                          };

                        });

                      }}
                    >
                      ❯
                    </button>

                    {/* DOTS */}
                    <div className="carousel-dots">

                      {car.imagens.map((_, index) => (

                        <span
                          key={index}
                          className={`dot ${
                            index ===
                            (
                              currentImages[car.id] || 0
                            )
                              ? "active"
                              : ""
                          }`}
                        />

                      ))}

                    </div>

                  </div>

                  {/* INFO */}
                  <div className="card-info">

                    <p className="marca">
                      {getMarcaDoCarro(car.id)}
                    </p>

                    <p className="ano">
                      {car.ano}
                    </p>

                    <p className="price">
                      R$ {car.preco.toLocaleString("pt-BR")}
                    </p>

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