import axios from "axios";

// Crie um projeto em https://mockapi.io, adicione o recurso "contatos"
// com os campos: nome, telefone, cidade, anotacao, userId (todos string)
// e cole abaixo a URL base gerada (sem a barra final).
      const BASE_URL = "https://6ab463aa217e43658831bb76.mockapi.io/api/v1";
      
const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

// GET /contatos?userId=...  (lista só os contatos do usuário logado)
export const listarContatos = (userId) =>
  api.get("/contatos", { params: { userId } }).then((r) => r.data);

// GET /contatos/:id
export const buscarContato = (id) => api.get(`/contatos/${id}`).then((r) => r.data);

// POST /contatos
export const criarContato = (dados) => api.post("/contatos", dados).then((r) => r.data);

// PUT /contatos/:id
export const atualizarContato = (id, dados) =>
  api.put(`/contatos/${id}`, dados).then((r) => r.data);

// DELETE /contatos/:id
export const excluirContato = (id) => api.delete(`/contatos/${id}`).then((r) => r.data);

export default api;
