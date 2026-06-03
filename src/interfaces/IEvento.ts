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
<<<<<<< HEAD
  // Novos campos:
=======
>>>>>>> 706844609f723905d7b66d8765c7d10306f3d415
  duracao: string;
  vagasRestantes: number;
  tema: "porsche" | "lambo" | "ferrari" | "pagani" | "rolls" | "ultimate";
  pixCode: string;
  tituloResumo: string;
  subtitulo: string;
}