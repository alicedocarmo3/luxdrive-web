import { loginService } from "../services/userService";
import "../styles/Login.css";
import { useState } from "react";
import loginCar from "../assets/login-car.jpg";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await loginService(
          email,
          senha
        );

      console.log(response.data);

      const usuario =
        response.data.data;

      console.log(usuario);

      localStorage.setItem(
        "user",
        JSON.stringify(usuario)
      );

      alert("Login realizado com sucesso!");

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      alert("Email ou senha inválidos!");

    }

  };

  return (

    <div className="login-page">

      {/* LADO ESQUERDO */}
      <div className="login-left">

        <div className="login-container">

          <div className="logo">
            LEGACY<span>DRIVE</span>
          </div>

          <h1>Login</h1>

          <p className="register-text">
            Não tem uma conta?
            <span
              onClick={() =>
                window.location.href = "/register"
              }
              style={{
                cursor: "pointer",
                marginLeft: "5px"
              }}
            >
              Registre-se agora
            </span>
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Digite seu email"
                required
              />

            </div>

            <div className="input-group">

              <label>Senha</label>

              <input
                type="password"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                placeholder="Digite sua senha"
                required
              />

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Entrar
            </button>

          </form>

          <div className="footer-links">

            <a href="#">
              Termos de Serviço
            </a>

            <a href="#">
              Política de Privacidade
            </a>

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