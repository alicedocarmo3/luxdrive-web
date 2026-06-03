import React, { useCallback, useEffect, useState } from "react";
import "../styles/Filters2.css";
import { getCars, getBrands } from "../services/carService";

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
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="20" y1="21" x2="20" y2="16" />
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
  onOrdenarPreco,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [anosData, setAnosData] = useState([]);
  const [marcasData, setMarcasData] = useState([]);

  const [ordemPreco, setOrdemPreco] = useState("");

  // ============================================
  // BUSCAR DADOS
  // ============================================
  useEffect(() => {
    const carregarDados = async () => {
      try {
        // ---------------- CARROS ----------------
        const responseCars = await getCars();

        const carros = Array.isArray(responseCars)
          ? responseCars
          : responseCars?.data || [];

        // ---------------- ANOS ----------------
        const anosUnicos = [
          ...new Set(
            carros
              .map((c) => c?.ano)
              .filter((ano) => ano !== undefined && ano !== null)
          ),
        ];

        setAnosData(anosUnicos);

        // ---------------- MARCAS ----------------
        try {
          const responseBrands = await getBrands();

          const marcas = Array.isArray(responseBrands)
            ? responseBrands
            : responseBrands?.data || [];

          setMarcasData(marcas);
        } catch (error) {
          console.warn(
            "API de marcas não encontrada. Recuperando marcas dos carros."
          );

          const marcasUnicas = [
            ...new Map(
              carros
                .filter((c) => c?.marca)
                .map((c, index) => [
                  c.marca,
                  {
                    id: c.id || index,
                    nome: c.marca,
                  },
                ])
            ).values(),
          ];

          setMarcasData(marcasUnicas);
        }
      } catch (error) {
        console.error("Erro ao carregar filtros:", error);
      }
    };

    carregarDados();
  }, []);

  // ============================================
  // CONTAGEM FILTROS
  // ============================================
  const activeCount = useCallback(() => {
    let count = 0;

    if (filtros?.marca && filtros.marca !== "Todas") count++;

    if (filtros?.ano && filtros.ano !== "Todos") count++;

    if (filtros?.preco && filtros.preco !== "Todos") count++;

    if (
      filtros?.blindado !== "" &&
      filtros?.blindado !== undefined &&
      filtros?.blindado !== null
    ) {
      count++;
    }

    if (ordemPreco) count++;

    return count;
  }, [filtros, ordemPreco])();

  const hasActiveFilters = activeCount > 0;

  // ============================================
  // ORDENAÇÃO PREÇO
  // ============================================
  const handleOrdenarPreco = (tipo) => {
    const novaOrdem = ordemPreco === tipo ? "" : tipo;

    setOrdemPreco(novaOrdem);

    if (onOrdenarPreco) {
      onOrdenarPreco(novaOrdem);
    }
  };

  return (
    <section className="filters-premium">
      <div className="filters-grid">
        {/* MARCA */}
        <div className="filter-group">
          <label>Marca</label>

          <select
            className="professional-select"
            value={filtros?.marca || "Todas"}
            onChange={(e) => onFiltroChange("marca", e.target.value)}
          >
            <option value="Todas">Todas</option>

            {marcasData.map((marca) => (
              <option
                key={marca?.id || marca?.nome}
                value={marca?.nome || ""}
              >
                {marca?.nome?.toUpperCase?.() || "SEM MARCA"}
              </option>
            ))}
          </select>
        </div>

        {/* ANO */}
        <div className="filter-group">
          <label>Ano</label>

          <select
            className="professional-select"
            value={filtros?.ano || "Todos"}
            onChange={(e) => onFiltroChange("ano", e.target.value)}
          >
            <option value="Todos">Todos</option>

            {anosData
              .filter((a) => a !== "Todos")
              .sort((a, b) => Number(b) - Number(a))
              .map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
          </select>
        </div>

        {/* PREÇO */}
        <div className="filter-group">
          <label>Preço</label>

          <select
            className="professional-select"
            value={filtros?.preco || "Todos"}
            onChange={(e) => onFiltroChange("preco", e.target.value)}
          >
            <option value="Todos">Todos</option>

            <option value="Até R$ 500 mil">
              Até R$ 500 mil
            </option>

            <option value="R$ 500 mil - R$ 1 milhão">
              R$ 500 mil - R$ 1 milhão
            </option>

            <option value="Acima de R$ 2 milhões">
              Acima de R$ 2 milhões
            </option>
          </select>
        </div>

        {/* ORDENAR PREÇO */}
        <div className="filter-group">
          <label>Ordenar preço</label>

          <div className="blindado-toggle-group">
            <button
              type="button"
              className={`toggle-btn ${
                ordemPreco === "asc" ? "active" : ""
              }`}
              onClick={() => handleOrdenarPreco("asc")}
            >
              Menor → Maior
            </button>

            <button
              type="button"
              className={`toggle-btn ${
                ordemPreco === "desc" ? "active" : ""
              }`}
              onClick={() => handleOrdenarPreco("desc")}
            >
              Maior → Menor
            </button>
          </div>
        </div>

        {/* BLINDADO */}
        <div className="filter-group">
          <label>Blindagem</label>

          <div className="blindado-toggle-group">
            <button
              type="button"
              className={`toggle-btn ${
                filtros?.blindado === true ? "active" : ""
              }`}
              onClick={() =>
                onFiltroChange(
                  "blindado",
                  filtros?.blindado === true ? "" : true
                )
              }
            >
              Sim
            </button>

            <button
              type="button"
              className={`toggle-btn ${
                filtros?.blindado === false ? "active" : ""
              }`}
              onClick={() =>
                onFiltroChange(
                  "blindado",
                  filtros?.blindado === false ? "" : false
                )
              }
            >
              Não
            </button>
          </div>
        </div>

        {/* LIMPAR */}
        <div className="filter-group filter-group--action">
          <button
            type="button"
            className="btn-clear"
            disabled={!hasActiveFilters}
            onClick={() => {
              setOrdemPreco("");

              if (onOrdenarPreco) {
                onOrdenarPreco("");
              }

              onLimparFiltros();
            }}
          >
            <Icons.X /> Limpar Filtros
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filters2;