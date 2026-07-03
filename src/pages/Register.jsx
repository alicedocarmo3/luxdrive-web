import "../styles/Register.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerService } from "../services/userService";
import { Eye, EyeOff, User, Mail, Phone, Calendar, Lock, ArrowRight, CheckCircle2, AlertCircle, Home, Info } from "lucide-react";
export default function Register() {   
  const [nome, setNome] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState(""); 
  const [telefone, setTelefone] = useState(""); 
  const [nascimento, setNascimento] = useState(""); 
  const [showSenha, setShowSenha] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 
  const [erro, setError] = useState("");
  const [avisoEmail, setAvisoEmail] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false); 

  useEffect(() => {
    localStorage.removeItem("user");
    setNome("");
    setEmail(""); // Corrigido: era definirEmail
    setSenha("");
    setTelefone("");
    setNascimento("");
    setAvisoEmail("");
  }, []);

  const testarForcaSenha = (valor) => {  
    if (!valor) return { texto: "", classe: "", porcentagem: 0 };   
    
    let pontos = 0; // Corrigido: era "seja"
    const checks = {  // Corrigido: padronizado para checks em inglês
      length: valor.length >= 8,  
      uppercase: /[A-Z]/.test(valor),
      number: /[0-9]/.test(valor),
      special: /[^A-Za-z0-9]/.test(valor)
    };
    
    if (checks.length) pontos++; // Corrigido: era "se"
    if (checks.uppercase) pontos++;
    if (checks.number) pontos++;
    if (checks.special) pontos++;

    const porcentagem = (pontos / 4) * 100;    

    if (pontos <= 1) return { texto: "Fraca", classe: "fraca", porcentagem, checks };   
    if (pontos === 2 || pontos === 3) return { texto: "Média", classe: "media", porcentagem, checks };     
    return { texto: "Forte", classe: "forte", porcentagem, checks };  
  };

  const statusSenha = testarForcaSenha(senha);   

  const handleFormatTelefone = (e) => {  
    let v = e.target.value.replace(/\D/g, ""); // Corrigido: era e.alvo.valor e "seja"
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

  const handleFormatNascimento = (e) => {  
    let v = e.target.value.replace(/\D/g, ""); // Corrigido: era e.alvo.valor e "seja"
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
    const dataNascimento = new Date(ano, mes - 1, dia); // Corrigido: era nova Data     
    const hoje = new Date();    
    let idade = hoje.getFullYear() - dataNascimento.getFullYear(); // Corrigido: era getAnoFull e "seja"
    const diferencaMeses = hoje.getMonth() - dataNascimento.getMonth();  // Corrigido: era diferençasMeses
    if (diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < dataNascimento.getDate())) {    
      idade--;
    }
    return idade >= 18; // Corrigido: era retornar
  };

  const handleSubmit = async (e) => {   
    e.preventDefault();
     setError("");
    setAvisoEmail("");

    if (!verificarMaioridade(nascimento)) {
      setError("Você deve ter pelo menos 18 anos para se cadastrar.");
      return; // Corrigido: era retornar
    }

    if (!acceptedTerms) { // Corrigido: era termosAceitos
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
        email, // Corrigido: era e-mail
        senha,
        telefone,
        nascimento,
      });

      const usuarioSimulado = {  
        nome,
        email, // Corrigido: era e-mail
        telefone,
        nascimento,
        membro: new Date().getFullYear().toString(),  
        foto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23cccccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>` 
      };
      localStorage.setItem("user", JSON.stringify(usuarioSimulado)); // Corrigido: era armazenamento local

      showToast("Cadastro realizado com sucesso!", "sucesso");
      
      setTimeout(() => {
        window.location.href = "/"; 
      }, 1200);

    } catch (error) {
      if (error.response?.status === 409 || error.status === 409) {
        setAvisoEmail("Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.");
      } else {
        setError(error.message || "Erro ao realizar cadastro. Tente novamente.");
      }
      setIsLoading(false);
    }
  };

  const showToast = (mensagem, tipo) => {  
    const toast = document.createElement("div");  
    toast.className = `toast-notification ${tipo}`; 
    toast.innerHTML = tipo === "sucesso"  
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg><span>${mensagem}</span>` 
      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${mensagem}</span>`; 
    document.body.appendChild(toast); // Corrigido: era documento.corpo
    setTimeout(() => {
      toast.classList.add("show"); // Removido espaço antes do 'show'
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
            <span>LEGACY <span className="brand-accent">DRIVE</span></span> 
          </div>

          <div className="form-header"> 
            <h1>Criar conta</h1>
            <p className="form-subtitle">Preencha os dados abaixo para começar</p> 
          </div>

           {erro && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{erro}</span>
            </div>
          )}

          {avisoEmail && (
            <div className="warning-banner">
              <Info size={18} />
              <span>{avisoEmail}</span>
              <a href="/login" className="warning-link">Fazer login</a>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" noValidate>  
            <div className="input-group">  
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

            <div className={`input-group ${avisoEmail ? "input-warning" : ""}`}>
              <label>
                <Mail size={14} />
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (avisoEmail) setAvisoEmail("");
                }}
                autoComplete="off"
                onFocus={() => setFocusedField("email")} 
                onBlur={() => setFocusedField(null)} 
                required
              />
            </div>

            <div className="input-row"> 
              <div className="input-group">  
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

              <div className="input-group">  
                <label>
                  <Calendar size={14} />  
                  Nascimento
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={nascimento}
                  onChange={handleFormatNascimento} // Corrigido o erro de digitação do método
                  onFocus={() => setFocusedField("nascimento")} 
                  onBlur={() => setFocusedField(null)} 
                  required
                />
              </div>
            </div>

            <div className="input-group password-group">  
              <label>
                <Lock size={14} />  
                Senha
              </label>
              <input
                type={showSenha ? "text" : "senha"}   
                placeholder="Mínimo 8 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} 
                autoComplete="new-senha"
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
                checked={acceptedTerms} // Corrigido: era termosAceitos
                onChange={(e) => setAcceptedTerms(e.target.checked)} 
              />
              <span className="checkmark"></span> 
              <span className="terms-text"> 
              Li e aceito os <Link to="/termos">Termos de Serviço</Link> e <Link to="/privacidade">Política de Privacidade</Link>
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
                <path d="M12 2L2 7l10 5 10-5-10-5z" /> 
                <path d="M2 17l10 5 10-5" /> 
                <path d="M2 12l10 5 10-5" /> 
              </svg> 
            </div>
            <h3>Experiência Premium</h3>
            <p>Acesso exclusivo aos melhores veículos de luxo</p>
          </div>
          <div className="feature-card"> 
            <div className="feature-icon"> 
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">      
                <circle cx="12" cy="12" r="10" />   
                <path d="M12 6v6l4 2" /> 
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
