import { loginService } from "../services/userService";
import "../styles/Login.css";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Home } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    localStorage.removeItem("user");
    setEmail("");
    setSenha("");
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setIsLoading(true);

  try {
    const response = await loginService(email, senha);

    const usuario = response.data.data;

    localStorage.setItem(
      "user",
      JSON.stringify(usuario)
    );

    showToast(
      "Login realizado com sucesso!",
      "success"
    );

    setTimeout(() => {
      if (usuario.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }, 800);

  } catch (error) {
    console.error(error);

    setError(
      "Email ou senha incorretos. Tente novamente."
    );

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
    <div className="login-page">
      <div className="login-left">
        <div className="login-container">

          <div className="back-home-btn" onClick={() => window.location.href = "/"}>
            <Home size={16} />
            <span>LEGACY<span className="brand-accent">DRIVE</span></span>
          </div>

          <div className="form-header">
            <h1>Bem-vindo de volta</h1>
            <p className="form-subtitle">Entre com suas credenciais para acessar sua conta</p>
          </div>

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off" noValidate>
            <div className={`input-group ${focusedField === "email" ? "focused" : ""} ${email ? "filled" : ""}`}>
              <label>
                <Mail size={14} />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="off"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            <div className={`input-group password-group ${focusedField === "senha" ? "focused" : ""} ${senha ? "filled" : ""}`}>
              <label>
                <Lock size={14} />
                Senha
              </label>
              <input
                type={showSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
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

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Lembrar-me
              </label>
              <a href="#" className="forgot-link">Esqueceu a senha?</a>
            </div>

            <button 
              type="submit" 
              className={`login-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                <>
                  Entrar <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <span>ou</span>
          </div>

          <p className="register-text">
            Não tem uma conta?
            <span
              onClick={() => window.location.href = "/register"}
            >
              Criar conta
            </span>
          </p>

          <div className="footer-links">
            <a href="#">Termos de Serviço</a>
            <span className="separator">|</span>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
      </div>

      <div className="login-right">
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