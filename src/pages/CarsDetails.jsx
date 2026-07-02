import "../styles/CarsDetails.css";

import {
  useParams,
  Link,
  useLocation
} from "react-router-dom";

import {
  useState,
  useEffect,
  useRef
} from "react";

import emailjs from "@emailjs/browser";

import {
  getCars
} from "../services/carService";

export default function CarsDetails() {

  const { id } = useParams();

  const location =
    useLocation();

  const formRef =
    useRef();

  const [carro, setCarro] =
    useState(null);

  const [carros, setCarros] =
    useState([]);

  const [imagemAtual, setImagemAtual] =
    useState("");

  // ============================================
  // BUSCAR CARRO
  // ============================================

  useEffect(() => {

    const fetchCarro =
      async () => {

        try {

          // DEBUG
          console.log("ID DA URL:", id);

          // veio pela navegação
          if (location.state?.car) {

            console.log(
              "Carro veio pelo state"
            );

            setCarro(
              location.state.car
            );

            setImagemAtual(
              location.state.car.imagens?.[0]
            );

            return;

          }

          // busca todos os carros
          const cars =
            await getCars();

          console.log(
            "TODOS OS CARROS:",
            cars
          );

          // procura carro pelo id
          const carroEncontrado =
            cars.find(
              (car) =>
                String(car.id) ===
                String(id)
            );

          console.log(
            "CARRO ENCONTRADO:",
            carroEncontrado
          );

          // se não encontrar
          if (!carroEncontrado) {

            setCarro(false);

            return;

          }

          // define carro
          setCarro(
            carroEncontrado
          );

          // imagem principal
          setImagemAtual(
            carroEncontrado.imagens?.[0] || ""
          );

        } catch (error) {

          console.log(
            "ERRO:",
            error
          );

          setCarro(false);

        }

      };

    fetchCarro();

  }, [id, location.state]);

  // ============================================
  // BUSCAR TODOS
  // ============================================

  useEffect(() => {

    const fetchCars =
      async () => {

        try {

          const data =
            await getCars();

          setCarros(data);

        } catch (error) {

          console.log(error);

        }

      };

    fetchCars();

  }, []);

  // ============================================
  // ERRO
  // ============================================

  if (carro === false) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px"
        }}
      >
        Carro não encontrado
      </div>

    );

  }

  // ============================================
  // CARREGANDO
  // ============================================

  if (!carro) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px"
        }}
      >
        Carregando...
      </div>

    );

  }

  // ============================================
  // RELACIONADOS
  // ============================================

  const relacionados =
    carros
      .filter(
        (c) =>
          String(c.id) !==
          String(carro.id)
      )
      .slice(0, 4);

  // ============================================
  // ENVIAR EMAIL
  // ============================================

// ============================================
// ENVIAR EMAIL
// ============================================

const enviarEmail = (e) => {
  e.preventDefault();

  // Pega os valores diretamente dos inputs pelo formRef
  const form = formRef.current;
  
  const nome = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const mensagem = form.querySelector('textarea[name="message"]').value.trim();

  // Debug — veja no console se os valores estão vindo
  console.log("Nome:", nome);
  console.log("Email:", email);
  console.log("Mensagem:", mensagem);
  console.log("Carro:", carro.modelo);

  if (!nome || !email || !mensagem) {
    alert("Preencha todos os campos.");
    return;
  }

  const templateParams = {
    name: nome,
    email: email,
    message: mensagem,
    car_model: carro.modelo,
  };

  emailjs
    .send(
      "service_81j2voj",
      "template_kohotzg",
      templateParams,
      "3IzifOeNqQKaMrdC6"
    )
    .then(() => {
      alert("Mensagem enviada com sucesso!");
      form.reset();
    })
    .catch((err) => {
      console.error("Erro EmailJS:", err);
      alert("Erro ao enviar mensagem. Tente novamente.");
    });
};

  return (

    <div className="details-page">

      {/* BANNER */}
      <section className="details-banner">

        <img
          src={imagemAtual}
          alt={carro.modelo}
        />

        <div className="overlay"></div>

        <div className="banner-content">

          <p>
            {carro.ano}
          </p>

          <h1>
            {carro.modelo}
          </h1>

          <span>

            {carro.preco?.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL"
              }
            )}

          </span>

        </div>

      </section>

      {/* GALERIA */}
      <section className="gallery">

        {carro.imagens?.map(
          (img, index) => (

            <img
              key={index}
              src={img}
              alt={carro.modelo}
              onClick={() =>
                setImagemAtual(img)
              }
              className={
                imagemAtual === img
                  ? "active"
                  : ""
              }
            />

          )
        )}

      </section>

      {/* CONTAINER */}
      <section className="details-container">

        {/* ESQUERDA */}
        <div className="details-info">

          <h2>
            Sobre o veículo
          </h2>

          <p className="description">

            O {carro.modelo}
            combina luxo,
            performance e
            tecnologia extrema.

          </p>

          <div className="info-grid">

            <div className="info-card">
              <span>Motor</span>
              <h3>{carro.motor}</h3>
            </div>

            <div className="info-card">
              <span>Potência</span>
              <h3>{carro.potencia}</h3>
            </div>

            <div className="info-card">
              <span>Câmbio</span>
              <h3>{carro.cambio}</h3>
            </div>

            <div className="info-card">
              <span>Cor</span>
              <h3>{carro.cor}</h3>
            </div>

            <div className="info-card">
              <span>KM</span>
              <h3>{carro.km}</h3>
            </div>

          </div>

        </div>

        {/* DIREITA */}
        <div className="contact-box">

          <h2>
            Fale com a LEGACYDRIVE
          </h2>

          <form
            ref={formRef}
            onSubmit={enviarEmail}
          >

            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Seu e-mail"
              required
            />

<input
  type="hidden"
  name="car_model"
  value={carro.modelo}
/>

            <textarea
              name="message"
              rows="5"
              placeholder="Mensagem"
              required
            ></textarea>

            <button type="submit">
              Enviar mensagem
            </button>

          </form>

        </div>

      </section>

      {/* RELACIONADOS */}
      <section className="related-section">

        <h2>
          Veículos relacionados
        </h2>

        <div className="related-grid">

          {relacionados.map(
            (item) => (

              <Link
                key={item.id}
                to={`/carsdetails/${item.id}`}
                className="related-card"
              >

                <img
                  src={item.imagens?.[0]}
                  alt={item.modelo}
                />

                <h3>
                  {item.modelo}
                </h3>

                <p>

                  {item.preco?.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL"
                    }
                  )}

                </p>

              </Link>

            )
          )}

        </div>

      </section>

    </div>

  );

}