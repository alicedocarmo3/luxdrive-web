export interface IEvento {
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
  // Novos campos:
  duracao: string;
  vagasRestantes: number;
  tema: "porsche" | "lambo" | "ferrari" | "pagani" | "rolls" | "ultimate";
  pixCode: string;
  tituloResumo: string;
  subtitulo: string;
}