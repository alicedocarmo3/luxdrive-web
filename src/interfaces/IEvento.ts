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
  duracao: string;
  vagasRestantes: number;
  tema: "porsche" | "lambo" | "ferrari" | "pagani" | "rolls" | "ultimate";
  pixCode: string;
  tituloResumo: string;
  subtitulo: string;
}