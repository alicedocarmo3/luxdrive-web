import { URL_API } from "../constants/URL_API";
import { ISede } from "../interfaces/ISede";

const SEDES_URL = URL_API + "/sedes";

export const sedeServiceFetch = {
  // Listar sedes
  async listar(): Promise<ISede[]> {
    const response = await fetch(`${SEDES_URL}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar sedes: ${response.status}`);
    }

    return response.json();
  },

  // Buscar por ID
  async buscarPorId(id: string): Promise<ISede> {
    const response = await fetch(`${SEDES_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Sede não encontrada: ${response.status}`);
    }

    return response.json();
  },

  // Criar sede
  async criar(sede: Omit<ISede, "id">): Promise<ISede> {
    const response = await fetch(`${SEDES_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sede),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar sede: ${response.status}`);
    }

    return response.json();
  },

  // Atualizar sede
  async atualizar(id: string, sede: Partial<ISede>): Promise<ISede> {
    const response = await fetch(`${SEDES_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sede),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar sede: ${response.status}`);
    }

    return response.json();
  },

  // Deletar sede
  async deletar(id: string): Promise<void> {
    const response = await fetch(`${SEDES_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar sede: ${response.status}`);
    }
  },
};