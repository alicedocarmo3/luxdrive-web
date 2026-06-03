import api from "./api";
import { INovidade } from "../interfaces/INovidade";

export const getNovidades = async (): Promise<INovidade[]> => {
  const response = await api.get("/novidades");
  return response.data;
};

export const getNovidadeById = async (
  id: string
): Promise<INovidade> => {
  const response = await api.get(`/novidades/${id}`);
  return response.data;
};

export const createNovidade = async (
  novidade: INovidade
): Promise<INovidade> => {
  const response = await api.post(
    "/novidades",
    novidade
  );

  return response.data;
};

export const updateNovidade = async (
  id: string,
  novidade: Partial<INovidade>
): Promise<INovidade> => {
  const response = await api.put(
    `/novidades/${id}`,
    novidade
  );

  return response.data;
};

export const deleteNovidade = async (
  id: string
): Promise<{ message: string }> => {
  const response = await api.delete(
    `/novidades/${id}`
  );

  return response.data;
};