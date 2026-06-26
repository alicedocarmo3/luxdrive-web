import { useEffect, useState } from "react";
import {
  Car,
  CalendarDays,
  Tag,
  Building2,
  Users,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronRight,
  MapPin,
  Clock,
  Ticket,
  ImageIcon,
  DollarSign,
  UsersRound,
  Save,
  Menu,
  AlignLeft,
  Type,
  Hash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin.css";
import {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento,
} from "../../services/eventoService";

export default function Events() {
  const [activeTab, setActiveTab] = useState("EVENTS");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalCapacity: 0,
    totalSold: 0,
    avgPrice: 0,
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    limite: "",
    local: "",
    data: "",
    descricao: "",
    incluso: "",
    imagem: "",
    precoIngresso: "",
    duracao: "",
    tema: "porsche",
    pixCode: "",
    tituloResumo: "",
    subtitulo: "",
  });

  async function loadEvents() {
    try {
      const data = await getEventos();
      setEvents(data);
      const totalCapacity = data.reduce((acc, evt) => acc + (evt.limite || 0), 0);
      const totalSold = data.reduce((acc, evt) => acc + (evt.ingressosVendidos || 0), 0);
      const totalPrice = data.reduce((acc, evt) => acc + (evt.precoIngresso || 0), 0);
      setStats({
        totalEvents: data.length,
        totalCapacity: totalCapacity,
        totalSold: totalSold,
        avgPrice: data.length > 0 ? Math.round(totalPrice / data.length) : 0,
      });
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function clearForm() {
    setEditingId(null);
    setFormData({
      nome: "",
      limite: "",
      local: "",
      data: "",
      descricao: "",
      incluso: "",
      imagem: "",
      precoIngresso: "",
      duracao: "",
      tema: "porsche",
      pixCode: "",
      tituloResumo: "",
      subtitulo: "",
    });
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      nome: formData.nome,
      limite: Number(formData.limite),
      local: formData.local,
      data: formData.data,
      descricao: formData.descricao,
      incluso: formData.incluso,
      imagem: formData.imagem,
      precoIngresso: Number(formData.precoIngresso),
      duracao: formData.duracao,
      tema: formData.tema,
      pixCode: formData.pixCode,
      tituloResumo: formData.tituloResumo,
      subtitulo: formData.subtitulo,
      ingressosVendidos: 0,
    };

    try {
      if (editingId) {
        await updateEvento(editingId, payload);
      } else {
        await createEvento(payload);
      }
      await loadEvents();
      clearForm();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  }

  function handleEdit(evento) {
    setEditingId(evento._id || evento.id);
    setFormData({
      nome: evento.nome || "",
      limite: evento.limite || "",
      local: evento.local || "",
      data: evento.data || "",
      descricao: evento.descricao || "",
      incluso: evento.incluso || "",
      imagem: evento.imagem || "",
      precoIngresso: evento.precoIngresso || "",
      duracao: evento.duracao || "",
      tema: evento.tema || "porsche",
      pixCode: evento.pixCode || "",
      tituloResumo: evento.tituloResumo || "",
      subtitulo: evento.subtitulo || "",
    });
    setShowForm(true);
  }

  async function handleDelete(id) {
    const confirmar = window.confirm("Deseja realmente excluir este evento?");
    if (!confirmar) return;
    try {
      await deleteEvento(id);
      await loadEvents();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }

  const filteredEvents = events.filter((evt) =>
    evt.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuItems = [
    { id: "DASHBOARD", label: "Dashboard", icon: Car, path: "/admin" },
    { id: "CARS", label: "Carros", icon: Car, path: "/admin/cars" },
    { id: "EVENTS", label: "Eventos", icon: CalendarDays, path: "/admin/events" },
    { id: "BRANDS", label: "Marcas", icon: Tag, path: "/admin/brands" },
    { id: "SEDES", label: "Sedes", icon: Building2, path: "/admin/sedes" },
    { id: "USERS", label: "Usuários", icon: Users, path: "/admin/users" },
  ];

  const handleMenuClick = (item) => {
    setActiveTab(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  const getThemeColor = (tema) => {
    const colors = {
      porsche: "#ff4d00",
      lambo: "#facc15",
      ferrari: "#ef4444",
      pagani: "#3b82f6",
      rolls: "#a855f7",
      ultimate: "#10b981",
    };
    return colors[tema] || "#ff4d00";
  };

  const getThemeLabel = (tema) => {
    const labels = {
      porsche: "Porsche",
      lambo: "Lamborghini",
      ferrari: "Ferrari",
      pagani: "Pagani",
      rolls: "Rolls-Royce",
      ultimate: "Ultimate",
    };
    return labels[tema] || tema;
  };

  return (
    <div className="dashboard-layout">
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-brand">

        </div>
        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activeTab === item.id ? "active" : ""}
                onClick={() => handleMenuClick(item)}
                title={item.label}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="menu-label">{item.label}</span>
                <ChevronRight
                  size={14}
                  className="menu-arrow"
                  style={{
                    opacity: activeTab === item.id ? 1 : 0,
                    transform:
                      activeTab === item.id ? "translateX(0)" : "translateX(-5px)",
                  }}
                />
              </button>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <span>v2.0.1</span>
        </div>
      </aside>

      <div className={`main-content ${sidebarOpen ? "" : "full"}`}>
        <header className="topbar">
          <div className="topbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar eventos, locais, temas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </header>

        <main className="content-body">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper blue">
                <CalendarDays size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalEvents}</span>
                <span className="stat-label">Total de Eventos</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <Ticket size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalCapacity}</span>
                <span className="stat-label">Capacidade Total</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper orange">
                <UsersRound size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalSold}</span>
                <span className="stat-label">Ingressos Vendidos</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper red">
                <DollarSign size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">
                  R$ {stats.avgPrice.toLocaleString("pt-BR")}
                </span>
                <span className="stat-label">Preço Médio</span>
              </div>
            </div>
          </div>

          <div className="content-header">
            <div>
              <h2>Gerenciar Eventos</h2>
              <p className="content-subtitle">
                {filteredEvents.length} evento{filteredEvents.length !== 1 ? "s" : ""} encontrado
                {filteredEvents.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              className="btn-add"
              onClick={() => {
                clearForm();
                setShowForm(true);
              }}
            >
              <Plus size={18} />
              Adicionar Evento
            </button>
          </div>

          {showForm && (
            <div className="form-overlay">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>
                    {editingId ? "Editar Evento" : "Cadastrar Novo Evento"}
                  </h3>
                  <button
                    type="button"
                    className="form-close"
                    onClick={clearForm}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <Type size={14} /> Nome do Evento
                    </label>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Ex: Porsche Experience Day"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Ticket size={14} /> Limite de Ingressos
                    </label>
                    <input
                      type="number"
                      name="limite"
                      placeholder="Ex: 100"
                      value={formData.limite}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MapPin size={14} /> Local
                    </label>
                    <input
                      type="text"
                      name="local"
                      placeholder="Ex: Autódromo de Interlagos"
                      value={formData.local}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <CalendarDays size={14} /> Data
                    </label>
                    <input
                      type="text"
                      name="data"
                      placeholder="Ex: 15 de Março de 2025"
                      value={formData.data}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <DollarSign size={14} /> Preço do Ingresso (R$)
                    </label>
                    <input
                      type="number"
                      name="precoIngresso"
                      placeholder="Ex: 2500"
                      value={formData.precoIngresso}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Clock size={14} /> Duração
                    </label>
                    <input
                      type="text"
                      name="duracao"
                      placeholder="Ex: 6 horas"
                      value={formData.duracao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Hash size={14} /> Tema
                    </label>
                    <select
                      name="tema"
                      value={formData.tema}
                      onChange={handleInputChange}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.06)",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    >
                      <option value="porsche">Porsche</option>
                      <option value="lambo">Lamborghini</option>
                      <option value="ferrari">Ferrari</option>
                      <option value="pagani">Pagani</option>
                      <option value="rolls">Rolls-Royce</option>
                      <option value="ultimate">Ultimate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <Type size={14} /> Título Resumo
                    </label>
                    <input
                      type="text"
                      name="tituloResumo"
                      placeholder="Ex: Experiência Única"
                      value={formData.tituloResumo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>
                      <AlignLeft size={14} /> Descrição
                    </label>
                    <input
                      type="text"
                      name="descricao"
                      placeholder="Descrição completa do evento..."
                      value={formData.descricao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>
                      <AlignLeft size={14} /> O que está incluso
                    </label>
                    <input
                      type="text"
                      name="incluso"
                      placeholder="Ex: Coffee break, Brindes, Fotos profissionais..."
                      value={formData.incluso}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>
                      <ImageIcon size={14} /> URL da Imagem
                    </label>
                    <input
                      type="text"
                      name="imagem"
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={formData.imagem}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>
                      <AlignLeft size={14} /> Subtítulo
                    </label>
                    <input
                      type="text"
                      name="subtitulo"
                      placeholder="Subtítulo ou tagline do evento..."
                      value={formData.subtitulo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>
                      <AlignLeft size={14} /> Código PIX
                    </label>
                    <input
                      type="text"
                      name="pixCode"
                      placeholder="Código PIX para pagamento..."
                      value={formData.pixCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="admin-buttons">
                  <button type="submit" className="btn-save">
                    <Save size={16} />
                    {editingId ? "Atualizar Evento" : "Salvar Cadastro"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={clearForm}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Data</th>
                  <th>Local</th>
                  <th>Preço</th>
                  <th>Vagas</th>
                  <th>Tema</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      <CalendarDays size={40} />
                      <p>Nenhum evento cadastrado.</p>
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((evt) => {
                    const vagasRestantes = (evt.limite || 0) - (evt.ingressosVendidos || 0);
                    const occupancyRate = evt.limite > 0 
                      ? Math.round(((evt.ingressosVendidos || 0) / evt.limite) * 100) 
                      : 0;
                    
                    return (
                      <tr key={evt._id || evt.id}>
                        <td>
                          <div className="car-cell">
                            <div className="car-thumb">
                              {evt.imagem ? (
                                <img src={evt.imagem} alt={evt.nome} />
                              ) : (
                                <CalendarDays size={20} />
                              )}
                            </div>
                            <div className="car-info">
                              <strong>{evt.nome}</strong>
                              <span>{evt.duracao} · {evt.tituloResumo}</span>
                            </div>
                          </div>
                        </td>
                        <td>{evt.data}</td>
                        <td>{evt.local}</td>
                        <td className="price-cell">
                          R$ {evt.precoIngresso?.toLocaleString("pt-BR")}
                        </td>
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px" }}>
                              {vagasRestantes} / {evt.limite} restantes
                            </span>
                            <div style={{ 
                              width: "100%", 
                              height: "4px", 
                              background: "rgba(255,255,255,0.08)", 
                              borderRadius: "2px",
                              overflow: "hidden"
                            }}>
                              <div style={{
                                width: `${occupancyRate}%`,
                                height: "100%",
                                background: occupancyRate >= 90 ? "#ef4444" : occupancyRate >= 70 ? "#f59e0b" : "#10b981",
                                borderRadius: "2px",
                                transition: "width 0.3s ease"
                              }} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span 
                            className="badge-standard"
                            style={{
                              borderColor: getThemeColor(evt.tema),
                              color: getThemeColor(evt.tema),
                              background: `${getThemeColor(evt.tema)}15`,
                            }}
                          >
                            {getThemeLabel(evt.tema)}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              className="btn-edit"
                              onClick={() => handleEdit(evt)}
                              title="Editar"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(evt._id || evt.id)}
                              title="Excluir"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}