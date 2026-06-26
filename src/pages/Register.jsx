import "../styles/Register.css";
import { useState, useEffect } from "react";
import { registerService } from "../services/userService";
import { Eye, EyeOff, User, Mail, Phone, Calendar, Lock, ArrowRight, CheckCircle2, AlertCircle, Home } from "lucide-react";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    localStorage.removeItem("user");
    setNome("");
    setEmail("");
    setSenha("");
    setTelefone("");
    setNascimento("");
  }, []);

  const testarForcaSenha = (value) => {
    if (!value) return { texto: "", classe: "", porcentagem: 0 };
    
    let pontos = 0;
    const checks = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[^A-Za-z0-9]/.test(value)
    };
    
    if (checks.length) pontos++;
    if (checks.uppercase) pontos++;
    if (checks.number) pontos++;
    if (checks.special) pontos++;

    const porcentagem = (pontos / 4) * 100;

    if (pontos <= 1) return { texto: "Fraca", classe: "fraca", porcentagem, checks };
    if (pontos === 2 || pontos === 3) return { texto: "Média", classe: "media", porcentagem, checks };
    return { texto: "Forte", classe: "forte", porcentagem, checks };
  };

  const statusSenha = testarForcaSenha(senha);

  // CORRIGIDO: Expressão regular e fatiamento do telefone
  const handleFormatTelefone = (e) => {
    let v = e.target.value.replace(/\D/g, ""); // Correção da regex de \\D para \D
    if (v.length > 11) v = v.substring(0, 11);
    
    if (v.length > 7) {
      v = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
    } else if (v.length > 2) {
      v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
    } else if (v.length > 0) {
      v = `(${v}`;
    }
    
    setTelefone(v);
  };

  // CORRIGIDO: Expressão regular e fatiamento da data de nascimento
  const handleFormatNascimento = (e) => {
    let v = e.target.value.replace(/\D/g, ""); // Correção da regex de \\D para \D
    if (v.length > 8) v = v.substring(0, 8);
    
    if (v.length > 4) {
      v = `${v.substring(0, 2)}/${v.substring(2, 4)}/${v.substring(4)}`;
    } else if (v.length > 2) {
      v = `${v.substring(0, 2)}/${v.substring(2)}`;
    }
    
    setNascimento(v);
  };

  const verificarMaioridade = (dataString) => {
    if (dataString.length !== 10) return false;
    const [dia, mes, ano] = dataString.split("/").map(Number);
    const dataNascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const diferencaMeses = hoje.getMonth() - dataNascimento.getMonth();
    if (diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade >= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!verificarMaioridade(nascimento)) {
      setError("Você deve ter pelo menos 18 anos para se cadastrar.");
      return;
    }

    if (!acceptedTerms) {
      setError("Você deve aceitar os termos de serviço.");
      return;
    }

    if (statusSenha.porcentagem < 50) {
      setError("Sua senha é muito fraca. Crie uma senha mais segura.");
      return;
    }

    setIsLoading(true);

    try {
      await registerService({
        id: Date.now(),
        nome,
        email,
        senha,
        telefone,
        nascimento,
      });

      const usuarioSimulado = { 
        nome, 
        email, 
        telefone,
        nascimento,
        membro: new Date().getFullYear().toString(),
        foto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23cccccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
      };
      localStorage.setItem("user", JSON.stringify(usuarioSimulado));

      showToast("Cadastro realizado com sucesso!", "success");
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);

    } catch (error) {
      setError(error.message || "Erro ao realizar cadastro. Tente novamente.");
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = type === "success" 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><span>${message}</span>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2500);
    }, 100);
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-container">

          <div className="back-home-btn" onClick={() => window.location.href = "/"}>
            <Home size={16} />
            <span>LEGACY<span className="brand-accent">DRIVE</span></span>
          </div>

          <div className="form-header">
            <h1>Criar conta</h1>
            <p className="form-subtitle">Preencha os dados abaixo para começar</p>
          </div>

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <div className={`input-group ${focusedField === "nome" ? "focused" : ""} ${nome ? "filled" : ""}`}>
              <label>
                <User size={14} />
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="off"
                onFocus={() => setFocusedField("nome")}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            <div className={`input-group ${focusedField === "email" ? "focused" : ""} ${email ? "filled" : ""}`}>
              <label>
                <Mail size={14} />
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            <div className="input-row">
              <div className={`input-group ${focusedField === "telefone" ? "focused" : ""} ${telefone ? "filled" : ""}`}>
                <label>
                  <Phone size={14} />
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={handleFormatTelefone}
                  onFocus={() => setFocusedField("telefone")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              <div className={`input-group ${focusedField === "nascimento" ? "focused" : ""} ${nascimento ? "filled" : ""}`}>
                <label>
                  <Calendar size={14} />
                  Nascimento
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={nascimento}
                  onChange={handleFormatNascimento}
                  onFocus={() => setFocusedField("nascimento")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            <div className={`input-group password-group ${focusedField === "senha" ? "focused" : ""} ${senha ? "filled" : ""}`}>
              <label>
                <Lock size={14} />
                Senha
              </label>
              <input
                type={showSenha ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="new-password"
                onFocus={() => setFocusedField("senha")}
                onBlur={() => setFocusedField(null)}
                required
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={() => setShowSenha(!showSenha)}
                tabIndex="-1"
              >
                {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {senha && (
              <div className="password-strength-container">
                <div className="strength-bar-bg">
                  <div 
                    className={`strength-bar-fill ${statusSenha.classe}`} 
                    style={{ width: `${statusSenha.porcentagem}%` }}
                  ></div>
                </div>
                <div className="strength-info">
                  <span className={`strength-text ${statusSenha.classe}`}>
                    {statusSenha.texto}
                  </span>
                  <div className="strength-checks">
                    <span className={statusSenha.checks?.length ? "valid" : ""}>
                      {statusSenha.checks?.length ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                      8+ caracteres
                    </span>
                    <span className={statusSenha.checks?.uppercase ? "valid" : ""}>
                      {statusSenha.checks?.uppercase ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                      Maiúscula
                    </span>
                    <span className={statusSenha.checks?.number ? "valid" : ""}>
                      {statusSenha.checks?.number ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                      Número
                    </span>
                    <span className={statusSenha.checks?.special ? "valid" : ""}>
                      {statusSenha.checks?.special ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                      Especial
                    </span>
                  </div>
                </div>
              </div>
            )}

            <label className="terms-checkbox">
              <input 
                type="checkbox" 
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span className="checkmark"></span>
              <span className="terms-text">
                Li e aceito os <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>
              </span>
            </label>

            <button 
              type="submit" 
              className={`register-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                <>
                  Criar conta <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <span>ou</span>
          </div>

          <p className="register-text">
            Já possui uma conta?
            <span onClick={() => window.location.href = "/login"}>
              Fazer login
            </span>
          </p>
        </div>
      </div>

      <div className="register-right">
        <div className="image-overlay"></div>
        <div className="right-content">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Experiência Premium</h3>
            <p>Acesso exclusivo aos melhores veículos de luxo</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>Atendimento 24h</h3>
            <p>Suporte dedicado para todos os momentos</p>
          </div>
        </div>
      </div>
    </div>
  );
}