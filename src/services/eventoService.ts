import api from "./api";
import { IEvento } from "../interfaces/IEvento";

// ============================================
// GET TODOS EVENTOS
// ============================================

export const getEventos = async (): Promise<IEvento[]> => {

  const response = await api.get<IEvento[]>(
    "/eventos"
  );

  return response.data;

};

// ============================================
// GET EVENTO POR ID
// ============================================

export const getEventoById = async (
  id: string
): Promise<IEvento> => {

  const response =
    await api.get<IEvento>(
      `/eventos/${id}`
    );

  return response.data;

};

// ============================================
// CREATE EVENTO
// ============================================

export const createEvento = async (
  evento: IEvento
): Promise<IEvento> => {

  const response =
    await api.post<IEvento>(
      "/eventos",
      evento
    );

  return response.data;

};

// ============================================
// UPDATE EVENTO
// ============================================

export const updateEvento = async (
  id: string,
  evento: Partial<IEvento>
): Promise<IEvento> => {

  const response =
    await api.put<IEvento>(
      `/eventos/${id}`,
      evento
    );

  return response.data;

};

// ============================================
// DELETE EVENTO
// ============================================

export const deleteEvento = async (
  id: string
): Promise<{ message: string }> => {

  const response =
    await api.delete<{
      message: string;
    }>(
      `/eventos/${id}`
    );

  return response.data;

};
export const comprarIngresso = async (
  eventoId: string,
  ingressoData: any
) => {
  const response = await api.post(
    `/eventos/${eventoId}/comprar`,
    ingressoData
  );
  return response.data;
};