import React, { useState, useEffect } from 'react';
import { produtoService } from '../services/api';
import Mensagem from './Mensagem';

const ProdutoLista = ({ onEditar, refresh }) => {
    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState('');
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        carregarProdutos();
    }, [refresh]);

    const carregarProdutos = async () => {
        try {
            const response = await produtoService.listar();
            setProdutos(response.data);
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    const buscarProdutos = async () => {
        if (!busca.trim()) {
            carregarProdutos();
            return;
        }
        
        try {
            const response = await produtoService.buscarPorNome(busca);
            setProdutos(response.data);
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    const excluirProduto = async (id, nome) => {
        if (window.confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
            try {
                await produtoService.excluir(id);
                setMensagem({ tipo: 'sucesso', texto: 'Produto excluído com sucesso!' });
                carregarProdutos();
            } catch (error) {
                setMensagem({ tipo: 'erro', texto: error.message });
            }
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            {mensagem && <Mensagem {...mensagem} onFechar={() => setMensagem(null)} />}
            
            <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar produto por nome..."
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    onKeyPress={(e) => e.key === 'Enter' && buscarProdutos()}
                />
                <button onClick={buscarProdutos} style={{ padding: '8px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Buscar
                </button>
                <button onClick={carregarProdutos} style={{ padding: '8px 15px', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Limpar
                </button>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
                {produtos.length === 0 ? (
                    <p>Nenhum produto encontrado.</p>
                ) : (
                    produtos.map(produto => (
                        <div key={produto.id} style={{
                            padding: '15px',
                            background: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <div>
                                <strong>{produto.nome}</strong><br />
                                <small>ID: {produto.id}</small><br />
                                <span>Descrição: {produto.descricao || 'N/A'}</span><br />
                                <span>Preço: R$ {produto.preco?.toFixed(2)}</span><br />
                                <span>Estoque: {produto.quantidadeEmEstoque}</span><br />
                                <span>Categoria: {produto.categoriaNome || produto.categoriaId}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                <button onClick={() => onEditar(produto)} style={{ padding: '5px 10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    ✏️ Editar
                                </button>
                                <button onClick={() => excluirProduto(produto.id, produto.nome)} style={{ padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    🗑️ Excluir
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProdutoLista;