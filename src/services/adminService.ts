import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

/* =========================
   TIPOS
========================= */

export interface Car {
  _id?: string;
  modelo: string;
  ano: number;
  preco: number;
  km: number;
  imagens: string[];
  blindado: boolean;
  motor: string;
  cor: string;
  potencia: string;
  cambio: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  nome: string;
  email: string;
  senha?: string;
  role?: "admin" | "user";
}

export interface Event {
  _id?: string;
  nome: string;
  limite: number;
  local: string;
  data: string;
  descricao: string;
  incluso: string;
  ingressosVendidos: number;
  imagem: string;
  precoIngresso: number;
  duracao: string;
  vagasRestantes: number;
  tema:
    | "porsche"
    | "lambo"
    | "ferrari"
    | "pagani"
    | "rolls"
    | "ultimate";
  pixCode: string;
  tituloResumo: string;
  subtitulo: string;
}

export interface Marca {
  _id?: string;
  nome: string;
  linkLogo: string;
  linkBanner: string;
  descricao: string;
}

export interface Novidade {
  _id?: string;
  nome: string;
  imagem: string;
}

export interface Sede {
  _id?: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  horario: string;
}

export interface Ticket {
  _id?: string;
  usuarioId: string;
  assunto: string;
  status: "aberto" | "pendente" | "fechado";
}

/* =========================
   CARS
========================= */

export const getCars = async (): Promise<Car[]> => {
  const { data } = await API.get("/cars");
  return data;
};

export const getCarById = async (
  id: string
): Promise<Car> => {
  const { data } = await API.get(`/cars/${id}`);
  return data;
};

export const createCar = async (
  car: Car
): Promise<Car> => {
  const { data } = await API.post("/cars", car);
  return data;
};

export const updateCar = async (
  id: string,
  car: Partial<Car>
): Promise<Car> => {
  const { data } = await API.put(
    `/cars/${id}`,
    car
  );

  return data;
};

export const deleteCar = async (
  id: string
) => {
  const { data } = await API.delete(
    `/cars/${id}`
  );

  return data;
};

/* =========================
   USERS
========================= */

export const getUsers = async (): Promise<User[]> => {
  const { data } = await API.get("/users");
  return data;
};

export const createUser = async (
  user: User
): Promise<User> => {
  const { data } = await API.post(
    "/users",
    user
  );

  return data;
};

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  const { data } = await API.put(
    `/users/${id}`,
    user
  );

  return data;
};

export const deleteUser = async (
  id: string
) => {
  const { data } = await API.delete(
    `/users/${id}`
  );

  return data;
};

/* =========================
   EVENTS
========================= */

export const getEvents = async (): Promise<Event[]> => {
  const { data } = await API.get("/eventos");
  return data;
};

export const createEvent = async (
  event: Event
): Promise<Event> => {
  const { data } = await API.post(
    "/eventos",
    event
  );

  return data;
};

export const updateEvent = async (
  id: string,
  event: Partial<Event>
): Promise<Event> => {
  const { data } = await API.put(
    `/eventos/${id}`,
    event
  );

  return data;
};

export const deleteEvent = async (
  id: string
) => {
  const { data } = await API.delete(
    `/eventos/${id}`
  );

  return data;
};

/* =========================
   MARCAS
========================= */

export const getBrands = async (): Promise<Marca[]> => {
  const { data } = await API.get("/marcas");
  return data;
};

export const createBrand = async (
  brand: Marca
): Promise<Marca> => {
  const { data } = await API.post(
    "/marcas",
    brand
  );

  return data;
};

export const updateBrand = async (
  id: string,
  brand: Partial<Marca>
): Promise<Marca> => {
  const { data } = await API.put(
    `/marcas/${id}`,
    brand
  );

  return data;
};

export const deleteBrand = async (
  id: string
) => {
  const { data } = await API.delete(
    `/marcas/${id}`
  );

  return data;
};

/* =========================
   NOVIDADES
========================= */

export const getNews = async (): Promise<
  Novidade[]
> => {
  const { data } = await API.get(
    "/novidades"
  );

  return data;
};

export const createNews = async (
  news: Novidade
): Promise<Novidade> => {
  const { data } = await API.post(
    "/novidades",
    news
  );

  return data;
};

export const updateNews = async (
  id: string,
  news: Partial<Novidade>
): Promise<Novidade> => {
  const { data } = await API.put(
    `/novidades/${id}`,
    news
  );

  return data;
};

export const deleteNews = async (
  id: string
) => {
  const { data } = await API.delete(
    `/novidades/${id}`
  );

  return data;
};

/* =========================
   SEDES
========================= */

export const getSedes = async (): Promise<Sede[]> => {
  const { data } = await API.get("/sedes");
  return data;
};

export const createSede = async (
  sede: Sede
): Promise<Sede> => {
  const { data } = await API.post(
    "/sedes",
    sede
  );

  return data;
};

export const updateSede = async (
  id: string,
  sede: Partial<Sede>
): Promise<Sede> => {
  const { data } = await API.put(
    `/sedes/${id}`,
    sede
  );

  return data;
};

export const deleteSede = async (
  id: string
) => {
  const { data } = await API.delete(
    `/sedes/${id}`
  );

  return data;
};

/* =========================
   TICKETS
========================= */

export const getTickets = async (): Promise<
  Ticket[]
> => {
  const { data } = await API.get(
    "/tickets"
  );

  return data;
};

export const createTicket = async (
  ticket: Ticket
): Promise<Ticket> => {
  const { data } = await API.post(
    "/tickets",
    ticket
  );

  return data;
};

export const updateTicket = async (
  id: string,
  ticket: Partial<Ticket>
): Promise<Ticket> => {
  const { data } = await API.put(
    `/tickets/${id}`,
    ticket
  );

  return data;
};

export const deleteTicket = async (
  id: string
) => {
  const { data } = await API.delete(
    `/tickets/${id}`
  );

  return data;
};

export default API;