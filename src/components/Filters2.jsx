import React, { useCallback, useState } from "react";

import "../styles/Filters2.css";
import { anosData } from "../data/cars";
import { marcasData } from "../data/marcasData";

// ---------------- ICONES ----------------
const Icons = {
  ChevronDown: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),

  Sliders: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),

  X: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),

  Shield: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

// ---------------- COMPONENTE ----------------
const Filters2 = ({
  filtros,
  onFiltroChange,
  onLimparFiltros,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const activeCount = useCallback(() => {
    let count = 0;

    if (filtros.marca && filtros.marca !== "Todas")
      count++;

    if (filtros.ano && filtros.ano !== "Todos")
      count++;

    if (filtros.preco && filtros.preco !== "Todos")
      count++;

    if (filtros.order) count++;

    if (
      filtros.blindado !== undefined &&
      filtros.blindado !== null &&
      filtros.blindado !== ""
    ) {
      count++;
    }

    return count;
  }, [filtros])();

  const hasActiveFilters = activeCount > 0;

  return (
    <section className="filters-premium">
      {/* HEADER */}
      <div
        className="filters-header"
        onClick={() =>
          setIsExpanded(!isExpanded)
        }
      >
        <div className="filters-header__left">
          <span className="filters-header__icon">
            <Icons.Sliders />
          </span>

          <h3 className="filters-header__title">
            Refinar Busca
          </h3>

          {hasActiveFilters && (
            <span className="filters-badge">
              {activeCount}
            </span>
          )}
        </div>

        <span
          className={`filters-header__chevron ${
            isExpanded ? "rotated" : ""
          }`}
        >
          <Icons.ChevronDown />
        </span>
      </div>

      {/* BODY */}
      <div
        className={`filters-body ${
          isExpanded ? "expanded" : ""
        }`}
      >
        <div className="filters-grid">

          {/* MARCAS */}
          <div className="filter-group">
            <label className="filter-label">
              Marca
            </label>

            <select
              className="professional-select"
              value={filtros.marca || "Todas"}
              onChange={(e) =>
                onFiltroChange(
                  "marca",
                  e.target.value
                )
              }
            >
              <option value="Todas">
                Todas as Marcas
              </option>

              {marcasData.map((marca) => (
                <option
                  key={marca.id}
                  value={marca.nome}
                >
                  {marca.nome.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* ANOS */}
          <div className="filter-group">
            <label className="filter-label">
              Ano Mínimo
            </label>

            <select
              className="professional-select"
              value={filtros.ano || "Todos"}
              onChange={(e) =>
                onFiltroChange(
                  "ano",
                  e.target.value
                )
              }
            >
              <option value="Todos">
                Todos
              </option>

              {anosData
                .filter(
                  (a) => a !== "Todos"
                )
                .sort(
                  (a, b) =>
                    Number(b) - Number(a)
                )
                .map((ano) => (
                  <option
                    key={ano}
                    value={ano}
                  >
                    {ano}
                  </option>
                ))}
            </select>
          </div>

          {/* PREÇO */}
          <div className="filter-group filter-group--price">
            <label className="filter-label">
              Faixa de Preço
            </label>

            <select
              className="professional-select"
              value={filtros.preco || "Todos"}
              onChange={(e) =>
                onFiltroChange(
                  "preco",
                  e.target.value
                )
              }
            >
              <option value="Todos">
                Todas as Faixas
              </option>

              <option value="Até R$ 500 mil">
                Até R$ 500 mil
              </option>

              <option value="R$ 500 mil - R$ 1 milhão">
                R$ 500 mil - R$ 1 milhão
              </option>

              <option value="R$ 1 milhão - R$ 2 milhões">
                R$ 1 milhão - R$ 2 milhões
              </option>

              <option value="Acima de R$ 2 milhões">
                Acima de R$ 2 milhões
              </option>
            </select>
          </div>

          {/* BLINDAGEM */}
          <div className="filter-group">
            <label className="filter-label">
              <Icons.Shield /> Blindagem
            </label>

            <div className="blindado-toggle-group">
              <button
                type="button"
                className={`toggle-btn ${
                  filtros.blindado === true
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  onFiltroChange(
                    "blindado",
                    filtros.blindado === true
                      ? ""
                      : true
                  )
                }
              >
                Sim
              </button>

              <button
                type="button"
                className={`toggle-btn ${
                  filtros.blindado === false
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  onFiltroChange(
                    "blindado",
                    filtros.blindado === false
                      ? ""
                      : false
                  )
                }
              >
                Não
              </button>
            </div>
          </div>

          {/* LIMPAR */}
          <div className="filter-group filter-group--action">
            <label
              className="filter-label"
              style={{ opacity: 0 }}
            >
              Limpar
            </label>

            <button
              className={`btn-clear ${
                hasActiveFilters
                  ? "btn-clear--active"
                  : ""
              }`}
              onClick={onLimparFiltros}
              disabled={!hasActiveFilters}
            >
              <Icons.X />
              Limpar Filtros
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Filters2;