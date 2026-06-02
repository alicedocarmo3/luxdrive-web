import { useState, useRef } from "react";
// Se usar React Router, desinale a linha abaixo:
// import { useNavigate } from "react-router-dom"; 
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  Camera,
  Edit2,
  Check,
} from "lucide-react";
import "../styles/Perfil.css";

function Perfil() {
  // const navigate = useNavigate(); // Descomente se usar React Router

  // SIMULAÇÃO DE ESTADO DE LOGIN (Altere para o seu sistema real de Auth/Context/LocalStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    nome: "Ariele Vitória",
    email: "ariele@gmail.com",
    telefone: "(31) 99999-9999",
    localizacao: "Belo Horizonte - MG",
    membro: "2026",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleChange = (campo, valor) => {
    setTempData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleFormatTelefone = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    handleChange("telefone", v.substring(0, 15));
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
    setIsEditing(false);
    alert("Perfil updated successfully!");
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  // NOVA LÓGICA DO CLIQUE NO ROSTINHO
  const handleProfileClick = () => {
    if (isLoggedIn) {
      // Se estiver logado, abre o modal normalmente
      setTempData({ ...userData });
      setShowModal(true);
    } else {
      // Se não estiver logado, avisa e simula o fluxo de cadastro
      alert("Usuário não cadastrado! Redirecionando para a página de cadastro...");
      
      // Se estiver usando react-router-dom, use: navigate("/cadastro");
      
      // SIMULAÇÃO: O usuário faz o cadastro e depois de 2 segundos volta para a home logado
      setTimeout(() => {
        alert("Cadastro realizado com sucesso! Retornando para a página inicial...");
        setIsLoggedIn(true); // Agora ele está logado
        // Se estiver usando react-router-dom, use: navigate("/");
      }, 2000);
    }
  };

  const handleCloseModal = () => {
    handleCancel();
    setShowModal(false);
  };

  const sairConta = () => {
    setIsLoggedIn(false);
    setShowModal(false);
    alert("Você saiu da conta!");
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="logo">
          LEGACY<span>DRIVE</span>
        </h1>

        {/* Botão modificado para disparar a nova verificação */}
        <button 
          className="profile-trigger-btn" 
          onClick={handleProfileClick}
          aria-label="Abrir perfil"
        >
          {/* Se não estiver logado, pode exibir um ícone padrão de avatar, se estiver, exibe a foto */}
          {isLoggedIn ? (
            <img src={userData.foto} alt={userData.nome} className="nav-avatar" />
          ) : (
            <div className="nav-avatar-placeholder">👤</div> 
          )}
        </button>
      </nav>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btn" onClick={handleCloseModal} aria-label="Fechar modal">
              <X size={20} />
            </button>

            <div className="profile-top">
              <div className="avatar-container">
                <img 
                  className="profile-image" 
                  src={isEditing ? tempData.foto : userData.foto} 
                  alt="Foto de perfil" 
                />
                
                {isEditing && (
                  <button 
                    className="change-photo-btn" 
                    onClick={() => fileInputRef.current?.click()}
                    title="Alterar foto"
                    type="button"
                  >
                    <Camera size={16} />
                  </button>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoChange} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
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
                <h2>{userData.nome}</h2>
              )}

              <p className="subtitle">Cliente Premium • LegacyDrive</p>
            </div>

            <div className="profile-info">
              <div className="info-box">
                <div className="info-title">
                  <Mail size={16} />
                  <span>Email</span>
                </div>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={isEditing ? tempData.email : userData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="info-box">
                <div className="info-title">
                  <Phone size={16} />
                  <span>Telefone</span>
                </div>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? tempData.telefone : userData.telefone}
                  onChange={handleFormatTelefone}
                />
              </div>

              <div className="info-box">
                <div className="info-title">
                  <MapPin size={16} />
                  <span>Localização</span>
                </div>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? tempData.localizacao : userData.localizacao}
                  onChange={(e) => handleChange("localizacao", e.target.value)}
                />
              </div>

              <div className="info-box readonly">
                <div className="info-title">
                  <Calendar size={16} />
                  <span>Membro desde</span>
                </div>
                <input type="text" disabled value={userData.membro} />
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <div className="edit-buttons-group">
                  <button className="save-btn" onClick={handleSave}>
                    <Check size={16} /> Salvar
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                  <Edit2 size={16} /> Editar Perfil
                </button>
              )}

              <button className="logout-btn" onClick={sairConta}>
                <LogOut size={16} />
                Sair da Conta
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Perfil;