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
  ImageIcon,
  Type,
  Link,
  AlignLeft,
  Save,
  Menu,
  Hash,
  CarFront,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin.css";
import {
  getMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../../services/marcaService";

export default function Brands() {
  const [activeTab, setActiveTab] = useState("BRANDS");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [brands, setBrands] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalBrands: 0,
    totalCars: 0,
    avgCarsPerBrand: 0,
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    linkLogo: "",
    linkBanner: "",
    descricao: "",
    carrosId: "",
  });

  async function loadBrands() {
    try {
      const data = await getMarcas();
      setBrands(data);
      const totalCars = data.reduce((acc, brand) => acc + (brand.carrosId?.length || 0), 0);
      setStats({
        totalBrands: data.length,
        totalCars: totalCars,
        avgCarsPerBrand: data.length > 0 ? Math.round(totalCars / data.length) : 0,
      });
    } catch (error) {
      console.error("Erro ao carregar marcas:", error);
    }
  }

  useEffect(() => {
    loadBrands();
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
      linkLogo: "",
      linkBanner: "",
      descricao: "",
      carrosId: "",
    });
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      nome: formData.nome,
      linkLogo: formData.linkLogo,
      linkBanner: formData.linkBanner,
      descricao: formData.descricao,
      carrosId: formData.carrosId
        ? formData.carrosId.split(",").map((id) => Number(id.trim())).filter((id) => !isNaN(id))
        : [],
    };

    try {
      if (editingId) {
        await updateMarca(editingId, payload);
      } else {
        await createMarca(payload);
      }
      await loadBrands();
      clearForm();
    } catch (error) {
      console.error("Erro ao salvar marca:", error);
    }
  }

  function handleEdit(brand) {
    setEditingId(brand._id || brand.id);
    setFormData({
      nome: brand.nome || "",
      linkLogo: brand.linkLogo || "",
      linkBanner: brand.linkBanner || "",
      descricao: brand.descricao || "",
      carrosId: brand.carrosId?.join(", ") || "",
    });
    setShowForm(true);
  }

  async function handleDelete(id) {
    const confirmar = window.confirm("Deseja realmente excluir esta marca?");
    if (!confirmar) return;
    try {
      await deleteMarca(id);
      await loadBrands();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }

  const filteredBrands = brands.filter((brand) =>
    brand.nome?.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Buscar marcas..."
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
                <Tag size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalBrands}</span>
                <span className="stat-label">Total de Marcas</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <CarFront size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalCars}</span>
                <span className="stat-label">Total de Carros</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper orange">
                <Hash size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.avgCarsPerBrand}</span>
                <span className="stat-label">Média Carros/Marca</span>
              </div>
            </div>
          </div>

          <div className="content-header">
            <div>
              <h2>Gerenciar Marcas</h2>
              <p className="content-subtitle">
                {filteredBrands.length} marca{filteredBrands.length !== 1 ? "s" : ""} encontrada
                {filteredBrands.length !== 1 ? "s" : ""}
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
              Adicionar Marca
            </button>
          </div>

          {showForm && (
            <div className="form-overlay">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>
                    {editingId ? "Editar Marca" : "Cadastrar Nova Marca"}
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
                      <Type size={14} /> Nome da Marca
                    </label>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Ex: Porsche"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Link size={14} /> Link do Logo
                    </label>
                    <input
                      type="text"
                      name="linkLogo"
                      placeholder="https://exemplo.com/logo.png"
                      value={formData.linkLogo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <ImageIcon size={14} /> Link do Banner
                    </label>
                    <input
                      type="text"
                      name="linkBanner"
                      placeholder="https://exemplo.com/banner.jpg"
                      value={formData.linkBanner}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Hash size={14} /> IDs dos Carros
                    </label>
                    <input
                      type="text"
                      name="carrosId"
                      placeholder="1, 2, 3, 4 (separe por vírgula)"
                      value={formData.carrosId}
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
                      placeholder="Descrição da marca..."
                      value={formData.descricao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="admin-buttons">
                  <button type="submit" className="btn-save">
                    <Save size={16} />
                    {editingId ? "Atualizar Marca" : "Salvar Cadastro"}
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
                  <th>Marca</th>
                  <th>Descrição</th>
                  <th>Carros Vinculados</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      <Tag size={40} />
                      <p>Nenhuma marca cadastrada.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBrands.map((brand) => (
                    <tr key={brand._id || brand.id}>
                      <td>
                        <div className="car-cell">
                          <div className="car-thumb">
                            {brand.linkLogo ? (
                              <img src={brand.linkLogo} alt={brand.nome} />
                            ) : (
                              <Tag size={20} />
                            )}
                          </div>
                          <div className="car-info">
                            <strong>{brand.nome}</strong>
                            <span>ID: {brand.id}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {brand.descricao}
                      </td>
                      <td>
                        <span className="badge-standard">
                          {brand.carrosId?.length || 0} carro(s)
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(brand)}
                            title="Editar"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(brand._id || brand.id)}
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