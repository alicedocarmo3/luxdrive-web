import { IMarca } from "../interfaces/IMarca";

export const marcasData: IMarca[] = [
  {
    id: 1,
    nome: "Porsche",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://t4.ftcdn.net/jpg/04/18/89/75/360_F_418897569_6QMDB8f5ya8GSfufpF3XbnmHazwNMA2J.jpg",

    linkLogo: new URL(
      "../assets/marcas/porschemarca.jpg",
      import.meta.url
    ).href,

    carrosId: [1, 2, 3, 4],
  },

  {
    id: 2,
    nome: "Ferrari",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://www.escolacasa.com/wp-content/uploads/2021/03/Ferrari_Logo_Atual.jpg",

    linkLogo: new URL(
      "../assets/marcas/ferrarimarca.png",
      import.meta.url
    ).href,

    carrosId: [5, 6, 7, 8],
  },

  {
    id: 3,
    nome: "BMW",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://images.unsplash.com/photo-1680844540129-48dacc7d5d88",

    linkLogo: new URL(
      "../assets/marcas/bmwmarca.jpg",
      import.meta.url
    ).href,

    carrosId: [9, 10, 11, 12],
  },

  {
    id: 4,
    nome: "Lamborghini",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://cdn.shoppub.io/brogan/media/filer_public/a1/07/a10755a0-20ec-479e-82b0-d51e0eda579b/fotos_blog_lamborghini_010.webp",

    linkLogo: new URL(
      "../assets/marcas/lamborguinimarca.png",
      import.meta.url
    ).href,

    carrosId: [13, 14, 15, 16],
  },

  {
    id: 5,
    nome: "Rolls-Royce",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://vintageclassicos.com.br/wp-content/uploads/2024/04/Logotipo-da-Rolls-Royce-4.jpg",

    linkLogo: new URL(
      "../assets/marcas/rollsroycemarca.jpg",
      import.meta.url
    ).href,

    carrosId: [17, 18, 19, 20],
  },

  {
    id: 6,
    nome: "Maserati",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://quatrorodas.abril.com.br/wp-content/uploads/2016/11/5658be8e52657372a11f88aflogo-centenario-maserati-100.jpeg",

    linkLogo: new URL(
      "../assets/marcas/maseratimarca.jpg",
      import.meta.url
    ).href,

    carrosId: [21, 22, 23, 24],
  },

  {
    id: 7,
    nome: "Aston Martin",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://www.astonmartinsaopaulo.com.br/pub/content/aston-mart_1_220721_5330.jpg",

    linkLogo: new URL(
      "../assets/marcas/astonmartinmarca.jpg",
      import.meta.url
    ).href,

    carrosId: [25, 26, 27, 28],
  },

  {
    id: 8,
    nome: "McLaren",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://cdn.pixabay.com/photo/2020/08/18/12/20/mclaren-logo-5498087_1280.jpg",

    linkLogo: new URL(
      "../assets/marcas/mclarenmarca.png",
      import.meta.url
    ).href,

    carrosId: [29, 30, 31, 32],
  },

  {
    id: 9,
    nome: "Koenigsegg",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://logos-world.net/wp-content/uploads/2021/03/Koenigsegg-Logo.png",

    linkLogo: new URL(
      "../assets/marcas/koenigseggmarca.jpg",
      import.meta.url
    ).href,

    carrosId: [33, 34, 35, 36],
  },

  {
    id: 10,
    nome: "Pagani",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://logosmarcas.net/wp-content/uploads/2021/10/Pagani-Logo-Historia.jpg",

    linkLogo: new URL(
      "../assets/marcas/paganimarcas.png",
      import.meta.url
    ).href,

    carrosId: [37, 38, 39, 40],
  },

  {
    id: 11,
    nome: "Mercedes",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://cdn.dealerspace.ai/bamaq/simbolo-da-mercedes-benz.jpg",

    linkLogo: new URL(
      "../assets/marcas/mercedesmarca.jpg",
      import.meta.url
    ).href,

    carrosId: [41, 42, 43, 44],
  },

  {
    id: 12,
    nome: "Dodge",
    descricao: "O carro mais rápido do mercado",

    linkBanner:
      "https://assets.turbologo.com/blog/pt/2021/11/20120310/ram-958x575.png",

    linkLogo: new URL(
      "../assets/marcas/dodgemarca.jpg",
      import.meta.url
    ).href,

    carrosId: [45, 46, 47, 48],
  },
];