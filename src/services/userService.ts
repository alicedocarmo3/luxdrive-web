// services/userService.ts

import api from "./api";
import { IUsers } from "../interfaces/IUsers";

// ============================================
// LOGIN
// ============================================

export const loginService = async (
  email: string,
  senha: string
) => {
  const response = await api.post("/users/login", { email, senha });
  return response;
};

// ============================================
// CRIAR USUÁRIO (usado no painel admin)
// ============================================

export const createUser = async (
  body: IUsers
) => {
  const response = await api.post("/users", body);
  return response.data;
};

// Alias para compatibilidade com telas de registro
export const registerService = createUser;

// ============================================
// LISTAR USERS
// ============================================

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// ============================================
// BUSCAR USER POR ID
// ============================================

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// ============================================
// UPDATE USER
// ============================================

export const updateUser = async (
  id: string,
  body: Partial<IUsers>
) => {
  const response = await api.put(`/users/${id}`, body);
  return response.data;
};

// ============================================
// DELETE USER
// ============================================

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};