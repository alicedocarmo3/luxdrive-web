import { useState, useEffect } from "react";
import {
  Car,
  CalendarDays,
  Tag,
  Building2,
  Users,
  Search,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Admin.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
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
    <div className="admin-page-wrapper">
      <header className="admin-topbar">
        <div className="admin-topbar-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar veículos, eventos, usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="admin-topbar-user">
          <span>Admin</span>
        </div>
      </header>

      <main className="admin-content-body">
        <div className="dashboard-welcome">
          <h1>Bem-vindo ao Painel Administrativo</h1>
          <p>Selecione uma opção abaixo para começar a gerenciar.</p>
          
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
  );
}
