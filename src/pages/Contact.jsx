// pages/Mensagens.jsx
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  Ticket,
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Eye,
  Calendar,
  User,
  Mail,
  Phone,
  Hash,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../styles/Mensagens.css";

// Dados mockados para demonstração
const MOCK_MENSAGENS = [
  {
    id: "MSG-2026-001",
    protocolo: "20260703001",
    tipo: "mensagem",
    assunto: "Dúvida sobre financiamento",
    mensagem: "Gostaria de saber mais sobre as condições de financiamento para o Porsche 911. Qual a taxa de juros praticada?",
    status: "respondido",
    dataEnvio: "2026-07-01T10:30:00",
    dataResposta: "2026-07-01T14:15:00",
    remetente: {
      primeiroNome: "Carlos",
      sobrenome: "Silva",
      email: "carlos.silva@email.com",
      telefone: "(11) 98765-4321",
    },
    resposta: "Prezado Carlos, nossas taxas de financiamento partem de 0,99% ao mês para clientes Legacy. Aguardamos sua visita!",
  },
  {
    id: "MSG-2026-002",
    protocolo: "20260703002",
    tipo: "ticket",
    assunto: "Problema no agendamento de test drive",
    mensagem: "Não consigo finalizar o agendamento do test drive pelo site. Aparece um erro na etapa de confirmação.",
    status: "em_andamento",
    dataEnvio: "2026-07-02T09:00:00",
    dataResposta: null,
    remetente: {
      primeiroNome: "Ana",
      sobrenome: "Oliveira",
      email: "ana.oliveira@email.com",
      telefone: "(11) 91234-5678",
    },
    resposta: null,
  },
  {
    id: "MSG-2026-003",
    protocolo: "20260703003",
    tipo: "solicitacao",
    assunto: "Solicitação de cotação - BMW X5",
    mensagem: "Tenho interesse no BMW X5 xDrive40i 2026 na cor preta. Poderiam me enviar uma cotação detalhada?",
    status: "novo",
    dataEnvio: "2026-07-03T08:45:00",
    dataResposta: null,
    remetente: {
      primeiroNome: "Roberto",
      sobrenome: "Santos",
      email: "roberto.santos@email.com",
      telefone: "(11) 99876-5432",
    },
    resposta: null,
  },
  {
    id: "MSG-2026-004",
    protocolo: "20260703004",
    tipo: "mensagem",
    assunto: "Elogio ao atendimento",
    mensagem: "Gostaria de parabenizar o consultor João pelo excelente atendimento durante minha visita ontem. Muito profissional!",
    status: "respondido",
    dataEnvio: "2026-06-28T16:20:00",
    dataResposta: "2026-06-29T09:00:00",
    remetente: {
      primeiroNome: "Fernanda",
      sobrenome: "Lima",
      email: "fernanda.lima@email.com",
      telefone: "(11) 93456-7890",
    },
    resposta: "Fernanda, agradecemos seu feedback! O João ficou muito feliz com seu elogio. É um prazer atendê-la!",
  },
  {
    id: "MSG-2026-005",
    protocolo: "20260703005",
    tipo: "ticket",
    assunto: "Erro no pagamento da reserva",
    mensagem: "Tentei efetuar o pagamento da reserva do veículo mas o sistema não processou meu cartão. Já tentei 3 vezes.",
    status: "novo",
    dataEnvio: "2026-07-03T11:10:00",
    dataResposta: null,
    remetente: {
      primeiroNome: "Mariana",
      sobrenome: "Costa",
      email: "mariana.costa@email.com",
      telefone: "(11) 94567-8901",
    },
    resposta: null,
  },
  {
    id: "MSG-2026-006",
    protocolo: "20260703006",
    tipo: "solicitacao",
    assunto: "Documentação para transferência",
    mensagem: "Preciso da documentação completa do veículo adquirido para realizar a transferência no DETRAN. Quais documentos são necessários?",
    status: "em_andamento",
    dataEnvio: "2026-07-02T14:30:00",
    dataResposta: null,
    remetente: {
      primeiroNome: "Paulo",
      sobrenome: "Henrique",
      email: "paulo.henrique@email.com",
      telefone: "(11) 95678-9012",
    },
    resposta: null,
  },
  {
    id: "MSG-2026-007",
    protocolo: "20260703007",
    tipo: "mensagem",
    assunto: "Disponibilidade de peças",
    mensagem: "Vocês possuem em estoque o para-choque dianteiro do Mercedes C300 2024?",
    status: "respondido",
    dataEnvio: "2026-06-25T11:00:00",
    dataResposta: "2026-06-25T16:45:00",
    remetente: {
      primeiroNome: "Lucas",
      sobrenome: "Mendes",
      email: "lucas.mendes@email.com",
      telefone: "(11) 96789-0123",
    },
    resposta: "Lucas, temos sim! O valor é R$ 4.850,00 com pintura inclusa. Podemos agendar a instalação para você.",
  },
  {
    id: "MSG-2026-008",
    protocolo: "20260703008",
    tipo: "ticket",
    assunto: "Reclamação sobre atraso na entrega",
    mensagem: "Foi informado que meu veículo seria entregue dia 20/06 e até agora não tive retorno. Gostaria de uma posição.",
    status: "cancelado",
    dataEnvio: "2026-06-22T10:00:00",
    dataResposta: "2026-06-23T09:30:00",
    remetente: {
      primeiroNome: "Juliana",
      sobrenome: "Ferreira",
      email: "juliana.ferreira@email.com",
      telefone: "(11) 97890-1234",
    },
    resposta: "Juliana, pedimos desculpas pelo transtorno. Seu veículo chegou hoje e a entrega está agendada para amanhã às 14h.",
  },
  {
    id: "MSG-2026-009",
    protocolo: "20260703009",
    tipo: "solicitacao",
    assunto: "Agendamento de revisão",
    mensagem: "Gostaria de agendar a revisão de 10.000 km do meu Audi A4. Tenho preferência pela manhã de sábado.",
    status: "respondido",
    dataEnvio: "2026-06-30T08:15:00",
    dataResposta: "2026-06-30T11:00:00",
    remetente: {
      primeiroNome: "Ricardo",
      sobrenome: "Almeida",
      email: "ricardo.almeida@email.com",
      telefone: "(11) 98901-2345",
    },
    resposta: "Ricardo, confirmamos seu agendamento para sábado, 05/07, às 09h. Aguardamos você!",
  },
  {
    id: "MSG-2026-010",
    protocolo: "20260703010",
    tipo: "mensagem",
    assunto: "Interesse em troca de veículo",
    mensagem: "Possuo um BMW X3 2022 com 25.000 km. Gostaria de avaliar uma troca pelo novo X5 híbrido.",
    status: "novo",
    dataEnvio: "2026-07-03T15:20:00",
    dataResposta: null,
    remetente: {
      primeiroNome: "Bruno",
      sobrenome: "Carvalho",
      email: "bruno.carvalho@email.com",
      telefone: "(11) 99012-3456",
    },
    resposta: null,
  },
  {
    id: "MSG-2026-011",
    protocolo: "20260703011",
    tipo: "ticket",
    assunto: "Problema no sistema de fidelidade",
    mensagem: "Meus pontos do programa Legacy Rewards não estão sendo computados na última compra de acessórios.",
    status: "em_andamento",
    dataEnvio: "2026-07-01T13:00:00",
    dataResposta: null,
    remetente: {
      primeiroNome: "Patrícia",
      sobrenome: "Souza",
      email: "patricia.souza@email.com",
      telefone: "(11) 90123-4567",
    },
    resposta: null,
  },
  {
    id: "MSG-2026-012",
    protocolo: "20260703012",
    tipo: "solicitacao",
    assunto: "Orçamento de acessórios",
    mensagem: "Preciso de um orçamento para capa de banco em couro e tapetes premium para o Porsche Cayenne.",
    status: "respondido",
    dataEnvio: "2026-06-27T09:45:00",
    dataResposta: "2026-06-27T15:20:00",
    remetente: {
      primeiroNome: "Gabriel",
      sobrenome: "Rocha",
      email: "gabriel.rocha@email.com",
      telefone: "(11) 91234-5678",
    },
    resposta: "Gabriel, o kit completo fica em R$ 12.400,00 com instalação inclusa. Temos pronta entrega!",
  },
];

