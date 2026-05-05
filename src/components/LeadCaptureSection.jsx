import "../styles/LeadCaptureSection.css";
import bg from "../assets/testedrive.jpg";

export default function LeadCaptureSection() {
  return (
    <section className="lead-section">
      {/* BACKGROUND IMAGE */}
      <div className="lead-bg">
        <img src={bg} alt="Test Drive" />
        <div className="lead-overlay" />
      </div>

      {/* HEADER */}
      <div className="lead-header">
        <h2>
          Não sabe qual modelo escolher? <span>VENHA FAZER UM TESTE DRIVE!</span>
        </h2>

        <p>
          Deixe seu contato e seja notificado quando o seu modelo chegar.
        </p>
      </div>

      {/* FORM */}
      <div className="lead-form-wrapper">
        <div className="lead-form-box">

          <div className="lead-inputs">
            <div className="input-group">
              <input type="text" required />
              <label>Modelo desejado</label>
            </div>

            <div className="input-group">
              <input type="text" required />
              <label>Nome</label>
            </div>

            <div className="input-group">
              <input type="email" required />
              <label>E-mail</label>
            </div>

            <div className="input-group">
              <input type="text" required />
              <label>Telefone / WhatsApp</label>
            </div>
          </div>

          {/* PRIVACIDADE */}
          <div className="lead-privacy">
            <input type="checkbox" />
            <span>
              De acordo com a Lei Geral de Proteção de Dados, concordo em fornecer os dados acima para que a LegacyDrive entre em contato comigo para apresentar produtos e serviços. Seu nome, e-mail e telefone serão usados com a finalidade de ofertar uma oportunidade, de acordo com a nossa Política de Privacidade.
            </span>
          </div>

          {/* BOTÃO */}
          <button className="lead-btn">ENVIAR</button>

        </div>
      </div>
    </section>
  );
}