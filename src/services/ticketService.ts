import api from "./api";
import { ITickets } from "../interfaces/ITickets";

export const getTickets = async (): Promise<ITickets[]> => {
  const response = await api.get("/tickets");
  return response.data;
};

export const getTicketById = async (id: string): Promise<ITickets> => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (ticket: ITickets): Promise<ITickets> => {
  const response = await api.post("/tickets", ticket);
  return response.data;
};

export const updateTicket = async (
  id: string,
  ticket: Partial<ITickets>
): Promise<ITickets> => {
  const response = await api.put(`/tickets/${id}`, ticket);
  return response.data;
};

export const deleteTicket = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};