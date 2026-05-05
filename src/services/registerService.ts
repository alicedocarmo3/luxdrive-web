import { URL_API } from "../constants/URL_API";
import { ICreateUsuario, IRespostaCreateUsuario } from "../interfaces/IUsers";

const REGISTER_URL = `${URL_API}/register`;

export const registerService = {
  async register(data: ICreateUsuario): Promise<IRespostaCreateUsuario> {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar usuário: ${response.status}`);
    }

    return response.json();
  },
};