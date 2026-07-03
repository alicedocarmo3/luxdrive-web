// hooks/useContatoAdmin.jsx
import { useState, useCallback } from "react";

const API_BASE = "/api/contato/admin";

export function useContatoAdmin() {
  const [contatos, setContatos] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscar = useCallback(async (filtros = {}) => {
    setCarregando(true);
    setErro(null);
    try {
      const params = new URLSearchParams(filtros);
      const res = await fetch(`${API_BASE}?${params}`);
      const data = await res.json();
      
      if (data.sucesso) {
        setContatos(data.dados);
        setEstatisticas(data.estatisticas);
      } else {
        setErro(data.mensagem);
      }
    } catch (err) {
      setErro("Erro ao conectar com o servidor");
    } finally {
      setCarregando(false);
    }
  }, []);

  const responder = useCallback(async (id, mensagem) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/responder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  const atualizarStatus = useCallback(async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  const deletar = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  return {
    contatos,
    estatisticas,
    carregando,
    erro,
    buscar,
    responder,
    atualizarStatus,
    deletar,
  };
}