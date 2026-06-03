export interface IUsers {
  id: number
  nome: string
  email: string
  senha: string
   role?: "admin" | "user";
}
