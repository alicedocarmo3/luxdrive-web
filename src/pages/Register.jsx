import "../styles/Register.css";
import carImage from "../assets/login-car.jpg";
import { useState } from "react";
import { registerService } from "../services/registerService";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerService.register({
        nome,
        email,
        senha,
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-container">
          <div className="logo">
            LEGACY <span>D</span>RIVE
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button type="submit" className="register-btn">
              Cadastrar
            </button>
          </form>
        </div>
      </div>

      <div className="register-right">
        <img src={carImage} alt="Carro esportivo" className="register-image" />
      </div>
    </div>
  );
}