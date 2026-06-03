import { useEffect, useState } from "react";
import "../styles/Admin.css";
import { 
  Car, Tag, Building2, Calendar, PlusCircle, Pencil, Trash2, 
  Shield, ShieldAlert, MapPin, Clock, Users, UserCheck,
  TrendingUp, DollarSign, Briefcase, Settings, AlertTriangle, 
  FileText, BadgeAlert, CalendarDays, FileSpreadsheet, CheckCircle2, XCircle, Mail, Layers
} from "lucide-react";
import {
  getCars, createCar, updateCar, deleteCar,
  getBrands, createBrand, updateBrand, deleteBrand,
  getSedes, createSede, updateSede, deleteSede,
  getEvents, createEvent, updateEvent, deleteEvent,
  getUsers, deleteUser
} from "../services/adminService";

export default function Admin() {
  // Define qual tela o administrador está visualizando
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingId, setEditingId] = useState(null);

  // Estados de Dados do Banco (Carros populados inicialmente de acordo com a interface ICarro e quantidade)
  const [cars, setCars] = useState([
    { id: 1, modelo: "Porsche 911 Carrera S", ano: 2024, preco: 850000, km: 0, imagens: ["https://example.com/porsche.jpg"], blindado: false, motor: "3.0 Boxer Bi-turbo", cor: "Cinza Giz", potencia: "450 cv", cambio: "PDK 8 marchas", sedeId: 1, quantidade: 3 },
    { id: 2, modelo: "Ferrari F8 Tributo", ano: 2023, preco: 3400000, km: 1200, imagens: ["https://example.com/ferrari.jpg"], blindado: false, motor: "3.9 V8 Bi-turbo", cor: "Rosso Corsa", potencia: "720 cv", cambio: "Dupla Embreagem 7 m.", sedeId: 2, quantidade: 1 }
  ]);
  const [brands, setBrands] = useState([
    { id: 1, nome: "Porsche", linkLogo: "", linkBanner: "", descricao: "Performance alemã", carrosId: [1] },
    { id: 2, nome: "Ferrari", linkLogo: "", linkBanner: "", descricao: "Paixão automobilística italiana", carrosId: [2] }
  ]);
  const [sedes, setSedes] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  // Mock de Solicitações de Ingressos (Módulo de Eventos)
  const [ticketOrders, setTicketOrders] = useState([
    { 
      id: 101, 
      clienteName: "Rodrigo Almeida", 
      clienteEmail: "rodrigo.almeida@email.com", 
      eventoId: 1, 
      eventoNome: "Experiência de Pista: Porsche Cup", 
      status: "Pendente", 
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    { 
      id: 102, 
      clienteName: "Felipe Massa", 
      clienteEmail: "felipe.massa@email.com", 
      eventoId: 2, 
      eventoNome: "Ferrari Trackday Interlagos", 
      status: "Pendente", 
      createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
    },
    { 
      id: 103, 
      clienteName: "Bruno Senna", 
      clienteEmail: "bruno@email.com", 
      eventoId: 1, 
      eventoNome: "Experiência de Pista: Porsche Cup", 
      status: "Pago", 
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() 
    }
  ]);

  // Estados Simulados para as Novas Ferramentas (CRM, Logs e FIPE)
  const [fipeSuggestion, setFipeSuggestion] = useState("");
  const [leads, setLeads] = useState([
    { id: 1, nome: "Carlos Silva", email: "carlos@email.com", carroInteresse: "Porsche 911 Carrera S", status: "Novo", dataAgendamento: "" },
    { id: 2, nome: "Mariana Costa", email: "mari@email.com", carroInteresse: "Ferrari F8 Tributo", status: "Test-drive Agendado", dataAgendamento: "2026-06-15T14:00" }
  ]);
  const [logs, setLogs] = useState([
    { id: 1, usuario: "Admin Master", acao: "Criou novo veículo (Porsche 911)", data: "01/06/2026 14:32" },
    { id: 2, usuario: "Sistema", acao: "Token do Mercado Pago verificado", data: "01/06/2026 15:10" }
  ]);

  // Estado do Formulário Único Atualizado
  const [formData, setFormData] = useState({
    modelo: "", ano: "", preco: "", km: "", imagens: "", blindado: false, motor: "", cor: "", potencia: "", cambio: "", sedeId: "", quantidade: 1,
    statusEstoque: "Disponível", valorFinanciamento: "",
    nomeMarca: "", linkLogo: "", linkBanner: "", descricaoMarca: "", carrosIdMarca: "",
    nomeSede: "", endereco: "", cidade: "", estado: "", telefone: "", horario: "", carrosIdSede: "",
    nomeEvento: "", limite: "", local: "", data: "", descricaoEvento: "", incluso: "", 
    ingressosVendidos: 0, imagemEvento: "", precoIngresso: "", 
    duracao: "", vagasRestantes: "", tema: "ultimate", pixCode: "", tituloResumo: "", subtitulo: ""
  });

  async function loadAllData() {
    try {
      const [sedesData, eventsData, usersData] = await Promise.all([
        getSedes().catch(() => []),
        getEvents().catch(() => []),
        getUsers().catch(() => [])
      ]);
      setSedes(Array.isArray(sedesData) ? sedesData : []);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  useEffect(() => {
    loadAllData();

    const interval = setInterval(() => {
      setTicketOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.status === "Pendente") {
            const timeElapsed = Date.now() - new Date(order.createdAt).getTime();
            const fifteenMinutes = 15 * 60 * 1000;
            if (timeElapsed > fifteenMinutes) {
              setLogs(l => [
                { id: Date.now(), usuario: "Sistema", acao: `Pedido #${order.id} cancelado automaticamente por timeout (15 min)`, data: new Date().toLocaleString() },
                ...l
              ]);
              return { ...order, status: "Cancelado" };
            }
          }
          return order;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleConfirmPixPayment = (orderId, eventId) => {
    setTicketOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        setEvents(prevEvents => prevEvents.map(evt => {
          if (evt.id === eventId) {
            return { 
              ...evt, 
              vagasRestantes: Math.max(0, (evt.vagasRestantes || evt.limite) - 1),
              ingressosVendidos: (evt.ingressosVendidos || 0) + 1 
            };
          }
          return evt;
        }));

        setLogs(l => [
          { id: Date.now(), usuario: "Sistema", acao: `E-mail enviado para ${order.clienteEmail} com os dados do ingresso para o evento.`, data: new Date().toLocaleString() },
          { id: Date.now(), usuario: "Admin", acao: `Confirmou Pix manualmente para o Pedido #${orderId}`, data: new Date().toLocaleString() },
          ...l
        ]);

        alert(`Sucesso!\nStatus do pedido #${orderId} alterado para Pago.\nVaga reservada e e-mail com os ingressos enviado para ${order.clienteEmail}.`);
        return { ...order, status: "Pago" };
      }
      return order;
    }));
  };

  const handleTriggerReminderEmail = (clienteEmail, orderId) => {
    setLogs(l => [
      { id: Date.now(), usuario: "Admin", acao: `E-mail de cobrança "Finalize sua compra" disparado para ${clienteEmail} (Pedido #${orderId})`, data: new Date().toLocaleString() },
      ...l
    ]);
    alert(`E-mail enviado com sucesso para ${clienteEmail}:\n“Finalize sua compra”`);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "modelo" && value.length > 2) {
        setFipeSuggestion(`Sugestão Tabela FIPE para "${value}": R$ ${(Math.random() * 400000 + 450000).toLocaleString('pt-BR')}`);
      }
      return updated;
    });
  };

  // Trata a alteração de status do CRM e reduz a quantidade disponível caso a venda seja ganha
  const handleLeadStatusChange = (leadId, newStatus, carroModelo) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));

    if (newStatus === "Venda Concluída") {
      setCars(prevCars => prevCars.map(car => {
        if (car.modelo.toLowerCase() === carroModelo.toLowerCase()) {
          const novaQtd = Math.max(0, car.quantidade - 1);
          
          setLogs(l => [
            { id: Date.now(), usuario: "Sistema (CRM)", acao: `Venda concluída! O estoque do modelo '${car.modelo}' foi decrementado para: ${novaQtd} unidade(s).`, data: new Date().toLocaleString() },
            ...l
          ]);

          if (novaQtd === 0) {
            alert(`Atenção Administrador: O estoque para o veículo '${car.modelo}' chegou a 0!`);
          }
          return { ...car, quantidade: novaQtd };
        }
        return car;
      }));
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setFipeSuggestion("");
    setFormData({
      modelo: "", ano: "", preco: "", km: "", imagens: "", blindado: false, motor: "", cor: "", potencia: "", cambio: "", sedeId: "", quantidade: 1,
      statusEstoque: "Disponível", valorFinanciamento: "",
      nomeMarca: "", linkLogo: "", linkBanner: "", descricaoMarca: "", carrosIdMarca: "",
      nomeSede: "", endereco: "", city: "", estado: "", telefone: "", horario: "", carrosIdSede: "",
      nomeEvento: "", limite: "", local: "", data: "", descricaoEvento: "", incluso: "", ingressosVendidos: 0, imagemEvento: "", precoIngresso: "", duracao: "", vagasRestantes: "", tema: "ultimate", pixCode: "", tituloResumo: "", subtitulo: ""
    });
  };

  // Handler do Módulo de Carros (Semelhante ao de Eventos)
  const handleCarSubmit = (e) => {
    e.preventDefault();
    const carObject = {
      id: editingId || Date.now(),
      modelo: formData.modelo,
      ano: parseInt(formData.ano),
      preco: parseFloat(formData.preco),
      km: parseInt(formData.km),
      imagens: formData.imagens ? formData.imagens.split(",").map(url => url.trim()) : [],
      blindado: formData.blindado,
      motor: formData.motor,
      cor: formData.cor,
      potencia: formData.potencia,
      cambio: formData.cambio,
      sedeId: parseInt(formData.sedeId) || 1,
      quantidade: parseInt(formData.quantidade) || 1
    };

    if (editingId) {
      setCars(cars.map(c => c.id === editingId ? carObject : c));
      setLogs(l => [{ id: Date.now(), usuario: "Admin", acao: `Atualizou dados do veículo: ${carObject.modelo}`, data: new Date().toLocaleString() }, ...l]);
      alert("Veículo atualizado com sucesso!");
    } else {
      setCars([...cars, carObject]);
      setLogs(l => [{ id: Date.now(), usuario: "Admin", acao: `Cadastrou novo veículo no catálogo: ${carObject.modelo} (Qtd: ${carObject.quantidade})`, data: new Date().toLocaleString() }, ...l]);
      alert("Novo veículo cadastrado com sucesso!");
    }
    clearForm();
  };

  // Handler de Nova Marca Separada
  const handleBrandSubmit = (e) => {
    e.preventDefault();
    const brandObject = {
      id: Date.now(),
      nome: formData.nomeMarca,
      linkLogo: formData.linkLogo,
      linkBanner: formData.linkBanner,
      descricao: formData.descricaoMarca,
      carrosId: []
    };
    setBrands([...brands, brandObject]);
    setLogs(l => [{ id: Date.now(), usuario: "Admin", acao: `Cadastrou uma nova marca: ${brandObject.nome}`, data: new Date().toLocaleString() }, ...l]);
    alert(`Marca '${formData.nomeMarca}' salva com sucesso!`);
    clearForm();
  };

  // Submit Genérico para Eventos
  async function handleSubmit(e) {
    e.preventDefault();
    clearForm();
    loadAllData();
  }

  return (
    <div className="admin-container">
      {/* BARRA LATERAL (SIDEBAR DE CONTROLE) */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">LEGACYDRIVE</div>
        <nav className="sidebar-menu">
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <TrendingUp size={18} /> Dashboard
          </button>
          <button className={activeTab === "carros" ? "active" : ""} onClick={() => { setActiveTab("carros"); clearForm(); }}>
            <Car size={18} /> Módulo de Carros
          </button>
          <button className={activeTab === "marcas" ? "active" : ""} onClick={() => { setActiveTab("marcas"); clearForm(); }}>
            <Layers size={18} /> Marcas e Fabricantes
          </button>
          <button className={activeTab === "eventos" ? "active" : ""} onClick={() => { setActiveTab("eventos"); clearForm(); }}>
            <Calendar size={18} /> Eventos e Ingressos
          </button>
          <button className={activeTab === "crm" ? "active" : ""} onClick={() => setActiveTab("crm")}>
            <Briefcase size={18} /> CRM & Leads
          </button>
          <button className={activeTab === "usuarios" ? "active" : ""} onClick={() => setActiveTab("usuarios")}>
            <Users size={18} /> Gestão de Usuários
          </button>
          <button className={activeTab === "config" ? "active" : ""} onClick={() => setActiveTab("config")}>
            <Settings size={18} /> Configurações
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO DINÂMICO CONFORME A ABA SELECIONADA */}
      <main className="admin-main-content">
        
        {/* 1. ABA DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="tab-content">
            <h2>Painel de Controle Principal</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <DollarSign size={24} className="icon-blue" />
                <div>
                  <p>Faturamento Estimado</p>
                  <h3>R$ 2.450.000</h3>
                </div>
              </div>
              <div className="metric-card">
                <Users size={24} className="icon-green" />
                <div>
                  <p>Taxa de Conversão</p>
                  <h3>18.4%</h3>
                </div>
              </div>
              <div className="metric-card">
                <Car size={24} className="icon-purple" />
                <div>
                  <p>Total no Estoque</p>
                  <h3>{cars.reduce((acc, car) => acc + car.quantidade, 0)} Veículos</h3>
                </div>
              </div>
            </div>

            <div className="dashboard-row">
              <div className="dashboard-panel alert-panel">
                <h3><AlertTriangle size={18} /> Alertas do Sistema</h3>
                <div className="alert-item danger">
                  <strong>Chave Stripe/Mercado Pago:</strong> Token de produção expira em breve.
                </div>
                <div className="alert-item warning">
                  <strong>Estoque Crítico:</strong> Existem {cars.filter(c => c.quantidade === 0).length} modelos sem estoque disponível.
                </div>
              </div>

              <div className="dashboard-panel log-panel">
                <h3><FileText size={18} /> Histórico de Atividades (Auditoria)</h3>
                <div className="log-list">
                  {logs.map(log => (
                    <div key={log.id} className="log-item">
                      <span className="log-time">[{log.data}]</span> <strong>{log.usuario}</strong>: {log.acao}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. NOVO MÓDULO DE CARROS (ESPELHADO NO DE EVENTOS) */}
        {activeTab === "carros" && (
          <div className="tab-content">
            <h2>Módulo de Carros Esportivos</h2>
            <section className="form-container-box">
              <h3>{editingId ? `Editar Carro #${editingId}` : "Cadastrar Novo Veículo (ICarro)"}</h3>
              <form onSubmit={handleCarSubmit} className="premium-form">
                <input type="text" name="modelo" placeholder="Modelo do Veículo" value={formData.modelo} onChange={handleInputChange} required />
                <input type="number" name="ano" placeholder="Ano Fabricação" value={formData.ano} onChange={handleInputChange} required />
                <input type="number" name="preco" placeholder="Preço de Venda (R$)" value={formData.preco} onChange={handleInputChange} required />
                <input type="number" name="km" placeholder="Quilometragem" value={formData.km} onChange={handleInputChange} required />
                
                <input type="text" name="motor" placeholder="Motorização" value={formData.motor} onChange={handleInputChange} />
                <input type="text" name="cor" placeholder="Cor Exterior" value={formData.cor} onChange={handleInputChange} />
                <input type="text" name="potencia" placeholder="Potência (Ex: 450 cv)" value={formData.potencia} onChange={handleInputChange} />
                <input type="text" name="cambio" placeholder="Tipo de Câmbio" value={formData.cambio} onChange={handleInputChange} />
                
                <input type="number" name="sedeId" placeholder="ID da Sede Vinculada" value={formData.sedeId} onChange={handleInputChange} />
                <input type="number" name="quantidade" placeholder="Quantidade em Estoque" value={formData.quantidade} onChange={handleInputChange} required min="0" />
                
                <input type="text" name="imagens" placeholder="URLs das Imagens (Separadas por vírgula)" value={formData.imagens} onChange={handleInputChange} style={{gridColumn: "span 2"}} />

                <div style={{gridColumn: "span 2", display: "flex", alignItems: "center", gap: "8px", margin: "5px 0"}}>
                  <input type="checkbox" name="blindado" id="blindado" checked={formData.blindado} onChange={handleInputChange} />
                  <label htmlFor="blindado"><strong>Este veículo é blindado</strong></label>
                </div>

                {fipeSuggestion && <div className="fipe-box" style={{gridColumn: "span 2"}}>{fipeSuggestion}</div>}

                <div className="form-actions-row" style={{gridColumn: "span 2"}}>
                  <button type="submit" className="btn-primary">Salvar Carro</button>
                  {editingId && <button type="button" className="btn-secondary" onClick={clearForm}>Cancelar</button>}
                </div>
              </form>
            </section>

            <h3>Estoque e Carros Cadastrados no Site</h3>
            <div className="tickets-management-list">
              {cars.map((car) => (
                <div key={car.id} className="ticket-order-card" style={{borderLeft: "4px solid #3b82f6"}}>
                  <div className="ticket-header">
                    <span><strong>{car.modelo}</strong> ({car.ano})</span>
                    <span className={`status-pill ${car.quantidade > 0 ? "pago" : "cancelado"}`}>
                      {car.quantidade} em Estoque
                    </span>
                  </div>
                  <div className="ticket-body">
                    <p><strong>Preço Unitário:</strong> R$ {car.preco.toLocaleString('pt-BR')}</p>
                    <p><strong>Configuração:</strong> {car.motor} | {car.cambio} | Cor: {car.cor}</p>
                    <p style={{fontSize: "0.8rem", color: "#6b7280"}}>Quilometragem: {car.km.toLocaleString()} km | ID Sede: {car.sedeId} | {car.blindado ? "Blindado" : "Sem Blindagem"}</p>
                  </div>
                  <div className="ticket-actions-panel">
                    <button type="button" className="btn-action-warn" onClick={() => {
                      setEditingId(car.id);
                      setFormData({
                        ...formData,
                        modelo: car.modelo, ano: car.ano, preco: car.preco, km: car.km,
                        motor: car.motor, cor: car.cor, potencia: car.potencia, cambio: car.cambio,
                        sedeId: car.sedeId, quantidade: car.quantidade, blindado: car.blindado,
                        imagens: car.imagens.join(", ")
                      });
                    }}><Pencil size={14} /> Editar Dados</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ABA MARCAS (ISOLADA CONFORME A INTERFACE IMARCA) */}
        {activeTab === "marcas" && (
          <div className="tab-content">
            <h2>Gerenciamento de Marcas (IMarca)</h2>
            <section className="form-container-box">
              <h3>Cadastrar Nova Marca</h3>
              <form onSubmit={handleBrandSubmit} className="premium-form">
                <input type="text" name="nomeMarca" placeholder="Nome do Fabricante (Ex: Lamborghini)" value={formData.nomeMarca} onChange={handleInputChange} required style={{gridColumn: "span 2"}} />
                <input type="text" name="linkLogo" placeholder="URL da Logomarca (.png/.svg)" value={formData.linkLogo} onChange={handleInputChange} />
                <input type="text" name="linkBanner" placeholder="URL do Banner Exclusivo da Página" value={formData.linkBanner} onChange={handleInputChange} />
                
                <textarea name="descricaoMarca" placeholder="História ou descrição institucional do fabricante..." value={formData.descricaoMarca} onChange={handleInputChange} style={{gridColumn: "span 2", minHeight: "80px"}}></textarea>

                <div className="form-actions-row" style={{gridColumn: "span 2"}}>
                  <button type="submit" className="btn-primary">Criar Marca</button>
                </div>
              </form>
            </section>
          </div>
        )}

        {/* 4. ABA EVENTOS E INGRESSOS */}
        {activeTab === "eventos" && (
          <div className="tab-content">
            <h2>Módulo de Eventos Corporativos</h2>
            <section className="form-container-box">
              <h3>{editingId ? "Editar Evento" : "Criar Novo Evento Exclusivo (IEvento)"}</h3>
              <form onSubmit={handleSubmit} className="premium-form">
                <input type="text" name="nomeEvento" placeholder="Nome do Evento" value={formData.nomeEvento} onChange={handleInputChange} required />
                <input type="text" name="local" placeholder="Local do Evento" value={formData.local} onChange={handleInputChange} required />
                <input type="datetime-local" name="data" value={formData.data} onChange={handleInputChange} required />
                <input type="number" name="limite" placeholder="Limite Total de Vagas" value={formData.limite} onChange={handleInputChange} required />
                
                <input type="text" name="duracao" placeholder="Duração (ex: 4 horas)" value={formData.duracao} onChange={handleInputChange} />
                <input type="number" name="vagasRestantes" placeholder="Vagas Restantes" value={formData.vagasRestantes} onChange={handleInputChange} />
                <input type="number" name="precoIngresso" placeholder="Preço do Ingresso (R$)" value={formData.precoIngresso} onChange={handleInputChange} />
                
                <select name="tema" value={formData.tema} onChange={handleInputChange}>
                  <option value="ultimate">Tema Ultimate (Padrão)</option>
                  <option value="porsche">Tema Porsche</option>
                  <option value="lambo">Tema Lamborghini</option>
                  <option value="ferrari">Tema Ferrari</option>
                  <option value="pagani">Tema Pagani</option>
                  <option value="rolls">Tema Rolls Royce</option>
                </select>

                <input type="text" name="tituloResumo" placeholder="Título Resumo" value={formData.tituloResumo} onChange={handleInputChange} />
                <input type="text" name="subtitulo" placeholder="Subtítulo do Card" value={formData.subtitulo} onChange={handleInputChange} />
                <input type="text" name="imagemEvento" placeholder="URL da Imagem do Evento" value={formData.imagemEvento} onChange={handleInputChange} />
                <input type="text" name="pixCode" placeholder="Código Copia e Cola Pix" value={formData.pixCode} onChange={handleInputChange} />
                
                <textarea name="descricaoEvento" placeholder="Descrição Detalhada do Evento" value={formData.descricaoEvento} onChange={handleInputChange} style={{gridColumn: "span 2", minHeight: "60px"}}></textarea>
                <textarea name="incluso" placeholder="O que está incluso? (Separado por vírgulas)" value={formData.incluso} onChange={handleInputChange} style={{gridColumn: "span 2", minHeight: "60px"}}></textarea>

                <div className="form-actions-row">
                  <button type="submit" className="btn-primary">Publicar Evento</button>
                </div>
              </form>
            </section>

            <h3>Solicitações de Compra de Ingressos (Controle de Pix)</h3>
            <div className="tickets-management-list">
              {ticketOrders.map((order) => (
                <div key={order.id} className={`ticket-order-card status-${order.status.toLowerCase()}`}>
                  <div className="ticket-header">
                    <span><strong>Pedido #{order.id}</strong></span>
                    <span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                  <div className="ticket-body">
                    <p><strong>Cliente:</strong> {order.clienteName} ({order.clienteEmail})</p>
                    <p><strong>Evento:</strong> {order.eventoNome}</p>
                    <p style={{fontSize: "0.8rem", color: "#6b7280"}}>Solicitado em: {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                  {order.status === "Pendente" && (
                    <div className="ticket-actions-panel">
                      <button type="button" className="btn-action-success" onClick={() => handleConfirmPixPayment(order.id, order.eventoId)}>
                        <CheckCircle2 size={14} /> Pix Caiu no Banco
                      </button>
                      <button type="button" className="btn-action-warn" onClick={() => handleTriggerReminderEmail(order.clienteEmail, order.id)}>
                        <Mail size={14} /> Cobrar por E-mail
                      </button>
                    </div>
                  )}
                  {order.status === "Pago" && (
                    <div className="ticket-success-footer">
                      <UserCheck size={14} style={{color: "#10b981"}} /> Ingressos enviados e vaga computada.
                    </div>
                  )}
                  {order.status === "Cancelado" && (
                    <div className="ticket-danger-footer">
                      <XCircle size={14} style={{color: "#ef4444"}} /> Tempo limite esgotado (+15min).
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. ABA CRM (COM RETORNO DINÂMICO DE ATUALIZAÇÃO DO ESTOQUE DE CARROS) */}
        {activeTab === "crm" && (
          <div className="tab-content">
            <div className="header-flex">
              <h2>Funil de Vendas e Leads</h2>
              <button className="btn-primary"><FileSpreadsheet size={16} /> Exportar Relatório (.CSV)</button>
            </div>

            <div className="crm-kanban">
              {leads.map(lead => (
                <div key={lead.id} className="crm-card">
                  <h4>{lead.nome}</h4>
                  <p><strong>Interesse:</strong> {lead.carroInteresse}</p>
                  <p><strong>E-mail:</strong> {lead.email}</p>
                  
                  {lead.status === "Test-drive Agendado" && lead.dataAgendamento && (
                    <div className="agenda-alert">
                      <CalendarDays size={14} /> Test-drive: {lead.dataAgendamento}
                    </div>
                  )}
                  
                  <select 
                    value={lead.status} 
                    onChange={(e) => handleLeadStatusChange(lead.id, e.target.value, lead.carroInteresse)}
                  >
                    <option value="Novo">Novo</option>
                    <option value="Contatado">Contatado</option>
                    <option value="Em Negociação">Em Negociação</option>
                    <option value="Test-drive Agendado">Test-drive Agendado</option>
                    <option value="Venda Concluída">Venda Concluída</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. GESTÃO DE USUÁRIOS */}
        {activeTab === "usuarios" && (
          <div className="tab-content">
            <h2>Controle de Acesso (RBAC)</h2>
            {/* Mantido original */}
          </div>
        )}

        {/* 7. CONFIGURAÇÕES */}
        {activeTab === "config" && (
          <div className="tab-content">
            <h2>Configurações Globais</h2>
            {/* Mantido original */}
          </div>
        )}

      </main>
    </div>
  );
}