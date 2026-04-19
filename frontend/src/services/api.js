import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const message = error.response.data?.error || 
                           error.response.data?.message ||
                           JSON.stringify(error.response.data);
            throw new Error(message);
        }
        throw new Error('Erro de conexão com o servidor');
    }
);

// Serviço de Categorias
export const categoriaService = {
    listar: () => api.get('/categorias'),
    criar: (categoria) => api.post('/categorias', categoria)
};

// Serviço de Produtos
export const produtoService = {
    listar: () => api.get('/produtos'),
    buscarPorNome: (nome) => api.get(`/produtos/buscar?nome=${nome}`),
    criar: (produto) => api.post('/produtos', produto),
    atualizar: (id, produto) => api.put(`/produtos/${id}`, produto),
    excluir: (id) => api.delete(`/produtos/${id}`)
};

// Serviço de Pedidos
export const pedidoService = {
    listar: () => api.get('/pedidos'),
    buscarPorId: (id) => api.get(`/pedidos/${id}`),
    criar: (pedido) => api.post('/pedidos', pedido)
};

export default api;