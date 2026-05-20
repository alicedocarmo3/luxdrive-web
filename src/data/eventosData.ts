import { IEvento } from "../interfaces/IEvento";

import porscheCenter from "../assets/cars/porsche/porscheCenter.jpg"
import lamborghiniArena from "../assets/cars/lamborghini/lamborghiniArena.jpg"
import ferrariExpo from "../assets/cars/ferrari/ferrariExpo.jpg"
import paganiUtopia from "../assets/cars/pagani/paganiUtopia.jpg"
import RollsRoyceEvent from "../assets/cars/RollsRoyce/RollsRoyceEvent.jpg"
import garageExpo from "../assets/cars/garagem/garageExpo.jpg"

export const eventos: IEvento[] = [
  {
    id: 1,
    nome: "Porsche Experience",
    limite: 300,
    local: "Porsche Center, SP",
    data: "2026-08-15",
    descricao: "Transforme cada curva em uma obra de arte da engenharia.",
    ingressosVendidos: 145,
    imagem: porscheCenter
  },
  {
    id: 2,
    nome: "Lamborghini Arena",
    limite: 200,
    local: "Autódromo de Imola, Itália",
    data: "2026-09-02",
    descricao: "Experiência com Lamborghini Aventador, Huracán e outros superesportivos extremos.",
    ingressosVendidos: 180,
    imagem: lamborghiniArena
  },
  {
    id: 3,
    nome: "Ferrari Luxury Expo",
    limite: 400,
    local: "Gramado, RS - Brasil",
    data: "2026-10-20",
    descricao: "Exposição exclusiva com Ferrari 488, SF90 e outros modelos lendários.",
    ingressosVendidos: 310,
    imagem: ferrariExpo
  },
  {
    id: 4,
    nome: "Pagani Hypercar Experience",
    limite: 50,
    local: "Módena / Emília-Romanha, Itália",
    data: "2026-11-10",
    descricao: "Veja de perto o luxo extremo da Pagani com modelos como Huayra e Zonda.",
    ingressosVendidos: 42,
    imagem: paganiUtopia
  },
  {
    id: 5,
    nome: "Rolls-Royce Prestige Event",
    limite: 100,
    local: "Goodwood / Villa d'Este",
    data: "2026-12-05",
    descricao: "Evento sofisticado com Rolls-Royce Phantom, Ghost e Cullinan.",
    ingressosVendidos: 85,
    imagem: RollsRoyceEvent
  },
  {
    id: 6,
    nome: "Supercars Ultimate Meeting",
    limite: 1000,
    local: "Porte de Versailles (Pavillon 4), Paris",
    data: "2027-01-18",
    descricao: "Encontro com os maiores supercarros do mundo: Ferrari, Lamborghini, Porsche e mais.",
    ingressosVendidos: 600,
    imagem: garageExpo
  }
];