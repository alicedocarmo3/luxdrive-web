import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar,
  LogOut,
  Camera,
  Edit2,
  Check,
  ArrowLeft,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import "../styles/Perfil.css";

// SVG do bonequinho genérico em formato Data URL
const DEFAULT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23cccccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;

function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  // Função auxiliar para estruturar os dados vindos do localStorage
  const obterDadosIniciais = () => {
    const usuarioSalvo = localStorage.getItem("user");
    if (usuarioSalvo) {
      const dadosParsed = JSON.parse(usuarioSalvo);
      const fotoAtual = dadosParsed.foto && !dadosParsed.foto.includes("unsplash.com")
        ? dadosParsed.foto
        : DEFAULT_AVATAR;

      return {
        nome: dadosParsed.nome || "",
        email: dadosParsed.email || "",
        telefone: dadosParsed.telefone || "",
        nascimento: dadosParsed.nascimento || "",
        membro: dadosParsed.membro || new Date().getFullYear().toString(),
        foto: fotoAtual,
      };
    }
    return null;
  };

  const [userData, setUserData] = useState(() => obterDadosIniciais() || {});
  const [tempData, setTempData] = useState({ ...userData });

  // Segurança: se não tiver usuário logado, redireciona para o login
  useEffect(() => {
    const dados = obterDadosIniciais();
    if (!dados) {
      window.location.href = "/login";
    } else {
      setUserData(dados);
      setTempData(dados);
    }
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (campo, valor) => {
    setTempData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleFormatTelefone = (e) => {
    let v = e.target.value.replace(/\\D/g, "");
    v = v.replace(/^(\\d{2})(\\d)/g, "($1) $2");
    v = v.replace(/(\\d)(\\d{4})$/, "$1-$2");
    handleChange("telefone", v.substring(0, 15));
  };

  const handleFormatNascimento = (e) => {
    let v = e.target.value.replace(/\\D/g, "");
    if (v.length > 2) v = v.substring(0, 2) + "/" + v.substring(2);
    if (v.length > 5) v = v.substring(0, 5) + "/" + v.substring(5, 9);
    handleChange("nascimento", v.substring(0, 10));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange("foto", imageUrl);
    }
  };

  const handleSave = () => {
    setUserData({ ...tempData });
    localStorage.setItem("user", JSON.stringify(tempData));
    setIsEditing(false);
    setToast({ type: "success", message: "Perfil atualizado com sucesso!" });
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="profile-page-wrapper">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type} show`}>
          {toast.type === "success" ? (
            <Check size={20} color="#4cd964" />
          ) : (
            <LogOut size={20} color="#ff3b30" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ============ LADO ESQUERDO ============ */}
      <div className="profile-left">
        <div className="profile-container">
          {/* Botão Voltar */}
          <button
            className="back-home-btn"
            onClick={() => (window.location.href = "/")}
            type="button"
          >
            <ArrowLeft size={18} />
            VOLTAR
          </button>

          {/* Header */}
          <div className="profile-header">
            <h1>
              Meu <span className="brand-accent">Perfil</span>
            </h1>
            <p className="profile-subtitle">
              Gerencie suas informações pessoais e preferências da conta
            </p>
          </div>

          {/* Zona do Avatar */}
          <div className="avatar-zone">
            <div className="avatar-container">
              <img
                className="profile-image"
                src={isEditing ? tempData.foto : userData.foto}
                alt="Foto de perfil"
                style={{ backgroundColor: "#333", objectFit: "cover" }}
              />
              {isEditing && (
                <button
                  className="change-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <Camera size={14} />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

            {isEditing ? (
              <input
                type="text"
                className="edit-name-input"
                value={tempData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Nome Completo"
              />
            ) : (
              <h2 className="user-name">{userData.nome || "Sem Nome"}</h2>
            )}

            <span className="premium-badge">Cliente Premium</span>
          </div>

          {/* Grid de Informações */}
          <div className="profile-grid-info">
            <div className="info-card">
              <div className="info-card-label">
                <Mail size={14} /> <span>Email</span>
              </div>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                disabled={!isEditing}
                value={isEditing ? tempData.email : userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="info-card">
              <div className="info-card-label">
                <Phone size={14} /> <span>Telefone</span>
              </div>
              <input
                type="text"
                placeholder="(00) 00000-0000"
                disabled={!isEditing}
                value={isEditing ? tempData.telefone : userData.telefone}
                onChange={handleFormatTelefone}
              />
            </div>

            <div className="info-card">
              <div className="info-card-label">
                <Calendar size={14} /> <span>Nascimento</span>
              </div>
              <input
                type="text"
                placeholder="DD/MM/AAAA"
                disabled={!isEditing}
                value={isEditing ? tempData.nascimento : userData.nascimento}
                onChange={handleFormatNascimento}
              />
            </div>

            <div className="info-card readonly">
              <div className="info-card-label">
                <Clock size={14} /> <span>Membro Desde</span>
              </div>
              <input type="text" disabled value={userData.membro} />
            </div>
          </div>

          {/* Rodapé de Ações */}
          <div className="profile-action-footer">
            {isEditing ? (
              <div className="action-grid-buttons">
                <button className="btn-secondary" onClick={handleCancel}>
                  Cancelar
                </button>
                <button className="btn-primary" onClick={handleSave}>
                  <Check size={16} /> Salvar
                </button>
              </div>
            ) : (
              <button
                className="btn-primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={14} /> Editar Perfil
              </button>
            )}

            <button className="btn-danger-outline" onClick={handleLogout}>
              <LogOut size={14} /> Sair da Conta
            </button>
          </div>

          <div className="divider">
            <span>ou</span>
          </div>
          <p className="register-text">
            Precisa de ajuda?{" "}
            <span onClick={() => (window.location.href = "/contato")}>
              Fale Conosco
            </span>
          </p>
        </div>
      </div>

      {/* ============ LADO DIREITO ============ */}
      <div className="profile-right">
        <div className="image-overlay"></div>
        <div className="right-content">
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={20} />
            </div>
            <div>
              <h3>Conta Protegida</h3>
              <p>
                Seus dados estão criptografados e protegidos com as melhores
                práticas de segurança.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Award size={20} />
            </div>
            <div>
              <h3>Benefícios Premium</h3>
              <p>
                Acesso exclusivo a lançamentos, descontos especiais e suporte
                prioritário 24/7.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Clock size={20} />
            </div>
            <div>
              <h3>Histórico Completo</h3>
              <p>
                Acompanhe todas as suas interações, favoritos e reservas em um
                só lugar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;