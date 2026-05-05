// Filters.jsx - Filtro horizontal estilo Avantgarde Premium
// Versão: 2.1.0 - Corrigido e melhorado

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, SlidersHorizontal, X, Shield, Search, Check } from 'lucide-react';
import { marcas, faixasPreco, anos } from "../../../../Backend/src/data/cars";
import '../styles/Filters.css';

const Filters = ({ filtros, onFiltroChange, onLimparFiltros, totalCarros }) => {
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [buscaMarca, setBuscaMarca] = useState('');
  const dropdownRefs = {
    marca: useRef(null),
    preco: useRef(null),
    ano: useRef(null)
  };

  // Filtrar marcas baseado na busca
  const marcasFiltradas = useMemo(() => {
    if (!buscaMarca.trim()) return marcas;
    return marcas.filter(marca => 
      marca.toLowerCase().includes(buscaMarca.toLowerCase())
    );
  }, [buscaMarca]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownAberto && dropdownRefs[dropdownAberto]?.current && 
          !dropdownRefs[dropdownAberto].current.contains(event.target)) {
        setDropdownAberto(null);
        setBuscaMarca(''); // Limpar busca ao fechar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownAberto]);

  // Fechar dropdown com tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && dropdownAberto) {
        setDropdownAberto(null);
        setBuscaMarca('');
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [dropdownAberto]);

  const handleSelect = useCallback((campo, valor) => {
    onFiltroChange(campo, valor);
    setDropdownAberto(null);
    setBuscaMarca('');
  }, [onFiltroChange]);

  const toggleDropdown = useCallback((nome) => {
    setDropdownAberto(prev => prev === nome ? null : nome);
    setBuscaMarca(''); // Limpar busca ao trocar dropdown
  }, []);

  const temFiltrosAtivos = useMemo(() => {
    return filtros.marca !== "Todas" || 
      filtros.preco !== "Todos" || 
      filtros.ano !== "Todos" ||
      filtros.blindado !== false;
  }, [filtros]);

  // Contagem de filtros ativos
  const activeFiltersCount = useMemo(() => {
    return [
      filtros.marca !== "Todas",
      filtros.preco !== "Todos",
      filtros.ano !== "Todos",
      filtros.blindado === true
    ].filter(Boolean).length;
  }, [filtros]);

  // Obter valor exibido para o botão do dropdown
  const getDisplayValue = (campo, valor) => {
    if (campo === 'preco') {
      const faixa = faixasPreco.find(f => f.label === valor);
      return faixa?.label || valor;
    }
    return valor;
  };

  return (
    <div className="filter-horizontal">
      <div className="filter-horizontal__header">
        <div className="filter-horizontal__title">
          <SlidersHorizontal className="filter-horizontal__title-icon" />
          <span>Filtrar Veículos</span>
        </div>
        <div className="filter-horizontal__count">
          {totalCarros} veículo{totalCarros !== 1 ? 's' : ''} encontrado{totalCarros !== 1 ? 's' : ''}
          {activeFiltersCount > 0 && (
            <span className="filter-horizontal__count-active">
              ({activeFiltersCount} ativo{activeFiltersCount !== 1 ? 's' : ''})
            </span>
          )}
        </div>
      </div>

      <div className="filter-horizontal__row">
        {/* Filtro Marca */}
        <div className="filter-horizontal__item">
          <label className="filter-horizontal__label" id="marca-label">
            Marca
          </label>
          <div className="filter-dropdown" ref={dropdownRefs.marca}>
            <button 
              className={`filter-dropdown__trigger ${filtros.marca !== "Todas" ? 'active' : ''}`}
              onClick={() => toggleDropdown('marca')}
              aria-expanded={dropdownAberto === 'marca'}
              aria-haspopup="listbox"
              aria-labelledby="marca-label"
            >
              <span>{getDisplayValue('marca', filtros.marca)}</span>
              <ChevronDown className={`filter-dropdown__trigger-icon ${dropdownAberto === 'marca' ? 'rotated' : ''}`} />
            </button>
            
            {dropdownAberto === 'marca' && (
              <div className="filter-dropdown__options" role="listbox">
                <div className="filter-dropdown__search">
                  <Search size={14} />
                  <input
                    type="text"
                    placeholder="Buscar marca..."
                    value={buscaMarca}
                    onChange={(e) => setBuscaMarca(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Buscar marcas"
                  />
                </div>
                <div className="filter-dropdown__options-list">
                  {marcasFiltradas.map(marca => (
                    <button
                      key={marca}
                      className={`filter-dropdown__option ${filtros.marca === marca ? 'selected' : ''}`}
                      onClick={() => handleSelect('marca', marca)}
                      role="option"
                      aria-selected={filtros.marca === marca}
                    >
                      <span>{marca}</span>
                      {filtros.marca === marca && <Check size={14} />}
                    </button>
                  ))}
                  {marcasFiltradas.length === 0 && (
                    <div className="filter-dropdown__no-results">
                      Nenhuma marca encontrada
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filtro Preço */}
        <div className="filter-horizontal__item">
          <label className="filter-horizontal__label" id="preco-label">
            Faixa de Preço
          </label>
          <div className="filter-dropdown" ref={dropdownRefs.preco}>
            <button 
              className={`filter-dropdown__trigger ${filtros.preco !== "Todos" ? 'active' : ''}`}
              onClick={() => toggleDropdown('preco')}
              aria-expanded={dropdownAberto === 'preco'}
              aria-haspopup="listbox"
              aria-labelledby="preco-label"
            >
              <span>{getDisplayValue('preco', filtros.preco)}</span>
              <ChevronDown className={`filter-dropdown__trigger-icon ${dropdownAberto === 'preco' ? 'rotated' : ''}`} />
            </button>
            
            {dropdownAberto === 'preco' && (
              <div className="filter-dropdown__options" role="listbox">
                {faixasPreco.map(faixa => (
                  <button
                    key={faixa.label}
                    className={`filter-dropdown__option ${filtros.preco === faixa.label ? 'selected' : ''}`}
                    onClick={() => handleSelect('preco', faixa.label)}
                    role="option"
                    aria-selected={filtros.preco === faixa.label}
                  >
                    <span>{faixa.label}</span>
                    {filtros.preco === faixa.label && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filtro Ano */}
        <div className="filter-horizontal__item">
          <label className="filter-horizontal__label" id="ano-label">
            Ano
          </label>
          <div className="filter-dropdown" ref={dropdownRefs.ano}>
            <button 
              className={`filter-dropdown__trigger ${filtros.ano !== "Todos" ? 'active' : ''}`}
              onClick={() => toggleDropdown('ano')}
              aria-expanded={dropdownAberto === 'ano'}
              aria-haspopup="listbox"
              aria-labelledby="ano-label"
            >
              <span>{filtros.ano}</span>
              <ChevronDown className={`filter-dropdown__trigger-icon ${dropdownAberto === 'ano' ? 'rotated' : ''}`} />
            </button>
            
            {dropdownAberto === 'ano' && (
              <div className="filter-dropdown__options filter-dropdown__options--grid" role="listbox">
                {anos.map(ano => (
                  <button
                    key={ano}
                    className={`filter-dropdown__option ${filtros.ano === ano ? 'selected' : ''}`}
                    onClick={() => handleSelect('ano', ano)}
                    role="option"
                    aria-selected={filtros.ano === ano}
                  >
                    <span>{ano}</span>
                    {filtros.ano === ano && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Toggle Blindado */}
        <div className="filter-horizontal__item filter-horizontal__item--toggle">
          <label className="filter-horizontal__label" id="blindado-label">
            Blindado
          </label>
          <button 
            className={`filter-toggle ${filtros.blindado ? 'active' : ''}`}
            onClick={() => onFiltroChange('blindado', !filtros.blindado)}
            aria-pressed={filtros.blindado}
            aria-labelledby="blindado-label"
          >
            <span className="filter-toggle__slider"></span>
            <span className="filter-toggle__label">
              {filtros.blindado ? 'Sim' : 'Não'}
            </span>
          </button>
        </div>

        {/* Limpar Filtros */}
        {temFiltrosAtivos && (
          <button 
            className="filter-horizontal__clear"
            onClick={onLimparFiltros}
            aria-label="Limpar todos os filtros"
          >
            <X size={16} />
            <span>Limpar {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
        )}
      </div>

      {/* Filtros ativos - chips */}
      {temFiltrosAtivos && (
        <div className="filter-horizontal__chips">
          {filtros.marca !== "Todas" && (
            <span className="filter-chip">
              {filtros.marca}
              <button onClick={() => onFiltroChange('marca', 'Todas')} aria-label="Remover filtro de marca">
                <X size={12} />
              </button>
            </span>
          )}
          {filtros.preco !== "Todos" && (
            <span className="filter-chip">
              {filtros.preco}
              <button onClick={() => onFiltroChange('preco', 'Todos')} aria-label="Remover filtro de preço">
                <X size={12} />
              </button>
            </span>
          )}
          {filtros.ano !== "Todos" && (
            <span className="filter-chip">
              {filtros.ano}
              <button onClick={() => onFiltroChange('ano', 'Todos')} aria-label="Remover filtro de ano">
                <X size={12} />
              </button>
            </span>
          )}
          {filtros.blindado && (
            <span className="filter-chip filter-chip--gold">
              <Shield size={12} />
              Blindado
              <button onClick={() => onFiltroChange('blindado', false)} aria-label="Remover filtro de blindado">
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Filters;