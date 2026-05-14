import { URL_API } from "../constants/URL_API";
import { IEvento } from "../interfaces/IEvento";

const EVENTOS_URL = URL_API + "/eventos";

export const eventoServiceFetch = {
  // Listar eventos
  async listar(): Promise<IEvento[]> {
    const response = await fetch(`${EVENTOS_URL}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.status}`);
    }

    return response.json();
  },

  // Buscar por ID
  async buscarPorId(id: string): Promise<IEvento> {
    const response = await fetch(`${EVENTOS_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Evento não encontrado: ${response.status}`);
    }

    return response.json();
  },

  // Criar evento
  async criar(evento: Omit<IEvento, "id" | "ingressosVendidos">): Promise<IEvento> {
    const response = await fetch(`${EVENTOS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...evento,
        ingressosVendidos: 0, // começa zerado
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar evento: ${response.status}`);
    }

    return response.json();
  },

  // Atualizar evento
  async atualizar(id: string, evento: Partial<IEvento>): Promise<IEvento> {
    const response = await fetch(`${EVENTOS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar evento: ${response.status}`);
    }

    return response.json();
  },

  // Deletar evento
  async deletar(id: string): Promise<void> {
    const response = await fetch(`${EVENTOS_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar evento: ${response.status}`);
    }
  },
};