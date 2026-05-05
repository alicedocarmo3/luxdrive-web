import { ICarros } from "../interfaces/ICarros";

export const carrosData: ICarros[] = [
  {
    id: "1",
    marca: "BMW",
    modelo: "320i",
    ano: 2022,
    preco: 250000,
    km: 15000,
    imagem: "https://example.com/bmw320i.jpg",
    blindado: false,
    motor: "2.0 Turbo",
    cor: "Preto",
    potencia: 184
  },
  {
    id: "2",
    marca: "Audi",
    modelo: "A5",
    ano: 2021,
    preco: 280000,
    km: 22000,
    imagem: "https://example.com/audia5.jpg",
    blindado: true,
    motor: "2.0 Turbo",
    cor: "Branco",
    potencia: 204
  },
  {
    id: "3",
    marca: "Mercedes-Benz",
    modelo: "C200",
    ano: 2023,
    preco: 320000,
    km: 8000,
    imagem: "https://example.com/mercedesc200.jpg",
    blindado: false,
    motor: "1.5 Turbo",
    cor: "Prata",
    potencia: 204
  }
];