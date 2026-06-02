import { ICarro } from "../interfaces/ICarro";
import api from "./api";

// ======================================
// BUSCAR TODOS OS CARROS
// ======================================
export const getCars = async () => {

  const response =
    await api.get(
      "/cars"
    );

  return response.data;

};

// ======================================
// BUSCAR CARRO POR ID
// ======================================
export const getCarById = async (
  id: string
) => {

  const response =
    await api.get(
      `/cars/${id}`
    );

  return response.data;

};

// ======================================
// CRIAR CARRO
// ======================================
export const createCar = async (
  car: ICarro
) => {

  const response =
    await api.post(
      "/cars",
      car
    );

  return response.data;

};

// ======================================
// ATUALIZAR CARRO
// ======================================
export const updateCar = async (
  id: string,
  car: ICarro
) => {

  const response =
    await api.put(
      `/cars/${id}`,
      car
    );

  return response.data;

};

// ======================================
// DELETAR CARRO
// ======================================
export const deleteCar = async (
  id: string
) => {

  const response =
    await api.delete(
      `/cars/${id}`
    );

  return response.data;

};

// ======================================
// BUSCAR MARCAS
// ======================================
export const getBrands = async () => {

  const response =
    await api.get(
      "/marcas"
    );

  return response.data;

};