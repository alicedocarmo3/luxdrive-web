import { useState, useEffect } from "react";
import {
  Car,
  CalendarDays,
  Tag,
  Building2,
  Users,
  Search,
  ChevronRight,
  Menu,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Admin.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "DASHBOARD", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { id: "CARS", label: "Carros", icon: Car, path: "/admin/cars" },
    { id: "EVENTS", label: "Eventos", icon: CalendarDays, path: "/admin/events" },
    { id: "BRANDS", label: "Marcas", icon: Tag, path: "/admin/brands" },
    { id: "SEDES", label: "Sedes", icon: Building2, path: "/admin/sedes" },
    { id: "USERS", label: "Usuários", icon: Users, path: "/admin/users" },
  ];

  // Sincroniza activeTab com a rota atual
  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.id);
    }
  }, [location.pathname]);

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
          <Car size={28} strokeWidth={1.5} />
          <span className="brand-text">Admin</span>
        </div>
        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={isActive ? "active" : ""}
                onClick={() => handleMenuClick(item)}
                title={item.label}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="menu-label">{item.label}</span>
                <ChevronRight
                  size={14}
                  className="menu-arrow"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateX(0)"
                      : "translateX(-5px)",
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
          <div className="topbar-user">
            <span>Admin</span>
          </div>
        </header>

        <main className="content-body">
          <div className="dashboard-welcome">
            <h1>Bem-vindo ao Painel Administrativo</h1>
            <p>Selecione uma opção no menu lateral para começar a gerenciar.</p>
            
            <div className="dashboard-cards">
              {menuItems.filter(i => i.id !== "DASHBOARD").map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className="dashboard-card"
                    onClick={() => handleMenuClick(item)}
                  >
                    <Icon size={32} strokeWidth={1.5} />
                    <h3>{item.label}</h3>
                    <ChevronRight size={18} />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}