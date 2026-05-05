import { userServiceFetch } from "../services/userService";
import "../styles/Login.css";
import { useState } from "react";
import loginCar from "../assets/login-car.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="login-page">
      {/* LADO ESQUERDO */}
      <div className="login-left">
        <div className="login-container">
          <div className="logo">LEGACY<span>DRIVE</span></div>

          <h1>Login</h1>

          <p className="register-text">
            Não tem uma conta? <span>Registre-se agora</span>
          </p>

          <form>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
              />
            </div>

            <div className="input-group">
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>

            

            <button className="login-btn">Entrar</button>
          </form>

          <div className="footer-links">
            <a href="#">Termos de Serviço</a>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="login-right">
        <img
           src={loginCar}
           alt="Luxury Car"
            className="login-image"
          />
       </div>
    </div>
  );
}