// Filters2.jsx - Filtro lateral estilo showroom premium
// Versão: 2.1.0 - Corrigido e melhorado

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Filter, 
  ChevronRight, 
  Shield, 
  Zap, 
  Gauge, 
  Calendar, 
  Tag,
  X,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';
import { marcas, faixasPreco, anos } from "../../../../Backend/src/data/cars";
import '../styles/Filters2.css';
const Filters2 = ({ filtros, onFiltroChange, onLimparFiltros, totalCarros }) => {
  const [secoesAbertas, setSecoesAbertas] = useState({
    marca: true,
    preco: true,
    ano: true,
    especiais: true
  });
  const [buscaMarca, setBuscaMarca] = useState('');

  const toggleSecao = useCallback((secao) => {
    setSecoesAbertas(prev => ({
      ...prev,
      [secao]: !prev[secao]
    }));
  }, []);

  // Filtrar marcas baseado na busca
  const marcasFiltradas = useMemo(() => {
    if (!buscaMarca.trim()) return marcas;
    return marcas.filter(marca => 
      marca.toLowerCase().includes(buscaMarca.toLowerCase())
    );
  }, [buscaMarca]);

  // Contagem de filtros ativos
  const activeFiltersCount = useMemo(() => {
    return [
      filtros.marca !== "Todas",
      filtros.preco !== "Todos",
      filtros.ano !== "Todos",
      filtros.blindado === true
    ].filter(Boolean).length;
  }, [filtros]);

  // Lista de filtros ativos para exibição
  const activeFiltersList = useMemo(() => {
    const list = [];
    if (filtros.marca !== "Todas") list.push({ type: 'marca', value: filtros.marca, label: 'Marca' });
    if (filtros.preco !== "Todos") list.push({ type: 'preco', value: filtros.preco, label: 'Preço' });
    if (filtros.ano !== "Todos") list.push({ type: 'ano', value: filtros.ano, label: 'Ano' });
    if (filtros.blindado) list.push({ type: 'blindado', value: 'Blindado', label: 'Blindado' });
    return list;
  }, [filtros]);

  const handleRemoveFilter = useCallback((type) => {
    switch(type) {
      case 'marca':
        onFiltroChange('marca', 'Todas');
        break;
      case 'preco':
        onFiltroChange('preco', 'Todos');
        break;
      case 'ano':
        onFiltroChange('ano', 'Todos');
        break;
      case 'blindado':
        onFiltroChange('blindado', false);
        break;
      default:
        break;
    }
  }, [onFiltroChange]);

  // Resetar busca ao fechar seção
  const handleToggleSecao = useCallback((secao) => {
    if (secao === 'marca' && secoesAbertas.marca) {
      setBuscaMarca('');
    }
    toggleSecao(secao);
  }, [secoesAbertas.marca, toggleSecao]);

  // Obter a faixa de preço selecionada para exibição
  const getPrecoLabel = useCallback((label) => {
    const faixa = faixasPreco.find(f => f.label === label);
    return faixa?.label || label;
  }, []);

  return (
    <div className="filter-sidebar">
      <div className="filter-sidebar__header">
        <div className="filter-sidebar__title">
          <Filter className="filter-sidebar__title-icon" />
          <span>Filtros Avançados</span>
        </div>
        {activeFiltersCount > 0 && (
          <button 
            className="filter-sidebar__clear"
            onClick={onLimparFiltros}
            aria-label={`Limpar ${activeFiltersCount} filtro${activeFiltersCount !== 1 ? 's' : ''} ativo${activeFiltersCount !== 1 ? 's' : ''}`}
          >
            <X size={16} />
            <span>Limpar tudo</span>
          </button>
        )}
      </div>

      <div className="filter-sidebar__count">
        <span className="filter-sidebar__count-number">{totalCarros}</span>
        <span className="filter-sidebar__count-text">
          veículo{totalCarros !== 1 ? 's' : ''} encontrado{totalCarros !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Filtros ativos - chips */}
      {activeFiltersCount > 0 && (
        <div className="filter-sidebar__active-filters">
          <div className="filter-sidebar__active-filters-title">
            Filtros aplicados
          </div>
          <div className="filter-sidebar__active-filters-list">
            {activeFiltersList.map((filter, index) => (
              <div key={index} className="filter-sidebar__active-chip">
                <span className="filter-sidebar__active-chip-label">{filter.label}:</span>
                <span className="filter-sidebar__active-chip-value">{filter.value}</span>
                <button 
                  onClick={() => handleRemoveFilter(filter.type)}
                  aria-label={`Remover filtro de ${filter.label}`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção Marca */}
      <div className="filter-sidebar__section">
        <button 
          className="filter-sidebar__section-header"
          onClick={() => handleToggleSecao('marca')}
          aria-expanded={secoesAbertas.marca}
        >
          <div className="filter-sidebar__section-title">
            <Tag className="filter-sidebar__section-icon" />
            <span>Marca</span>
            {filtros.marca !== "Todas" && (
              <span className="filter-sidebar__section-badge">{filtros.marca}</span>
            )}
          </div>
          <ChevronRight className={`filter-sidebar__section-arrow ${secoesAbertas.marca ? 'rotated' : ''}`} />
        </button>
        
        {secoesAbertas.marca && (
          <div className="filter-sidebar__section-content">
            <div className="filter-sidebar__search">
              <Search className="filter-sidebar__search-icon" />
              <input 
                type="text"
                placeholder="Buscar marca..."
                value={buscaMarca}
                onChange={(e) => setBuscaMarca(e.target.value)}
                aria-label="Buscar marcas"
              />
            </div>
            <div className="filter-sidebar__grid filter-sidebar__grid--scrollable">
              {marcasFiltradas.map(marca => (
                <button
                  key={marca}
                  className={`filter-sidebar__chip ${filtros.marca === marca ? 'active' : ''}`}
                  onClick={() => onFiltroChange('marca', marca)}
                  aria-pressed={filtros.marca === marca}
                >
                  {marca}
                  {filtros.marca === marca && <Check size={12} />}
                </button>
              ))}
              {marcasFiltradas.length === 0 && (
                <div className="filter-sidebar__no-results">
                  Nenhuma marca encontrada
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Seção Preço */}
      <div className="filter-sidebar__section">
        <button 
          className="filter-sidebar__section-header"
          onClick={() => toggleSecao('preco')}
          aria-expanded={secoesAbertas.preco}
        >
          <div className="filter-sidebar__section-title">
            <Gauge className="filter-sidebar__section-icon" />
            <span>Faixa de Preço</span>
            {filtros.preco !== "Todos" && (
              <span className="filter-sidebar__section-badge">{getPrecoLabel(filtros.preco)}</span>
            )}
          </div>
          <ChevronRight className={`filter-sidebar__section-arrow ${secoesAbertas.preco ? 'rotated' : ''}`} />
        </button>
        
        {secoesAbertas.preco && (
          <div className="filter-sidebar__section-content">
            <div className="filter-sidebar__radio-group">
              <label className="filter-sidebar__radio">
                <input
                  type="radio"
                  name="preco"
                  checked={filtros.preco === "Todos"}
                  onChange={() => onFiltroChange('preco', 'Todos')}
                />
                <span className="filter-sidebar__radio-custom"></span>
                <span className="filter-sidebar__radio-label">Todos os preços</span>
              </label>
              {faixasPreco.map(faixa => (
                <label key={faixa.label} className="filter-sidebar__radio">
                  <input
                    type="radio"
                    name="preco"
                    checked={filtros.preco === faixa.label}
                    onChange={() => onFiltroChange('preco', faixa.label)}
                  />
                  <span className="filter-sidebar__radio-custom"></span>
                  <span className="filter-sidebar__radio-label">{faixa.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Seção Ano */}
      <div className="filter-sidebar__section">
        <button 
          className="filter-sidebar__section-header"
          onClick={() => toggleSecao('ano')}
          aria-expanded={secoesAbertas.ano}
        >
          <div className="filter-sidebar__section-title">
            <Calendar className="filter-sidebar__section-icon" />
            <span>Ano</span>
            {filtros.ano !== "Todos" && (
              <span className="filter-sidebar__section-badge">{filtros.ano}</span>
            )}
          </div>
          <ChevronRight className={`filter-sidebar__section-arrow ${secoesAbertas.ano ? 'rotated' : ''}`} />
        </button>
        
        {secoesAbertas.ano && (
          <div className="filter-sidebar__section-content">
            <div className="filter-sidebar__grid filter-sidebar__grid--3cols">
              <button
                className={`filter-sidebar__chip ${filtros.ano === "Todos" ? 'active' : ''}`}
                onClick={() => onFiltroChange('ano', 'Todos')}
              >
                Todos
                {filtros.ano === "Todos" && <Check size={12} />}
              </button>
              {anos.map(ano => (
                <button
                  key={ano}
                  className={`filter-sidebar__chip ${filtros.ano === ano ? 'active' : ''}`}
                  onClick={() => onFiltroChange('ano', ano)}
                  aria-pressed={filtros.ano === ano}
                >
                  {ano}
                  {filtros.ano === ano && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Seção Especiais */}
      <div className="filter-sidebar__section">
        <button 
          className="filter-sidebar__section-header"
          onClick={() => toggleSecao('especiais')}
          aria-expanded={secoesAbertas.especiais}
        >
          <div className="filter-sidebar__section-title">
            <Zap className="filter-sidebar__section-icon" />
            <span>Características Especiais</span>
          </div>
          <ChevronRight className={`filter-sidebar__section-arrow ${secoesAbertas.especiais ? 'rotated' : ''}`} />
        </button>
        
        {secoesAbertas.especiais && (
          <div className="filter-sidebar__section-content">
            <button 
              className={`filter-sidebar__special ${filtros.blindado ? 'active' : ''}`}
              onClick={() => onFiltroChange('blindado', !filtros.blindado)}
              aria-pressed={filtros.blindado}
            >
              <div className="filter-sidebar__special-icon">
                <Shield size={24} />
              </div>
              <div className="filter-sidebar__special-info">
                <span className="filter-sidebar__special-title">Blindados</span>
                <span className="filter-sidebar__special-desc">Apenas veículos com blindagem</span>
              </div>
              <div className="filter-sidebar__special-check">
                {filtros.blindado && <Check size={16} />}
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Botão de reset rápido (mobile) */}
      {activeFiltersCount > 0 && (
        <button className="filter-sidebar__reset-mobile" onClick={onLimparFiltros}>
          <X size={16} />
          <span>Limpar todos os filtros ({activeFiltersCount})</span>
        </button>
      )}
    </div>
  );
};

export default Filters2;