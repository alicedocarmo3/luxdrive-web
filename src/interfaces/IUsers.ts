export interface IUsuarios {
  id: string
  nome: string
  email: string
  senha: string
}

export interface ICreateUsuario{
  nome: string
  email: string
  senha: string
}

export interface IRespostaCreateUsuario{
  nome:string
  email:string
  senha:string
  id:string
  createdAt:string
}