import "../styles/Register.css";
import carImage from "../assets/login-car.jpg";
import { useState } from "react";
import { registerService } from "../services/userService";

export default function Register() {

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await registerService({
            id: Date.now(),
            nome,
            email,
            senha,
          });

        console.log(
          "USUÁRIO CADASTRADO:",
          response
        );

        alert(
          "Usuário cadastrado com sucesso!"
        );

        // limpa os campos
        setNome("");
        setEmail("");
        setSenha("");

        // redireciona
        window.location.href =
          "/login";

      } catch (error) {

        console.log(
          "ERRO COMPLETO:",
          error
        );

        console.log(
          "ERROR RESPONSE:",
          error.response
        );

        console.log(
          "ERROR DATA:",
          error.response?.data
        );

        console.log(
          "ERROR STATUS:",
          error.response?.status
        );

        alert(
          error.message
        );

      }

    };

  return (

    <div className="register-page">

      <div className="register-left">

        <div className="register-container">

          <div
            className="logo"
            style={{
              color: "#ff6600",
            }}
          >
            LEGACYDRIVE
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label>Nome</label>

              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
                required
              />

            </div>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="input-group">

              <label>Senha</label>

              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Cadastrar
            </button>

          </form>

        </div>

      </div>

      <div className="register-right">

        <img
          src={carImage}
          alt="Carro esportivo"
          className="register-image"
        />

      </div>

    </div>

  );

}