const TIPOS_CONFIG = {
  mensagem: { label: "Mensagem", icon: MessageSquare, color: "#3b82f6" },
  ticket: { label: "Ticket", icon: Ticket, color: "#f59e0b" },
  solicitacao: { label: "Solicitação", icon: FileText, color: "#10b981" },
};

const STATUS_CONFIG = {
  novo: {
    label: "Novo",
    icon: AlertTriangle,
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.1)",
  },
  em_andamento: {
    label: "Em Andamento",
    icon: Clock,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
  },
  respondido: {
    label: "Respondido",
    icon: CheckCircle2,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  cancelado: {
    label: "Cancelado",
    icon: XCircle,
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.1)",
  },
};

function formatarData(dataString) {
  if (!dataString) return "—";
  const data = new Date(dataString);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatarDataCurta(dataString) {
  if (!dataString) return "—";
  const data = new Date(dataString);
  const agora = new Date();
  const diffMs = agora - data;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHoras = Math.floor(diffMs / 3600000);
  const diffDias = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Agora";
  if (diffMin < 60) return `${diffMin}min`;
  if (diffHoras < 24) return `${diffHoras}h`;
  if (diffDias < 7) return `${diffDias}d`;
  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export default function Mensagens() {
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [expandido, setExpandido] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(8);
  const [ordenacao, setOrdenacao] = useState({ campo: "dataEnvio", direcao: "desc" });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Ordenação
  const handleOrdenar = (campo) => {
    setOrdenacao((prev) => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === "asc" ? "desc" : "asc",
    }));
  };

  // Filtragem e ordenação
  const mensagensFiltradas = useMemo(() => {
    let resultado = [...MOCK_MENSAGENS];

    // Filtro de busca
    if (busca.trim()) {
      const termo = busca.toLowerCase();
      resultado = resultado.filter(
        (m) =>
          m.assunto.toLowerCase().includes(termo) ||
          m.protocolo.toLowerCase().includes(termo) ||
          m.remetente.primeiroNome.toLowerCase().includes(termo) ||
          m.remetente.sobrenome.toLowerCase().includes(termo) ||
          m.remetente.email.toLowerCase().includes(termo) ||
          m.mensagem.toLowerCase().includes(termo)
      );
    }

    // Filtro de tipo
    if (filtroTipo !== "todos") {
      resultado = resultado.filter((m) => m.tipo === filtroTipo);
    }

    // Filtro de status
    if (filtroStatus !== "todos") {
      resultado = resultado.filter((m) => m.status === filtroStatus);
    }

    // Ordenação
    resultado.sort((a, b) => {
      let valA, valB;
      if (ordenacao.campo === "dataEnvio") {
        valA = new Date(a.dataEnvio);
        valB = new Date(b.dataEnvio);
      } else if (ordenacao.campo === "assunto") {
        valA = a.assunto.toLowerCase();
        valB = b.assunto.toLowerCase();
      } else if (ordenacao.campo === "remetente") {
        valA = `${a.remetente.primeiroNome} ${a.remetente.sobrenome}`.toLowerCase();
        valB = `${b.remetente.primeiroNome} ${b.remetente.sobrenome}`.toLowerCase();
      } else if (ordenacao.campo === "tipo") {
        valA = a.tipo;
        valB = b.tipo;
      } else if (ordenacao.campo === "status") {
        valA = a.status;
        valB = b.status;
      }

      if (valA < valB) return ordenacao.direcao === "asc" ? -1 : 1;
      if (valA > valB) return ordenacao.direcao === "asc" ? 1 : -1;
      return 0;
    });

    return resultado;
  }, [busca, filtroTipo, filtroStatus, ordenacao]);

  // Paginação
  const totalPaginas = Math.ceil(mensagensFiltradas.length / itensPorPagina);
  const mensagensPaginadas = mensagensFiltradas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  // Estatísticas
  const estatisticas = useMemo(() => {
    const total = MOCK_MENSAGENS.length;
    const novos = MOCK_MENSAGENS.filter((m) => m.status === "novo").length;
    const emAndamento = MOCK_MENSAGENS.filter((m) => m.status === "em_andamento").length;
    const respondidos = MOCK_MENSAGENS.filter((m) => m.status === "respondido").length;
    return { total, novos, emAndamento, respondidos };
  }, []);

  const toggleExpandir = (id) => {
    setExpandido(expandido === id ? null : id);
  };

  const limparFiltros = () => {
    setBusca("");
    setFiltroTipo("todos");
    setFiltroStatus("todos");
    setPagina(1);
  };

  const renderCabecalhoOrdenavel = (campo, label) => (
    <th onClick={() => handleOrdenar(campo)} className="sortable-header">
      <span>{label}</span>
      {ordenacao.campo === campo ? (
        ordenacao.direcao === "asc" ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        )
      ) : (
        <ChevronDown size={14} className="sort-icon-inactive" />
      )}
    </th>
  );

  return (
    <div className="mensagens-page">
      {/* Header */}
      <div className="mensagens-header">
        <div className="header-content">
          <button className="btn-voltar" onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
            Voltar
          </button>
          <h1>
            <MessageSquare size={28} />
            Central de Mensagens
          </h1>
          <p>Gerencie todas as mensagens, tickets e solicitações dos clientes</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="stats-container">
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <MessageSquare size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{estatisticas.total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card stat-novo">
          <div className="stat-icon">
            <AlertTriangle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{estatisticas.novos}</span>
            <span className="stat-label">Novos</span>
          </div>
        </div>
        <div className="stat-card stat-andamento">
          <div className="stat-icon">
            <Clock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{estatisticas.emAndamento}</span>
            <span className="stat-label">Em Andamento</span>
          </div>
        </div>
        <div className="stat-card stat-respondido">
          <div className="stat-icon">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{estatisticas.respondidos}</span>
            <span className="stat-label">Respondidos</span>
          </div>
        </div>
      </div>

      {/* Barra de Ferramentas */}
      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por assunto, protocolo, nome, email..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1);
            }}
          />
          {busca && (
            <button className="clear-search" onClick={() => setBusca("")}>
              <XCircle size={16} />
            </button>
          )}
        </div>

        <button
          className={`btn-filtro ${mostrarFiltros ? "active" : ""}`}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
        >
          <Filter size={18} />
          Filtros
          {(filtroTipo !== "todos" || filtroStatus !== "todos") && (
            <span className="filtro-badge">!</span>
          )}
        </button>
      </div>

      {/* Painel de Filtros */}
      {mostrarFiltros && (
        <div className="filtros-panel">
          <div className="filtro-grupo">
            <label>Tipo</label>
            <div className="filtro-botoes">
              <button
                className={filtroTipo === "todos" ? "active" : ""}
                onClick={() => { setFiltroTipo("todos"); setPagina(1); }}
              >
                Todos
              </button>
              {Object.entries(TIPOS_CONFIG).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    className={filtroTipo === key ? "active" : ""}
                    onClick={() => { setFiltroTipo(key); setPagina(1); }}
                  >
                    <Icon size={14} />
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filtro-grupo">
            <label>Status</label>
            <div className="filtro-botoes">
              <button
                className={filtroStatus === "todos" ? "active" : ""}
                onClick={() => { setFiltroStatus("todos"); setPagina(1); }}
              >
                Todos
              </button>
              {Object.entries(STATUS_CONFIG).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    className={filtroStatus === key ? "active" : ""}
                    onClick={() => { setFiltroStatus(key); setPagina(1); }}
                  >
                    <Icon size={14} />
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {(filtroTipo !== "todos" || filtroStatus !== "todos" || busca) && (
            <button className="btn-limpar" onClick={limparFiltros}>
              <XCircle size={14} />
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Tabela */}
      <div className="tabela-container">
        {mensagensFiltradas.length === 0 ? (
          <div className="empty-state">
            <MessageSquare size={48} className="empty-icon" />
            <h3>Nenhuma mensagem encontrada</h3>
            <p>Tente ajustar seus filtros ou termos de busca</p>
            <button className="btn-limpar-empty" onClick={limparFiltros}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="tabela-wrapper">
              <table className="mensagens-tabela">
                <thead>
                  <tr>
                    {renderCabecalhoOrdenavel("protocolo", "Protocolo")}
                    {renderCabecalhoOrdenavel("tipo", "Tipo")}
                    {renderCabecalhoOrdenavel("assunto", "Assunto")}
                    {renderCabecalhoOrdenavel("remetente", "Remetente")}
                    {renderCabecalhoOrdenavel("status", "Status")}
                    {renderCabecalhoOrdenavel("dataEnvio", "Data")}
                    <th className="acao-header">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {mensagensPaginadas.map((msg) => {
                    const tipoConfig = TIPOS_CONFIG[msg.tipo];
                    const statusConfig = STATUS_CONFIG[msg.status];
                    const TipoIcon = tipoConfig.icon;
                    const StatusIcon = statusConfig.icon;
                    const isExpandido = expandido === msg.id;

                    return (
                      <>
                        <tr
                          key={msg.id}
                          className={`linha-mensagem ${isExpandido ? "expandida" : ""} status-${msg.status}`}
                          onClick={() => toggleExpandir(msg.id)}
                        >
                          <td className="col-protocolo">
                            <Hash size={14} />
                            <span>#{msg.protocolo}</span>
                          </td>
                          <td className="col-tipo">
                            <span
                              className="badge-tipo"
                              style={{
                                backgroundColor: `${tipoConfig.color}15`,
                                color: tipoConfig.color,
                                border: `1px solid ${tipoConfig.color}30`,
                              }}
                            >
                              <TipoIcon size={13} />
                              {tipoConfig.label}
                            </span>
                          </td>
                          <td className="col-assunto">
                            <span className="assunto-texto">{msg.assunto}</span>
                            <span className="assunto-preview">
                              {msg.mensagem.substring(0, 60)}
                              {msg.mensagem.length > 60 ? "..." : ""}
                            </span>
                          </td>
                          <td className="col-remetente">
                            <div className="remetente-info">
                              <User size={14} />
                              <div>
                                <span className="remetente-nome">
                                  {msg.remetente.primeiroNome} {msg.remetente.sobrenome}
                                </span>
                                <span className="remetente-email">{msg.remetente.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="col-status">
                            <span
                              className="badge-status"
                              style={{
                                backgroundColor: statusConfig.bg,
                                color: statusConfig.color,
                                border: `1px solid ${statusConfig.color}30`,
                              }}
                            >
                              <StatusIcon size={13} />
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="col-data">
                            <div className="data-info">
                              <Calendar size={13} />
                              <span title={formatarData(msg.dataEnvio)}>
                                {formatarDataCurta(msg.dataEnvio)}
                              </span>
                            </div>
                          </td>
                          <td className="col-acao">
                            <button
                              className="btn-expandir"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpandir(msg.id);
                              }}
                            >
                              <Eye size={16} />
                              {isExpandido ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </button>
                          </td>
                        </tr>

                        {/* Linha expandida com detalhes */}
                        {isExpandido && (
                          <tr className="linha-detalhes">
                            <td colSpan={7}>
                              <div className="detalhes-panel">
                                <div className="detalhes-grid">
                                  <div className="detalhe-bloco">
                                    <h4>
                                      <User size={16} />
                                      Dados do Remetente
                                    </h4>
                                    <div className="detalhe-item">
                                      <span className="detalhe-label">Nome</span>
                                      <span className="detalhe-valor">
                                        {msg.remetente.primeiroNome} {msg.remetente.sobrenome}
                                      </span>
                                    </div>
                                    <div className="detalhe-item">
                                      <span className="detalhe-label">Email</span>
                                      <span className="detalhe-valor">
                                        <Mail size={13} />
                                        {msg.remetente.email}
                                      </span>
                                    </div>
                                    {msg.remetente.telefone && (
                                      <div className="detalhe-item">
                                        <span className="detalhe-label">Telefone</span>
                                        <span className="detalhe-valor">
                                          <Phone size={13} />
                                          {msg.remetente.telefone}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="detalhe-bloco">
                                    <h4>
                                      <Tag size={16} />
                                      Informações
                                    </h4>
                                    <div className="detalhe-item">
                                      <span className="detalhe-label">Protocolo</span>
                                      <span className="detalhe-valor protocolo-destaque">
                                        #{msg.protocolo}
                                      </span>
                                    </div>
                                    <div className="detalhe-item">
                                      <span className="detalhe-label">Tipo</span>
                                      <span className="detalhe-valor">
                                        <TipoIcon size={13} color={tipoConfig.color} />
                                        {tipoConfig.label}
                                      </span>
                                    </div>
                                    <div className="detalhe-item">
                                      <span className="detalhe-label">Status</span>
                                      <span className="detalhe-valor">
                                        <StatusIcon size={13} color={statusConfig.color} />
                                        {statusConfig.label}
                                      </span>
                                    </div>
                                    <div className="detalhe-item">
                                      <span className="detalhe-label">Enviado em</span>
                                      <span className="detalhe-valor">
                                        <Calendar size={13} />
                                        {formatarData(msg.dataEnvio)}
                                      </span>
                                    </div>
                                    {msg.dataResposta && (
                                      <div className="detalhe-item">
                                        <span className="detalhe-label">Respondido em</span>
                                        <span className="detalhe-valor">
                                          <Calendar size={13} />
                                          {formatarData(msg.dataResposta)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="mensagem-bloco">
                                  <h4>
                                    <MessageSquare size={16} />
                                    Mensagem
                                  </h4>
                                  <div className="mensagem-conteudo">
                                    <p>{msg.mensagem}</p>
                                  </div>
                                </div>

                                {msg.resposta && (
                                  <div className="resposta-bloco">
                                    <h4>
                                      <CheckCircle2 size={16} />
                                      Resposta
                                    </h4>
                                    <div className="resposta-conteudo">
                                      <p>{msg.resposta}</p>
                                    </div>
                                  </div>
                                )}

                                {!msg.resposta && (
                                  <div className="acoes-detalhes">
                                    <button className="btn-responder">
                                      <MessageSquare size={16} />
                                      Responder
                                    </button>
                                    <button className="btn-status">
                                      <Clock size={16} />
                                      Alterar Status
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="paginacao">
              <div className="paginacao-info">
                <span>
                  Mostrando <strong>{(pagina - 1) * itensPorPagina + 1}</strong> a{" "}
                  <strong>{Math.min(pagina * itensPorPagina, mensagensFiltradas.length)}</strong>{" "}
                  de <strong>{mensagensFiltradas.length}</strong> resultados
                </span>
                <select
                  value={itensPorPagina}
                  onChange={(e) => {
                    setItensPorPagina(Number(e.target.value));
                    setPagina(1);
                  }}
                >
                  <option value={5}>5 por página</option>
                  <option value={8}>8 por página</option>
                  <option value={12}>12 por página</option>
                  <option value={20}>20 por página</option>
                </select>
              </div>

              <div className="paginacao-botoes">
                <button
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={pagina === 1}
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={pagina === p ? "active" : ""}
                    onClick={() => setPagina(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                  disabled={pagina === totalPaginas}
                >
                  Próxima
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}