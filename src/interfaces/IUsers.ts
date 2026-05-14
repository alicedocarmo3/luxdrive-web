export interface IUsuarios {
  id: number
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
  id:number
  nome:string
  email:string
  senha:string
  createdAt:string
}