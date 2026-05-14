import { URL_API } from "../constants/URL_API";
import { ITickets } from "../interfaces/ITickets";

const TICKETS_URL = URL_API + "/tickets";

export const ticketServiceFetch = {
  // Listar tickets
  async listar(): Promise<ITickets[]> {
    const response = await fetch(`${TICKETS_URL}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar tickets: ${response.status}`);
    }

    return response.json();
  },

  // Buscar por ID
  async buscarPorId(id: string): Promise<ITickets> {
    const response = await fetch(`${TICKETS_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Ticket não encontrado: ${response.status}`);
    }

    return response.json();
  },

  // Criar ticket
  async criar(ticket: Omit<ITickets, "id">): Promise<ITickets> {
    const response = await fetch(`${TICKETS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar ticket: ${response.status}`);
    }

    return response.json();
  },

  // Atualizar ticket
  async atualizar(id: string, ticket: Partial<ITickets>): Promise<ITickets> {
    const response = await fetch(`${TICKETS_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar ticket: ${response.status}`);
    }

    return response.json();
  },

  // Deletar ticket
  async deletar(id: string): Promise<void> {
    const response = await fetch(`${TICKETS_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar ticket: ${response.status}`);
    }
  },
};