import { useEffect, useState } from "react";
import "../styles/Admin.css";
import {
  TrendingUp, Car, Layers, Calendar, Users, Briefcase,
  Settings, Pencil, CheckCircle2, Mail, MapPin
} from "lucide-react";

import {
  getCars, createCar, updateCar, deleteCar,
  getBrands, createBrand,
  getEvents, getUsers, getSedes
} from "../services/adminService";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [sedes, setSedes] = useState([]);

  const [editingId, setEditingId] = useState(null);

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
    sedeId: "",
    quantidade: 1,
    nomeMarca: "",
    linkLogo: "",
    linkBanner: "",
    descricaoMarca: ""
  });

  // --- ESTADOS DO CRM ADICIONADOS ---
  const [propostas, setPropostas] = useState([
    {
      id: 1,
      nomeCliente: "Carla",
      email: "carla@email.com",
      carroInteresse: "Porsche 911 Carrera S",
      mensagem: "Tenho interesse em ver o carro de perto neste fim de semana.",
      status: "Pendente",
      dataVisita: "",
      horarioVisita: "",
      motivoRejeicao: "",
      historicoMensagens: []
    }
  ]);
  const [selectedProposta, setSelectedProposta] = useState(null);
  const [schedulingData, setSchedulingData] = useState({ data: "", horario: "" });
  
  // Novos estados para ações de Negar e Enviar Mensagem
  const [crmAction, setCrmAction] = useState(null); // "agendar" | "negar" | "mensagem"
  const [motivoNegado, setMotivoNegado] = useState("");
  const [mensagemDireta, setMensagemDireta] = useState("");
  // ----------------------------------

  async function loadAll() {
    try {
      const [carsData, brandsData, eventsData, usersData, sedesData] =
        await Promise.all([
          getCars(),
          getBrands(),
          getEvents(),
          getUsers(),
          getSedes()
        ]);

      setCars(carsData || []);
      setBrands(brandsData || []);
      setEvents(eventsData || []);
      setUsers(usersData || []);
      setSedes(sedesData || []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
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
      sedeId: "",
      quantidade: 1,
      nomeMarca: "",
      linkLogo: "",
      linkBanner: "",
      descricaoMarca: ""
    });
  }

  async function handleCarSubmit(e) {
    e.preventDefault();

    const payload = {
      ...formData,
      ano: Number(formData.ano),
      preco: Number(formData.preco),
      km: Number(formData.km),
      sedeId: Number(formData.sedeId),
      quantidade: Number(formData.quantidade),
      imagens: formData.imagens
        ? formData.imagens.split(",").map((i) => i.trim())
        : []
    };

    try {
      if (editingId) {
        await updateCar(editingId, payload);
      } else {
        await createCar(payload);
      }

      await loadAll();
      clearForm();
    } catch (err) {
      console.error("Erro ao salvar carro:", err);
    }
  }

  async function handleDeleteCar(id) {
    await deleteCar(id);
    await loadAll();
  }

 function handleEditCar(car) {
  setEditingId(car._id);

  setFormData({
    ...car,
    imagens: car.imagens?.join(", ") || ""
  });
}

  async function handleBrandSubmit(e) {
    e.preventDefault();

    const payload = {
      nome: formData.nomeMarca,
      linkLogo: formData.linkLogo,
      linkBanner: formData.linkBanner,
      descricao: formData.descricaoMarca,
      carrosId: []
    };

    try {
      await createBrand(payload);
      await loadAll();
      clearForm();
    } catch (err) {
      console.error("Erro ao salvar marca:", err);
    }
  }

  // --- FUNÇÕES DO CRM ADICIONADAS ---
  function handleConfirmSchedule(e) {
    e.preventDefault();
    if (!schedulingData.data || !schedulingData.horario) return;

    setPropostas(prev =>
      prev.map(item =>
        item.id === selectedProposta.id
          ? { ...item, status: "Agendado", dataVisita: schedulingData.data, horarioVisita: schedulingData.horario }
          : item
      )
    );

    console.log(`
      📧 [E-MAIL ENVIADO]
      Para: ${selectedProposta.email}
      Assunto: Visita agendada na LegacyDrive!
      Olá ${selectedProposta.nomeCliente}, sua visita para conhecer o carro "${selectedProposta.carroInteresse}" foi agendada para o dia ${schedulingData.data} às ${schedulingData.horario}. Te esperamos na nossa concessionária!
    `);

    alert(`Agendamento realizado e e-mail de confirmação enviado para ${selectedProposta.email}!`);
    resetCrmSection();
  }

  function handleDenyProposal(e) {
    e.preventDefault();
    if (!motivoNegado.trim()) return;

    setPropostas(prev =>
      prev.map(item =>
        item.id === selectedProposta.id
          ? { ...item, status: "Negado", motivoRejeicao: motivoNegado }
          : item
      )
    );

    console.log(`
      📧 [E-MAIL ENVIADO]
      Para: ${selectedProposta.email}
      Assunto: Atualização sobre sua proposta - LegacyDrive
      Olá ${selectedProposta.nomeCliente}, infelizmente não pudemos prosseguir com a sua proposta para o veículo "${selectedProposta.carroInteresse}".
      Motivo: ${motivoNegado}
    `);

    alert(`Proposta marcada como Negada. E-mail de justificativa enviado para ${selectedProposta.email}.`);
    resetCrmSection();
  }

  function handleSendMessage(e) {
    e.preventDefault();
    if (!mensagemDireta.trim()) return;

    setPropostas(prev =>
      prev.map(item =>
        item.id === selectedProposta.id
          ? { 
              ...item, 
              historicoMensagens: [...(item.historicoMensagens || []), mensagemDireta] 
            }
          : item
      )
    );

    console.log(`
      📧 [E-MAIL ENVIADO]
      Para: ${selectedProposta.email}
      Assunto: Mensagem da equipe LegacyDrive
      Olá ${selectedProposta.nomeCliente},
      
      ${mensagemDireta}
    `);

    alert(`Mensagem enviada com sucesso para o e-mail: ${selectedProposta.email}!`);
    resetCrmSection();
  }

  function resetCrmSection() {
    setSelectedProposta(null);
    setCrmAction(null);
    setSchedulingData({ data: "", horario: "" });
    setMotivoNegado("");
    setMensagemDireta("");
  }
  // ----------------------------------

  return (
    <div className="admin-container">

      <aside className="admin-sidebar">
        <div className="sidebar-brand">LEGACYDRIVE</div>

        <nav className="sidebar-menu">
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <TrendingUp size={18} /> Dashboard
          </button>

          <button className={activeTab === "carros" ? "active" : ""} onClick={() => setActiveTab("carros")}>
            <Car size={18} /> Carros
          </button>

          <button className={activeTab === "marcas" ? "active" : ""} onClick={() => setActiveTab("marcas")}>
            <Layers size={18} /> Marcas
          </button>

          <button className={activeTab === "eventos" ? "active" : ""} onClick={() => setActiveTab("eventos")}>
            <Calendar size={18} /> Eventos
          </button>

          <button className={activeTab === "crm" ? "active" : ""} onClick={() => setActiveTab("crm")}>
            <Briefcase size={18} /> CRM
          </button>

          <button className={activeTab === "usuarios" ? "active" : ""} onClick={() => setActiveTab("usuarios")}>
            <Users size={18} /> Usuários
          </button>

          <button className={activeTab === "config" ? "active" : ""} onClick={() => setActiveTab("config")}>
            <Settings size={18} /> Config
          </button>
        </nav>
      </aside>

      <main className="admin-main-content">

        {activeTab === "dashboard" && (
          <div className="dashboard-overview">
            <h2>Visão Geral do Sistema</h2>
            <p className="dashboard-subtitle">Acompanhe as métricas de todas as páginas da LegacyDrive</p>
            
            <div className="dashboard-cards-grid">
              
              {/* Card de Carros */}
              <div className="dashboard-card" onClick={() => setActiveTab("carros")}>
                <div className="card-icon icon-cars">
                  <Car size={24} />
                </div>
                <div className="card-info">
                  <h3>Carros</h3>
                  <p className="card-value">{cars.length}</p>
                  <span>Cadastrados no estoque</span>
                </div>
              </div>

              {/* Card de Marcas */}
              <div className="dashboard-card" onClick={() => setActiveTab("marcas")}>
                <div className="card-icon icon-brands">
                  <Layers size={24} />
                </div>
                <div className="card-info">
                  <h3>Marcas</h3>
                  <p className="card-value">{brands.length}</p>
                  <span>Fabricantes parceiras</span>
                </div>
              </div>

              {/* Card de Eventos */}
              <div className="dashboard-card" onClick={() => setActiveTab("eventos")}>
                <div className="card-icon icon-events">
                  <Calendar size={24} />
                </div>
                <div className="card-info">
                  <h3>Eventos</h3>
                  <p className="card-value">{events.length}</p>
                  <span>Exposições e lançamentos</span>
                </div>
              </div>

              {/* Card de Usuários */}
              <div className="dashboard-card" onClick={() => setActiveTab("usuarios")}>
                <div className="card-icon icon-users">
                  <Users size={24} />
                </div>
                <div className="card-info">
                  <h3>Usuários</h3>
                  <p className="card-value">{users.length}</p>
                  <span>Clientes e Administradores</span>
                </div>
              </div>

              {/* Card de Sedes */}
              <div className="dashboard-card" onClick={() => setActiveTab("config")}>
                <div className="card-icon icon-sedes">
                  <MapPin size={24} />
                </div>
                <div className="card-info">
                  <h3>Sedes</h3>
                  <p className="card-value">{sedes.length}</p>
                  <span>Filiais ativas</span>
                </div>
              </div>

              {/* Card de Atalho para CRM */}
              <div className="dashboard-card" onClick={() => setActiveTab("crm")}>
                <div className="card-icon icon-crm">
                  <Briefcase size={24} />
                </div>
                <div className="card-info">
                  <h3>CRM & Leads</h3>
                  <p className="card-value-text">Acessar</p>
                  <span>Gerenciar contatos e propostas</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "carros" && (
          <div>
            <h2>Carros</h2>

            <form onSubmit={handleCarSubmit}>
              <input name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleInputChange} />
              <input name="ano" placeholder="Ano" value={formData.ano} onChange={handleInputChange} />
              <input name="preco" placeholder="Preço" value={formData.preco} onChange={handleInputChange} />
              <input name="km" placeholder="KM" value={formData.km} onChange={handleInputChange} />
              <input name="motor" placeholder="Motor" value={formData.motor} onChange={handleInputChange} />
              <input name="cor" placeholder="Cor" value={formData.cor} onChange={handleInputChange} />
              <input name="potencia" placeholder="Potência" value={formData.potencia} onChange={handleInputChange} />
              <input name="cambio" placeholder="Câmbio" value={formData.cambio} onChange={handleInputChange} />
              <input name="sedeId" placeholder="Sede ID" value={formData.sedeId} onChange={handleInputChange} />
              <input name="quantidade" placeholder="Qtd" value={formData.quantidade} onChange={handleInputChange} />
              <input name="imagens" placeholder="Imagens (,) " value={formData.imagens} onChange={handleInputChange} />

              <button type="submit">
                {editingId ? "Atualizar" : "Salvar"}
              </button>

              {editingId && (
                <button type="button" onClick={clearForm}>
                  Cancelar
                </button>
              )}
            </form>

            <div>
              {cars.map((car) => (
                <div key={car._id}>
                  <p>{car.modelo}</p>

                  <button onClick={() => handleEditCar(car)}>
                    <Pencil size={14} />
                  </button>

                  <button onClick={() => handleDeleteCar(car._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "marcas" && (
          <div>
            <h2>Marcas</h2>

            <form onSubmit={handleBrandSubmit}>
              <input name="nomeMarca" placeholder="Nome" value={formData.nomeMarca} onChange={handleInputChange} />
              <input name="linkLogo" placeholder="Logo" value={formData.linkLogo} onChange={handleInputChange} />
              <input name="linkBanner" placeholder="Banner" value={formData.linkBanner} onChange={handleInputChange} />
              <input name="descricaoMarca" placeholder="Descrição" value={formData.descricaoMarca} onChange={handleInputChange} />

              <button type="submit">Salvar Marca</button>
            </form>
          </div>
        )}

        {activeTab === "eventos" && (
          <div>
            <h2>Eventos</h2>
            <p>Total eventos: {events.length}</p>
          </div>
        )}

        {activeTab === "crm" && (
          <div className="crm-container" style={{ padding: "20px" }}>
            <h2>CRM & Leads</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>Gerencie contatos e propostas</p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ flex: "2", minWidth: "300px" }}>
                {propostas.map((proposta) => (
                  <div key={proposta.id} style={{
                    background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px",
                    padding: "20px", marginBottom: "15px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ margin: "0 0 5px 0" }}>
                          {proposta.nomeCliente} — <span style={{ color: "#3182ce" }}>interesse em "{proposta.carroInteresse}"</span>
                        </h3>
                        <p style={{ margin: "5px 0", color: "#4a5568", fontStyle: "italic" }}>
                          "{proposta.mensagem}"
                        </p>
                        <span style={{ fontSize: "12px", color: "#718096", display: "flex", alignItems: "center", gap: "4px", marginTop: "8px" }}>
                          <Mail size={12} /> {proposta.email}
                        </span>
                      </div>
                      <span style={{
                        padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold",
                        background: proposta.status === "Agendado" ? "#c6f6d5" : proposta.status === "Negado" ? "#fed7d7" : "#feebc8",
                        color: proposta.status === "Agendado" ? "#22543d" : proposta.status === "Negado" ? "#742a2a" : "#744210"
                      }}>
                        {proposta.status}
                      </span>
                    </div>

                    {proposta.status === "Agendado" && (
                      <div style={{ marginTop: "15px", background: "#edf2f7", padding: "10px", borderRadius: "6px", fontSize: "14px" }}>
                        ✅ <strong>Visita confirmada:</strong> {proposta.dataVisita} às {proposta.horarioVisita}
                      </div>
                    )}

                    {proposta.status === "Negado" && (
                      <div style={{ marginTop: "15px", background: "#fff5f5", border: "1px solid #feb2b2", padding: "10px", borderRadius: "6px", fontSize: "14px", color: "#c53030" }}>
                        ❌ <strong>Proposta Recusada:</strong> {proposta.motivoRejeicao}
                      </div>
                    )}

                    {/* Exibir histórico de mensagens extras enviadas se existirem */}
                    {proposta.historicoMensagens && proposta.historicoMensagens.length > 0 && (
                      <div style={{ marginTop: "12px", borderTop: "1px dashed #e2e8f0", paddingTop: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "bold", color: "#a0aec0" }}>Mensagens Enviadas:</span>
                        {proposta.historicoMensagens.map((msg, idx) => (
                          <p key={idx} style={{ margin: "3px 0", fontSize: "12px", color: "#4a5568", background: "#f7fafc", padding: "4px 8px", borderRadius: "4px" }}>
                            💬 {msg}
                          </p>
                        ))}
                      </div>
                    )}

                    <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {proposta.status !== "Agendado" && proposta.status !== "Negado" && (
                        <>
                          <button
                            onClick={() => { setSelectedProposta(proposta); setCrmAction("agendar"); }}
                            style={{
                              backgroundColor: "#3182ce", color: "#fff", border: "none",
                              padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                            }}
                          >
                            Aceitar & Agendar
                          </button>

                          <button
                            onClick={() => { setSelectedProposta(proposta); setCrmAction("negar"); }}
                            style={{
                              backgroundColor: "#e53e3e", color: "#fff", border: "none",
                              padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px"
                            }}
                          >
                            Negar Proposta
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => { setSelectedProposta(proposta); setCrmAction("mensagem"); }}
                        style={{
                          backgroundColor: "#4a5568", color: "#fff", border: "none",
                          padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px",
                          display: "flex", alignItems: "center", gap: "4px"
                        }}
                      >
                        <Mail size={12} /> Enviar Mensagem
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Painel lateral dinâmico baseado na ação escolhida */}
              {selectedProposta && (
                <div style={{
                  flex: "1", minWidth: "250px", background: "#f7fafc", border: "1px solid #cbd5e0",
                  borderRadius: "8px", padding: "20px", height: "fit-content"
                }}>
                  
                  {crmAction === "agendar" && (
                    <>
                      <h3 style={{ margin: "0 0 15px 0" }}>Agendar para {selectedProposta.nomeCliente}</h3>
                      <form onSubmit={handleConfirmSchedule}>
                        <div style={{ marginBottom: "12px" }}>
                          <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>Data:</label>
                          <input
                            type="date"
                            required
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                            value={schedulingData.data}
                            onChange={(e) => setSchedulingData({ ...schedulingData, data: e.target.value })}
                          />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                          <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>Horário:</label>
                          <input
                            type="time"
                            required
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                            value={schedulingData.horario}
                            onChange={(e) => setSchedulingData({ ...schedulingData, horario: e.target.value })}
                          />
                        </div>
                        <button type="submit" style={{
                          width: "100%", backgroundColor: "#3182ce", color: "#fff", border: "none",
                          padding: "10px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginBottom: "8px"
                        }}>
                          Confirmar e Enviar E-mail
                        </button>
                      </form>
                    </>
                  )}

                  {crmAction === "negar" && (
                    <>
                      <h3 style={{ margin: "0 0 15px 0", color: "#c53030" }}>Negar Proposta de {selectedProposta.nomeCliente}</h3>
                      <form onSubmit={handleDenyProposal}>
                        <div style={{ marginBottom: "15px" }}>
                          <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>Motivo da Rejeição:</label>
                          <textarea
                            required
                            placeholder="Ex: Veículo reservado ou proposta de crédito reprovada."
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e0", minHeight: "80px", resize: "vertical" }}
                            value={motivoNegado}
                            onChange={(e) => setMotivoNegado(e.target.value)}
                          />
                        </div>
                        <button type="submit" style={{
                          width: "100%", backgroundColor: "#e53e3e", color: "#fff", border: "none",
                          padding: "10px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginBottom: "8px"
                        }}>
                          Confirmar Rejeição
                        </button>
                      </form>
                    </>
                  )}

                  {crmAction === "mensagem" && (
                    <>
                      <h3 style={{ margin: "0 0 15px 0" }}>Enviar E-mail para {selectedProposta.nomeCliente}</h3>
                      <form onSubmit={handleSendMessage}>
                        <div style={{ marginBottom: "15px" }}>
                          <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>Mensagem:</label>
                          <textarea
                            required
                            placeholder="Escreva sua mensagem personalizada aqui..."
                            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e0", minHeight: "100px", resize: "vertical" }}
                            value={mensagemDireta}
                            onChange={(e) => setMensagemDireta(e.target.value)}
                          />
                        </div>
                        <button type="submit" style={{
                          width: "100%", backgroundColor: "#4a5568", color: "#fff", border: "none",
                          padding: "10px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginBottom: "8px"
                        }}>
                          Enviar Mensagem Direta
                        </button>
                      </form>
                    </>
                  )}

                  <button type="button" onClick={resetCrmSection} style={{
                    width: "100%", backgroundColor: "#e2e8f0", color: "#4a5568", border: "none",
                    padding: "8px", borderRadius: "4px", cursor: "pointer"
                  }}>
                    Cancelar Action
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "usuarios" && (
          <div>
            <h2>Usuários</h2>
            <p>Total usuários: {users.length}</p>
          </div>
        )}

        {activeTab === "config" && (
          <div>
            <h2>Configurações</h2>
          </div>
        )}

      </main>
    </div>
  );
}