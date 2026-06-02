import api from "./api";
import { ISede } from "../interfaces/ISede";

export const getSedes = async (): Promise<ISede[]> => {
  const response = await api.get("/sedes");
  return response.data;
};

export const getSedeById = async (
  id: string
): Promise<ISede> => {
  const response = await api.get(`/sedes/${id}`);
  return response.data;
};

export const createSede = async (
  sede: ISede
): Promise<ISede> => {
  const response = await api.post("/sedes", sede);
  return response.data;
};

export const updateSede = async (
  id: string,
  sede: Partial<ISede>
): Promise<ISede> => {
  const response = await api.put(`/sedes/${id}`, sede);
  return response.data;
};

export const deleteSede = async (
  id: string
): Promise<{ message: string }> => {
  const response = await api.delete(`/sedes/${id}`);
  return response.data;
};