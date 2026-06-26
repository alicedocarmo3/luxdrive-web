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
  Phone,
  Clock,
  Type,
  Save,
  Menu,
  Hash,
  Globe,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin.css";
import {
  getSedes,
  createSede,
  updateSede,
  deleteSede,
} from "../../services/sedeService";

export default function Sedes() {
  const [activeTab, setActiveTab] = useState("SEDES");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sedes, setSedes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalSedes: 0,
    totalCities: 0,
    totalStates: 0,
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    telefone: "",
    horario: "",
  });

  async function loadSedes() {
    try {
      const data = await getSedes();
      setSedes(data);
      const cities = new Set(data.map((sede) => sede.cidade)).size;
      const states = new Set(data.map((sede) => sede.estado)).size;
      setStats({
        totalSedes: data.length,
        totalCities: cities,
        totalStates: states,
      });
    } catch (error) {
      console.error("Erro ao carregar sedes:", error);
    }
  }

  useEffect(() => {
    loadSedes();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function clearForm() {
    setEditingId(null);
    setFormData({
      nome: "",
      endereco: "",
      cidade: "",
      estado: "",
      telefone: "",
      horario: "",
    });
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      nome: formData.nome,
      endereco: formData.endereco,
      cidade: formData.cidade,
      estado: formData.estado,
      telefone: formData.telefone,
      horario: formData.horario,
    };

    try {
      if (editingId) {
        await updateSede(editingId, payload);
      } else {
        await createSede(payload);
      }
      await loadSedes();
      clearForm();
    } catch (error) {
      console.error("Erro ao salvar sede:", error);
    }
  }

  function handleEdit(sede) {
    setEditingId(sede._id || sede.id);
    setFormData({
      nome: sede.nome || "",
      endereco: sede.endereco || "",
      cidade: sede.cidade || "",
      estado: sede.estado || "",
      telefone: sede.telefone || "",
      horario: sede.horario || "",
    });
    setShowForm(true);
  }

  async function handleDelete(id) {
    const confirmar = window.confirm("Deseja realmente excluir esta sede?");
    if (!confirmar) return;
    try {
      await deleteSede(id);
      await loadSedes();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }

  const filteredSedes = sedes.filter((sede) =>
    sede.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sede.cidade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sede.estado?.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Buscar sedes, cidades, estados..."
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
                <Building2 size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalSedes}</span>
                <span className="stat-label">Total de Sedes</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <Home size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalCities}</span>
                <span className="stat-label">Cidades Atendidas</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper orange">
                <Globe size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalStates}</span>
                <span className="stat-label">Estados Atendidos</span>
              </div>
            </div>
          </div>

          <div className="content-header">
            <div>
              <h2>Gerenciar Sedes</h2>
              <p className="content-subtitle">
                {filteredSedes.length} sede{filteredSedes.length !== 1 ? "s" : ""} encontrada
                {filteredSedes.length !== 1 ? "s" : ""}
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
              Adicionar Sede
            </button>
          </div>

          {showForm && (
            <div className="form-overlay">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>
                    {editingId ? "Editar Sede" : "Cadastrar Nova Sede"}
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
                      <Type size={14} /> Nome da Sede
                    </label>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Ex: Sede São Paulo"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <MapPin size={14} /> Endereço
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      placeholder="Ex: Av. Paulista, 1000"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Home size={14} /> Cidade
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      placeholder="Ex: São Paulo"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Hash size={14} /> Estado
                    </label>
                    <input
                      type="text"
                      name="estado"
                      placeholder="Ex: SP"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Phone size={14} /> Telefone
                    </label>
                    <input
                      type="text"
                      name="telefone"
                      placeholder="Ex: (11) 99999-9999"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Clock size={14} /> Horário de Funcionamento
                    </label>
                    <input
                      type="text"
                      name="horario"
                      placeholder="Ex: 08:00 às 18:00"
                      value={formData.horario}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="admin-buttons">
                  <button type="submit" className="btn-save">
                    <Save size={16} />
                    {editingId ? "Atualizar Sede" : "Salvar Cadastro"}
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
                  <th>Sede</th>
                  <th>Endereço</th>
                  <th>Cidade/Estado</th>
                  <th>Telefone</th>
                  <th>Horário</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSedes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <Building2 size={40} />
                      <p>Nenhuma sede cadastrada.</p>
                    </td>
                  </tr>
                ) : (
                  filteredSedes.map((sede) => (
                    <tr key={sede._id || sede.id}>
                      <td>
                        <div className="car-cell">
                          <div className="car-thumb" style={{ background: "rgba(255, 77, 0, 0.12)", color: "#ff4d00" }}>
                            <Building2 size={20} />
                          </div>
                          <div className="car-info">
                            <strong>{sede.nome}</strong>
                            <span>ID: {sede.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>{sede.endereco}</td>
                      <td>
                        <span className="badge-standard">
                          {sede.cidade} - {sede.estado}
                        </span>
                      </td>
                      <td>{sede.telefone}</td>
                      <td>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                          <Clock size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                          {sede.horario}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(sede)}
                            title="Editar"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(sede._id || sede.id)}
                            title="Excluir"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}