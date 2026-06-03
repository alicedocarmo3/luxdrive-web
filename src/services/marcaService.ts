import api from "./api";
import { IMarca } from "../interfaces/IMarca";

// ============================================
// GET TODAS MARCAS
// ============================================

export const getMarcas = async (): Promise<IMarca[]> => {

  const response =
    await api.get<IMarca[]>(
      "/marcas"
    );

  return response.data;

};

// ============================================
// GET MARCA POR ID
// ============================================

export const getMarcaById = async (
  id: string
): Promise<IMarca> => {

  const response =
    await api.get<IMarca>(
      `/marcas/${id}`
    );

  return response.data;

};

// ============================================
// CREATE MARCA
// ============================================

export const createMarca = async (
  marca: IMarca
): Promise<IMarca> => {

  const response =
    await api.post<IMarca>(
      "/marcas",
      marca
    );

  return response.data;

};

// ============================================
// UPDATE MARCA
// ============================================

export const updateMarca = async (
  id: string,
  marca: Partial<IMarca>
): Promise<IMarca> => {

  const response =
    await api.put<IMarca>(
      `/marcas/${id}`,
      marca
    );

  return response.data;

};

// ============================================
// DELETE MARCA
// ============================================

export const deleteMarca = async (
  id: string
): Promise<{ message: string }> => {

  const response =
    await api.delete<{
      message: string;
    }>(
      `/marcas/${id}`
    );

  return response.data;

};