import { useEffect, useState } from "react";
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
} from "../../services/adminService";
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
  Gauge,
  Fuel,
  Palette,
  Zap,
  Shield,
  ImageIcon,
  DollarSign,
  GaugeCircle,
  Save,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/Admin.css";

export default function Cars() {
  const [activeTab, setActiveTab] = useState("CARS");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalCars: 0,
    totalValue: 0,
    avgPrice: 0,
    armoredCount: 0,
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    modelo: "",
    ano: "",
    preco: "",
    km: "",
    imagens: "",
    blindado: false,
    motor: "",
    cor: "",
    potencia: "",
    cambio: "",
  });

  async function loadCars() {
    try {
      const data = await getCars();
      setCars(data);
      const totalValue = data.reduce((acc, car) => acc + (car.preco || 0), 0);
      setStats({
        totalCars: data.length,
        totalValue: totalValue,
        avgPrice: data.length > 0 ? Math.round(totalValue / data.length) : 0,
        armoredCount: data.filter((car) => car.blindado).length,
      });
    } catch (error) {
      console.error("Erro ao carregar carros:", error);
    }
  }

  useEffect(() => {
    loadCars();
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
      modelo: "",
      ano: "",
      preco: "",
      km: "",
      imagens: "",
      blindado: false,
      motor: "",
      cor: "",
      potencia: "",
      cambio: "",
    });
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      modelo: formData.modelo,
      ano: Number(formData.ano),
      preco: Number(formData.preco),
      km: Number(formData.km),
      imagens: formData.imagens
        ? formData.imagens.split(",").map((img) => img.trim())
        : [],
      blindado: formData.blindado,
      motor: formData.motor,
      cor: formData.cor,
      potencia: formData.potencia,
      cambio: formData.cambio,
    };

    try {
      if (editingId) {
        await updateCar(editingId, payload);
      } else {
        await createCar(payload);
      }
      await loadCars();
      clearForm();
    } catch (error) {
      console.error("Erro ao salvar carro:", error);
    }
  }

  function handleEdit(car) {
    setEditingId(car._id);
    setFormData({
      modelo: car.modelo || "",
      ano: car.ano || "",
      preco: car.preco || "",
      km: car.km || "",
      imagens: car.imagens?.join(", ") || "",
      blindado: car.blindado || false,
      motor: car.motor || "",
      cor: car.cor || "",
      potencia: car.potencia || "",
      cambio: car.cambio || "",
    });
    setShowForm(true);
  }

  async function handleDelete(id) {
    const confirmar = window.confirm("Deseja realmente excluir este carro?");
    if (!confirmar) return;
    try {
      await deleteCar(id);
      await loadCars();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  }

  const filteredCars = cars.filter((car) =>
    car.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Buscar veículos, eventos, usuários..."
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
                <Car size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalCars}</span>
                <span className="stat-label">Total de Carros</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <DollarSign size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">
                  R$ {stats.totalValue.toLocaleString("pt-BR")}
                </span>
                <span className="stat-label">Valor Total do Estoque</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper orange">
                <GaugeCircle size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">
                  R$ {stats.avgPrice.toLocaleString("pt-BR")}
                </span>
                <span className="stat-label">Preço Médio</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper red">
                <Shield size={22} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats.armoredCount}</span>
                <span className="stat-label">Carros Blindados</span>
              </div>
            </div>
          </div>

          <div className="content-header">
            <div>
              <h2>Gerenciar Carros</h2>
              <p className="content-subtitle">
                {filteredCars.length} veículo{filteredCars.length !== 1 ? "s" : ""} encontrado
                {filteredCars.length !== 1 ? "s" : ""}
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
              Adicionar Carro
            </button>
          </div>

          {showForm && (
            <div className="form-overlay">
              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>
                    {editingId ? "Editar Carro" : "Cadastrar Novo Carro"}
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
                      <Car size={14} /> Modelo
                    </label>
                    <input
                      type="text"
                      name="modelo"
                      placeholder="Ex: Porsche 911 Turbo S"
                      value={formData.modelo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <CalendarDays size={14} /> Ano
                    </label>
                    <input
                      type="number"
                      name="ano"
                      placeholder="Ex: 2024"
                      value={formData.ano}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <DollarSign size={14} /> Preço (R$)
                    </label>
                    <input
                      type="number"
                      name="preco"
                      placeholder="Ex: 850000"
                      value={formData.preco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Gauge size={14} /> Quilometragem
                    </label>
                    <input
                      type="number"
                      name="km"
                      placeholder="Ex: 15000"
                      value={formData.km}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Fuel size={14} /> Motor
                    </label>
                    <input
                      type="text"
                      name="motor"
                      placeholder="Ex: 3.8L Twin-Turbo"
                      value={formData.motor}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Palette size={14} /> Cor
                    </label>
                    <input
                      type="text"
                      name="cor"
                      placeholder="Ex: Preto Obsidian"
                      value={formData.cor}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Zap size={14} /> Potência
                    </label>
                    <input
                      type="text"
                      name="potencia"
                      placeholder="Ex: 640 cv"
                      value={formData.potencia}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <GaugeCircle size={14} /> Câmbio
                    </label>
                    <input
                      type="text"
                      name="cambio"
                      placeholder="Ex: PDK 8 marchas"
                      value={formData.cambio}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>
                      <ImageIcon size={14} /> URLs das Imagens
                    </label>
                    <input
                      type="text"
                      name="imagens"
                      placeholder="Separe as URLs por vírgula"
                      value={formData.imagens}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="blindado"
                    checked={formData.blindado}
                    onChange={handleInputChange}
                  />
                  <Shield size={16} />
                  <span>Veículo Blindado</span>
                </label>

                <div className="admin-buttons">
                  <button type="submit" className="btn-save">
                    <Save size={16} />
                    {editingId ? "Atualizar Veículo" : "Salvar Cadastro"}
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
                  <th>Veículo</th>
                  <th>Ano</th>
                  <th>Preço</th>
                  <th>KM</th>
                  <th>Câmbio</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      <Car size={40} />
                      <p>Nenhum carro cadastrado.</p>
                    </td>
                  </tr>
                ) : (
                  filteredCars.map((car) => (
                    <tr key={car._id}>
                      <td>
                        <div className="car-cell">
                          <div className="car-thumb">
                            {car.imagens?.[0] ? (
                              <img src={car.imagens[0]} alt={car.modelo} />
                            ) : (
                              <Car size={20} />
                            )}
                          </div>
                          <div className="car-info">
                            <strong>{car.modelo}</strong>
                            <span>{car.motor} · {car.cor}</span>
                          </div>
                        </div>
                      </td>
                      <td>{car.ano}</td>
                      <td className="price-cell">
                        R$ {car.preco?.toLocaleString("pt-BR")}
                      </td>
                      <td>{car.km?.toLocaleString("pt-BR")} km</td>
                      <td>{car.cambio}</td>
                      <td>
                        {car.blindado ? (
                          <span className="badge-armored">
                            <Shield size={12} /> Blindado
                          </span>
                        ) : (
                          <span className="badge-standard">Padrão</span>
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(car)}
                            title="Editar"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(car._id)}
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