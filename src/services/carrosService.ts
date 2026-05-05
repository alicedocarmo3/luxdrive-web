import { URL_API } from "../constants/URL_API";
import { ICarros } from "../interfaces/ICarros";

const CARS_URL = URL_API + '/cars'

export const carroServiceFetch = {
  // Buscar todos os carros
  async listar(): Promise<ICarros[]> {
    const response = await fetch(`${CARS_URL}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar carros: ${response.status}`);
    }
    
    return response.json();
  },

  // Buscar carro por ID
  async buscarPorId(id: string): Promise<ICarros> {
    const response = await fetch(`${CARS_URL}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error(`Carro não encontrado: ${response.status}`);
    }
    
    return response.json();
  },


  // Criar novo carro
  async criar(carro: Omit<ICarros, 'id'>): Promise<ICarros> {
    const response = await fetch(`${CARS_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carro),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar carro: ${response.status}`);
    }

    return response.json();
  },

  // Atualizar carro
  async atualizar(id: string, carro: Partial<ICarros>): Promise<ICarros> {
    const response = await fetch(`${CARS_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carro),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar carro: ${response.status}`);
    }

    return response.json();
  },

  // Deletar carro
  async deletar(id: string): Promise<void> {
    const response = await fetch(`${CARS_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar carro: ${response.status}`);
    }
  },
};