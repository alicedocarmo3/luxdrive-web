export interface IEvento {
  id: number;
  nome: string;
  limite: number;
  local: string;
  data: string;
  descricao: string;
  ingressosVendidos: number;
  imagem?: string; // Adicionado para suportar as fotos dos carros
}