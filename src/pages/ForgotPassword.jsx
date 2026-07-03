import { checkEmailService, resetPasswordService } from "../services/userService";
import "../styles/ForgotPassword.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, AlertCircle, CheckCircle2, Home, Send, Loader2, Lock, Eye, EyeOff } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [emailVerificado, setEmailVerificado] = useState(false);
  const [emailExiste, setEmailExiste] = useState(false);

  useEffect(() => {
    setEmail("");
    setNovaSenha("");
    setConfirmarSenha("");
    setError("");
    setSuccess("");
    setEmailVerificado(false);
    setEmailExiste(false);
  }, []);

  const validarSenha = (senha) => {
    const checks = {
      length: senha.length >= 8,
      uppercase: /[A-Z]/.test(senha),
      number: /[0-9]/.test(senha),
      special: /[^A-Za-z0-9]/.test(senha)
    };
    const valido = checks.length && checks.uppercase && checks.number && checks.special;
    return { valido, checks };
  };

  const statusSenha = validarSenha(novaSenha);

 const handleVerificarEmail = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setIsLoading(true);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    setError("Por favor, insira um email válido.");
    setIsLoading(false);
    return;
  }

  try {
    const response = await checkEmailService(email.trim());
    
    // ✅ CORREÇÃO AQUI: sua API retorna { success, message, data: { exists } }
    // então o exists está em response.data.data.exists
    const exists = response.data?.data?.exists ?? response.data?.exists;
    
    if (exists) {
      setEmailExiste(true);
      setEmailVerificado(true);
      showToast("Email verificado! Defina sua nova senha.", "success");
    } else {
      setEmailExiste(false);
      setEmailVerificado(true);
      setError("Email não encontrado. Verifique se digitou corretamente.");
    }
  } catch (error) {
    console.error(error);
    setError("Erro ao verificar email. Tente novamente.");
  } finally {
    setIsLoading(false);
  }
};

  const handleRedefinirSenha = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!statusSenha.valido) {
      setError("A senha não atende aos requisitos de segurança.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordService(email, novaSenha);
      setSuccess("Senha redefinida com sucesso! Redirecionando para o login...");
      showToast("Senha alterada com sucesso!", "success");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Erro ao redefinir senha. Tente novamente.");
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
    <div className="forgot-page">
      <div className="forgot-left">
        <div className="forgot-container">

          <div className="back-home-btn" onClick={() => navigate("/")}>
            <Home size={16} />
            <span>LEGACY<span className="brand-accent">DRIVE</span></span>
          </div>

          <div className="form-header">
            <h1>{emailVerificado && emailExiste ? "Redefinir senha" : "Esqueceu a senha?"}</h1>
            <p className="form-subtitle">
              {emailVerificado && emailExiste 
                ? "Crie uma nova senha segura para sua conta." 
                : "Informe seu email para verificarmos se existe em nossa base."}
            </p>
          </div>

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="success-banner">
              <CheckCircle2 size={18} />
              <span>{success}</span>
            </div>
          )}

          {!emailVerificado ? (
            <form onSubmit={handleVerificarEmail} autoComplete="off" noValidate>
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
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className={`forgot-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    Verificar email <Send size={18} />
                  </>
                )}
              </button>
            </form>
          ) : emailExiste ? (
            <form onSubmit={handleRedefinirSenha} autoComplete="off" noValidate>
              <div className={`input-group password-group ${focusedField === "novaSenha" ? "focused" : ""} ${novaSenha ? "filled" : ""}`}>
                <label>
                  <Lock size={14} />
                  Nova senha
                </label>
                <input
                  type={showNovaSenha ? "text" : "password"}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  onFocus={() => setFocusedField("novaSenha")}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={isLoading}
                />
                <button 
                  type="button" 
                  className="toggle-password-btn"
                  onClick={() => setShowNovaSenha(!showNovaSenha)}
                  tabIndex="-1"
                >
                  {showNovaSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {novaSenha && (
                <div className="password-strength-container">
                  <div className="strength-bar-bg">
                    <div 
                      className={`strength-bar-fill ${statusSenha.valido ? "forte" : "fraca"}`} 
                      style={{ width: `${statusSenha.valido ? 100 : 25}%` }} 
                    ></div>
                  </div>
                  <div className="strength-info">
                    <span className={`strength-text ${statusSenha.valido ? "forte" : "fraca"}`}>
                      {statusSenha.valido ? "Válida" : "Inválida"}
                    </span>
                    <div className="strength-checks">
                      <span className={statusSenha.checks.length ? "valid" : ""}>
                        {statusSenha.checks.length ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                        8+ caracteres
                      </span>
                      <span className={statusSenha.checks.uppercase ? "valid" : ""}>
                        {statusSenha.checks.uppercase ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                        Maiúscula
                      </span>
                      <span className={statusSenha.checks.number ? "valid" : ""}>
                        {statusSenha.checks.number ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                        Número
                      </span>
                      <span className={statusSenha.checks.special ? "valid" : ""}>
                        {statusSenha.checks.special ? <CheckCircle2 size={12} /> : <span className="dot"></span>}
                        Especial
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className={`input-group password-group ${focusedField === "confirmarSenha" ? "focused" : ""} ${confirmarSenha ? "filled" : ""}`}>
                <label>
                  <Lock size={14} />
                  Confirmar senha
                </label>
                <input
                  type={showConfirmarSenha ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                  autoComplete="new-password"
                  onFocus={() => setFocusedField("confirmarSenha")}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={isLoading}
                />
                <button 
                  type="button" 
                  className="toggle-password-btn"
                  onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                  tabIndex="-1"
                >
                  {showConfirmarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button 
                type="submit" 
                className={`forgot-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    Redefinir senha <Send size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="email-not-found">
              <p>Email não encontrado em nossa base de dados.</p>
              <button 
                className="forgot-btn secondary"
                onClick={() => {
                  setEmailVerificado(false);
                  setEmailExiste(false);
                  setError("");
                  setEmail("");
                }}
              >
                Tentar outro email
              </button>
            </div>
          )}

          <div className="back-to-login">
            <ArrowLeft size={16} />
            <span onClick={() => navigate("/login")}>
              Voltar para o login
            </span>
          </div>

          <div className="footer-links">
            <a href="#">Termos de Serviço</a>
            <span className="separator">|</span>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
      </div>

      <div className="forgot-right">
        <div className="image-overlay"></div>
        <div className="right-content">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3>Segurança Garantida</h3>
            <p>Seus dados estão protegidos com criptografia de ponta</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>Recuperação Rápida</h3>
            <p>Recupere o acesso à sua conta em poucos minutos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
