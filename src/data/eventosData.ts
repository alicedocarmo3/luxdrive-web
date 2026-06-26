import { IEvento } from "../interfaces/IEvento";

import porscheCenter from "../assets/cars/porsche/porscheCenter.jpg";
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
    descricao: "Sinta a essência da engenharia alemã. O Porsche Experience coloca você no cockpit dos modelos mais icônicos do mundo para um treinamento de alta performance. Sob a supervisão de instrutores certificados, você aprenderá técnicas de frenagem de limite, transferência de peso e controle de tração.",
    incluso: "Instrução 1-para-1 com pilotos profissionais. Acesso a toda a linha 911 e 718 Cayman. Sessão de telemetria e análise de dados. Almoço executivo no Lounge VIP.",
    ingressosVendidos: 145,
    imagem: porscheCenter,
    precoIngresso: 4500,
    duracao: "90 MINUTOS",
    vagasRestantes: 12,
    tema: "porsche",
    pixCode: "000201PIX-UNIVERSE-LD-123456",
    tituloResumo: "Porsche Experience",
    subtitulo: "DOMINE A PERFORMANCE"
  },
  {
    id: 2,
    nome: "Lamborghini Arena",
    limite: 200,
    local: "Autódromo de Imola, Itália",
    data: "2026-09-02",
    descricao: "A Lamborghini Arena não é apenas um evento de pista, é a celebração máxima do DNA da marca. Pela primeira vez, o universo de Sant'Agata Bolognese se reúne no lendário Autódromo Enzo e Dino Ferrari em Imola para uma experiência de 2 dias que redefine o conceito de exclusividade automotiva.",
    incluso: "PISTA LIVRE: Acesso irrestrito à pista de Imola com instrutores oficiais Lamborghini. FÁBRICA VIRTUAL: Tour imersivo pela linha de montagem de Sant'Agata em realidade virtual. JANTAR GALA: Evento de networking com colecionadores e pilotos de fábrica. POLO STORICO: Exposição dos modelos clássicos restaurados pelo departamento histórico.",
    ingressosVendidos: 180,
    imagem: lamborghiniArena,
    precoIngresso: 2850,
    duracao: "2 DIAS",
    vagasRestantes: 20,
    tema: "lambo",
    pixCode: "000201PIX-LAMBO-ARENA-2026",
    tituloResumo: "Lamborghini Arena",
    subtitulo: "THE WORLD OF SANT'AGATA AT IMOLA CIRCUIT"
  },
  {
    id: 3,
    nome: "Ferrari Luxury Expo",
    limite: 400,
    local: "Gramado, RS - Brasil",
    data: "2026-10-20",
    descricao: "O Ferrari Luxury Expo em Gramado representa o ápice da experiência automotiva italiana no Brasil. Três dias de imersão total no universo Ferrari, desde os modelos clássicos da Scuderia até as últimas novidades da linha GT e supercarros híbridos.",
    incluso: "Test drive na Serra Gaúcha com 488 GTB e Roma Spider. Visita guiada à exposição '70 Anos de Ferrari'. Workshop de customização com designers de Maranello. Jantar de gala no Hotel Colline de France. Kit exclusivo de merchandise Ferrari.",
    ingressosVendidos: 310,
    imagem: ferrariExpo,
    precoIngresso: 5200,
    duracao: "3 DIAS",
    vagasRestantes: 90,
    tema: "ferrari",
    pixCode: "000201PIX-FERRARI-GRAMADO-2026",
    tituloResumo: "Ferrari Luxury Expo",
    subtitulo: "GRAMADO • EXCLUSIVIDADE SEM LIMITES"
  },
  {
    id: 4,
    nome: "Pagani Hypercar Experience",
    limite: 50,
    local: "Módena / Emília-Romanha, Itália",
    data: "2026-11-10",
    descricao: "A Pagani não constrói apenas carros; cria obras de arte sobre rodas. O Hypercar Experience oferece acesso sem precedentes ao universo de Horacio Pagani, incluindo visita à fábrica em Modena e sessão de fotos exclusiva com o Utopia.",
    incluso: "FÁBRICA MODENA: Tour completo pela produção artesanal do carbono-titanium. UTOPIA EXPERIENCE: Sessão fotográfica exclusiva e contato com o protótipo. CARBON MASTERCLASS: Workshop sobre fabricação de fibra de carbono forjada. COLEÇÃO PRIVADA: Acesso ao museu privado de Horacio Pagani.",
    ingressosVendidos: 42,
    imagem: paganiUtopia,
    precoIngresso: 7800,
    duracao: "1 DIA INTENSIVO",
    vagasRestantes: 8,
    tema: "pagani",
    pixCode: "000201PIX-PAGANI-MOTORVALLEY-2026",
    tituloResumo: "Pagani Hypercar Experience",
    subtitulo: "MOTOR VALLEY • ARTE E CIÊNCIA"
  },
  {
    id: 5,
    nome: "Rolls-Royce Prestige Event",
    limite: 100,
    local: "Goodwood / Villa d'Este",
    data: "2026-12-05",
    descricao: "O Rolls-Royce Prestige Event é a experiência mais exclusiva do UniverseLD. Reservado para um seleto grupo de convidados, este evento privado oferece acesso irrestrito às criações mais extraordinárias da marca, incluindo protótipos e edições únicas.",
    incluso: "BOKE EXPERIENCE: Descubra a técnica artesanal de pintura mais avançada do mundo. PRIVILEGE LOUNGE: Ambiente exclusivo com concierge pessoal durante todo o evento. CONFIGURATOR SESSION: Crie seu Rolls-Royce ideal com orientação dos designers da marca. CHAMPAGNE TASTING: Degustação de rótulos exclusivos selecionados pela casa.",
    ingressosVendidos: 85,
    imagem: RollsRoyceEvent,
    precoIngresso: 12500,
    duracao: "EXPERIÊNCIA SOB MEDIDA",
    vagasRestantes: 15,
    tema: "rolls",
    pixCode: "000201PIX-ROLLSROYCE-PRESTIGE-2026",
    tituloResumo: "Rolls-Royce Prestige Event",
    subtitulo: "EXCLUSIVIDADE ABSOLUTA • RESERVA PRIVADA"
  },
  {
    id: 6,
    nome: "Supercars Ultimate Meeting",
    limite: 1000,
    local: "Porte de Versailles (Pavillon 4), Paris",
    data: "2027-01-18",
    descricao: "O Ultimate Supercar Garage Paris reúne as máquinas mais incríveis do planeta em um único dia de celebração automotiva na cidade luz. De hypercars raros a supercarros de última geração, este é o ponto de encontro definitivo para entusiastas exigentes.",
    incluso: "SUPERCAR PARADE: Desfile pelas ruas icônicas de Paris com escolta policial. GARAGE TOUR: Acesso a coleções privadas de supercarros na região de Paris. TRACK SESSION: Volta rápida no Circuit de Nevers Magny-Cours. GALA NIGHT: Evento de encerramento no Shangri-La Hotel Paris.",
    ingressosVendidos: 600,
    imagem: garageExpo,
    precoIngresso: 3500,
    duracao: "1 DIA COMPLETO",
    vagasRestantes: 400,
    tema: "ultimate",
    pixCode: "000201PIX-ULTIMATESUPERCAR-PARIS-2027",
    tituloResumo: "Ultimate Supercar Garage Paris",
    subtitulo: "A CAPITAL MUNDIAL DOS SUPERCARROS"
  }
];