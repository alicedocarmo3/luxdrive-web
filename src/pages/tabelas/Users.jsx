import { useState, useEffect } from "react";
import {
  Users as UsersIcon,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  User,
  Mail,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
  UserCheck,
  Crown,
  ArrowUpRight,
} from "lucide-react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import "../../styles/UsersPage.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "user",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      if (data.success) {
        setUsers(data.data || []);
      } else {
        showToast(data.message || "Erro ao carregar usuários", "error");
      }
    } catch (err) {
      showToast("Erro ao carregar usuários", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Filtered users
  const filteredUsers = users.filter(
    (u) =>
      u.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Open create modal
  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({ nome: "", email: "", senha: "", role: "user" });
    setFormErrors({});
    setShowPassword(false);
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome || "",
      email: user.email || "",
      senha: "",
      role: user.role || "user",
    });
    setFormErrors({});
    setShowPassword(false);
    setIsModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.nome.trim()) errors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }
    if (!editingUser && !formData.senha.trim()) {
      errors.senha = "Senha é obrigatória";
    } else if (!editingUser && formData.senha.length < 6) {
      errors.senha = "Senha deve ter no mínimo 6 caracteres";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = { ...formData };
      if (editingUser && !payload.senha) delete payload.senha;

      let data;
      if (editingUser) {
        data = await updateUser(
          editingUser._id || editingUser.id,
          payload
        );
      } else {
        data = await createUser(payload);
      }

      if (data.success) {
        showToast(
          editingUser
            ? "Usuário atualizado com sucesso"
            : "Usuário criado com sucesso"
        );
        setIsModalOpen(false);
        fetchUsers();
      } else {
        showToast(data.message || "Erro ao salvar usuário", "error");
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Erro de conexão com o servidor",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      const data = await deleteUser(userToDelete._id || userToDelete.id);
      if (data.success) {
        showToast("Usuário removido com sucesso");
        fetchUsers();
      } else {
        showToast(data.message || "Erro ao remover", "error");
      }
    } catch (err) {
      showToast(
        err.response?.data?.message || "Erro de conexão",
        "error"
      );
    } finally {
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  // Role badge
  const RoleBadge = ({ role }) => (
    <span className={`role-badge role-${role}`}>
      {role === "admin" ? (
        <>
          <Crown size={12} /> Admin
        </>
      ) : (
        <>
          <User size={12} /> Usuário
        </>
      )}
    </span>
  );

  return (
    <div className="users-page">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div className="page-title">
          <UsersIcon size={24} strokeWidth={1.5} />
          <div>
            <h1>Usuários</h1>
            <p>Gerencie os usuários do sistema</p>
          </div>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          <Plus size={18} />
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon total">
            <UsersIcon size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{users.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon admin">
            <Crown size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{users.filter(u => u.role === "admin").length}</span>
            <span className="stat-label">Admins</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon user">
            <UserCheck size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{users.filter(u => u.role === "user").length}</span>
            <span className="stat-label">Usuários</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="table-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar por nome, email ou função..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              <X size={14} />
            </button>
          )}
        </div>
        <span className="results-count">
          {filteredUsers.length} usuário{filteredUsers.length !== 1 ? "s" : ""}{" "}
          encontrado{filteredUsers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="table-container">
        {loading ? (
          <div className="table-loading">
            <Loader2 size={32} className="spin" />
            <p>Carregando usuários...</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Email</th>
                <th>Função</th>
                <th className="actions-col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user._id || user.id}>
                    <td>
                      <div className="user-cell">
                        <div className={`user-avatar ${user.role === "admin" ? "admin-avatar" : ""}`}>
                          {user.nome?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="user-info">
                          <span className="user-name">{user.nome}</span>
                          {user.role === "admin" && (
                            <span className="admin-tag">Administrador</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="email-cell">
                        <Mail size={14} />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td>
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="actions-col">
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => openEditModal(user)}
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => openDeleteModal(user)}
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="empty-state">
                    <UsersIcon size={48} strokeWidth={1} />
                    <p>Nenhum usuário encontrado</p>
                    <span>
                      {searchTerm
                        ? "Tente ajustar sua busca"
                        : "Clique em 'Novo Usuário' para adicionar o primeiro"}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {!loading && filteredUsers.length > 0 && (
          <div className="pagination">
            <button
              className="btn-page"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-number ${page === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="btn-page"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal modal-form-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-icon">
                {editingUser ? <Pencil size={22} /> : <Plus size={22} />}
              </div>
              <div className="modal-header-text">
                <h2>{editingUser ? "Editar Usuário" : "Novo Usuário"}</h2>
                <p>{editingUser ? `Editando ${editingUser.nome}` : "Preencha os dados do novo usuário"}</p>
              </div>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {editingUser && (
              <div className="modal-user-preview">
                <div className={`preview-avatar ${editingUser.role === "admin" ? "admin-avatar" : ""}`}>
                  {editingUser.nome?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="preview-info">
                  <span className="preview-name">{editingUser.nome}</span>
                  <span className="preview-email">{editingUser.email}</span>
                  <RoleBadge role={editingUser.role} />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>
                  <User size={14} />
                  Nome completo
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Digite o nome completo"
                  className={formErrors.nome ? "error" : ""}
                />
                {formErrors.nome && (
                  <span className="error-text">{formErrors.nome}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  <Mail size={14} />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="usuario@email.com"
                  className={formErrors.email ? "error" : ""}
                />
                {formErrors.email && (
                  <span className="error-text">{formErrors.email}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Shield size={14} />
                    Senha {editingUser && "(opcional)"}
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.senha}
                      onChange={(e) =>
                        setFormData({ ...formData, senha: e.target.value })
                      }
                      placeholder={editingUser ? "Deixe em branco para manter" : "Mínimo 6 caracteres"}
                      className={formErrors.senha ? "error" : ""}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {formErrors.senha && (
                    <span className="error-text">{formErrors.senha}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    <Crown size={14} />
                    Função
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="spin" />
                      Salvando...
                    </>
                  ) : editingUser ? (
                    <>
                      <Pencil size={16} />
                      Salvar Alterações
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Criar Usuário
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="modal modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="delete-illustration">
              <div className="delete-icon-ring">
                <Trash2 size={40} />
              </div>
            </div>

            <div className="modal-header delete-header">
              <h2>Excluir Usuário</h2>
              <p>Você está prestes a remover permanentemente este usuário do sistema.</p>
            </div>

            {userToDelete && (
              <div className="delete-user-card">
                <div className={`delete-avatar ${userToDelete.role === "admin" ? "admin-avatar" : ""}`}>
                  {userToDelete.nome?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div className="delete-user-info">
                  <span className="delete-user-name">{userToDelete.nome}</span>
                  <span className="delete-user-email">{userToDelete.email}</span>
                  <RoleBadge role={userToDelete.role} />
                </div>
              </div>
            )}

            <div className="delete-warning">
              <AlertTriangle size={16} />
              <span>Esta ação não pode ser desfeita. Todos os dados associados a este usuário serão perdidos.</span>
            </div>

            <div className="modal-footer delete-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                <Trash2 size={16} />
                Sim, excluir usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}