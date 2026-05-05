import { URL_API } from "../constants/URL_API";
import { ICreateUsuario, IRespostaCreateUsuario } from "../interfaces/IUsers";

const USERS_URL = URL_API + '/users'

export const userServiceFetch = {
    
    async createUser(data: ICreateUsuario): Promise<IRespostaCreateUsuario> {
    const response = await fetch(`${USERS_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar usuário: ${response.status}`);
  }

  return response.json();
}
}