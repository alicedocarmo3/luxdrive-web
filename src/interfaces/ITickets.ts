export interface ITickets {
  id?: number;
  usuarioId: number;
  assunto: string;
  status: "aberto" | "fechado" | "pendente";
}