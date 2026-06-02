import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

/* =========================
   TIPOS GERAIS
========================= */

export interface Car {
   id: number
  modelo: string
  ano: number
  preco: number
  km: number
  imagens:string[]
  blindado: boolean
  motor: string
  cor: string
  potencia: string
  cambio:string
  sedeId: number
}

export interface User {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  role?: "admin" | "user";
}

export interface Event {
  id: number;
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
  tema: "porsche" | "lambo" | "ferrari" | "pagani" | "rolls" | "ultimate";
  pixCode: string;
  tituloResumo: string;
  subtitulo: string;
}

export interface Marca {
  id: number
  nome: string
  linkLogo: string
  linkBanner: string
  descricao: string
  carrosId?: number[]
}

export interface Novidades {
  id: number
    nome: string
    imagem: string
}

export interface Sede {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  horario: string;
  carrosId: number[]
}

export interface Ticket {
  id?: number;
  usuarioId: number;
  assunto: string;
  status: "aberto" | "fechado" | "pendente";
}

/* =========================
   CARS
========================= */

export const getCars = async () =>
  (await API.get<Car[]>("/cars")).data;

export const createCar = async (car: Car) =>
  (await API.post<Car>("/cars", car)).data;

export const updateCar = async (id: number, car: Car) =>
  (await API.put<Car>(`/cars/${id}`, car)).data;

export const deleteCar = async (id: number) =>
  API.delete(`/cars/${id}`);

/* =========================
   USERS
========================= */

export const getUsers = async () =>
  (await API.get<User[]>("/users")).data;

export const createUser = async (user: User) =>
  (await API.post<User>("/users", user)).data;

export const updateUser = async (id: number, user: User) =>
  (await API.put<User>(`/users/${id}`, user)).data;

export const deleteUser = async (id: number) =>
  API.delete(`/users/${id}`);

/* =========================
   EVENTS
========================= */

export const getEvents = async () =>
  (await API.get<Event[]>("/events")).data;

export const createEvent = async (event: Event) =>
  (await API.post<Event>("/events", event)).data;

export const updateEvent = async (id: number, event: Event) =>
  (await API.put<Event>(`/events/${id}`, event)).data;

export const deleteEvent = async (id: number) =>
  API.delete(`/events/${id}`);

/* =========================
   BRANDS (MARCAS)
========================= */

export const getBrands = async () =>
  (await API.get<Marca[]>("/brands")).data;

export const createBrand = async (brand: Marca) =>
  (await API.post<Marca>("/brands", brand)).data;

export const updateBrand = async (id: number, brand: Marca) =>
  (await API.put<Marca>(`/brands/${id}`, brand)).data;

export const deleteBrand = async (id: number) =>
  API.delete(`/brands/${id}`);

/* =========================
   NEWS (NOVIDADES)
========================= */

export const getNews = async () =>
  (await API.get<Novidades[]>("/news")).data;

export const createNews = async (news: Novidades) =>
  (await API.post<Novidades>("/news", news)).data;

export const updateNews = async (id: number, news: Novidades) =>
  (await API.put<Novidades>(`/news/${id}`, news)).data;

export const deleteNews = async (id: number) =>
  API.delete(`/news/${id}`);

/* =========================
   SEDE (HQ)
========================= */

export const getSedes = async () =>
  (await API.get<Sede[]>("/sede")).data;

export const createSede = async (sede: Sede) =>
  (await API.post<Sede>("/sede", sede)).data;

export const updateSede = async (id: number, sede: Sede) =>
  (await API.put<Sede>(`/sede/${id}`, sede)).data;

export const deleteSede = async (id: number) =>
  API.delete(`/sede/${id}`);

/* =========================
   TICKETS
========================= */

export const getTickets = async () =>
  (await API.get<Ticket[]>("/tickets")).data;

export const createTicket = async (ticket: Ticket) =>
  (await API.post<Ticket>("/tickets", ticket)).data;

export const updateTicket = async (id: number, ticket: Ticket) =>
  (await API.put<Ticket>(`/tickets/${id}`, ticket)).data;

export const deleteTicket = async (id: number) =>
  API.delete(`/tickets/${id}`);