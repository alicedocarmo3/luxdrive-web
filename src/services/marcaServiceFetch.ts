import { URL_API } from "../constants/URL_API";
import { IMarca } from "../interfaces/IMarca";

const MARCAS_URL = URL_API + "/marcas";

export const marcaServiceFetch = {
  // Buscar todas as marcas
  async listar(): Promise<IMarca[]> {
    const response = await fetch(`${MARCAS_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar marcas: ${response.status}`);
    }

    return response.json();
  },

  // Buscar marca por ID
  async buscarPorId(id: string): Promise<IMarca> {
    const response = await fetch(`${MARCAS_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Marca não encontrada: ${response.status}`);
    }

    return response.json();
  },

  // Criar nova marca
  async criar(marca: Omit<IMarca, "id">): Promise<IMarca> {
    const response = await fetch(`${MARCAS_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(marca),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar marca: ${response.status}`);
    }

    return response.json();
  },

  // Atualizar marca
  async atualizar(id: string, marca: Partial<IMarca>): Promise<IMarca> {
    const response = await fetch(`${MARCAS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(marca),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar marca: ${response.status}`);
    }

    return response.json();
  },

  // Deletar marca
  async deletar(id: string): Promise<void> {
    const response = await fetch(`${MARCAS_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar marca: ${response.status}`);
    }
  },
};