import React, { useState, useEffect } from 'react';
import { produtoService, categoriaService } from '../services/api';
import Mensagem from './Mensagem';

const ProdutoForm = ({ produtoParaEditar, onSalvo }) => {
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
        quantidadeEmEstoque: '',
        categoriaId: ''
    });
    const [categorias, setCategorias] = useState([]);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        carregarCategorias();
    }, []);

    useEffect(() => {
        if (produtoParaEditar) {
            setProduto({
                nome: produtoParaEditar.nome,
                descricao: produtoParaEditar.descricao || '',
                preco: produtoParaEditar.preco,
                quantidadeEmEstoque: produtoParaEditar.quantidadeEmEstoque,
                categoriaId: produtoParaEditar.categoriaId
            });
        } else {
            setProduto({
                nome: '',
                descricao: '',
                preco: '',
                quantidadeEmEstoque: '',
                categoriaId: ''
            });
        }
    }, [produtoParaEditar]);

    const carregarCategorias = async () => {
        try {
            const response = await categoriaService.listar();
            setCategorias(response.data);
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    const handleChange = (e) => {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!produto.nome || !produto.preco || !produto.quantidadeEmEstoque || !produto.categoriaId) {
            setMensagem({ tipo: 'erro', texto: 'Preencha todos os campos obrigatórios!' });
            return;
        }

        try {
            if (produtoParaEditar) {
                await produtoService.atualizar(produtoParaEditar.id, produto);
                setMensagem({ tipo: 'sucesso', texto: 'Produto atualizado com sucesso!' });
            } else {
                await produtoService.criar(produto);
                setMensagem({ tipo: 'sucesso', texto: 'Produto cadastrado com sucesso!' });
            }
            setProduto({
                nome: '',
                descricao: '',
                preco: '',
                quantidadeEmEstoque: '',
                categoriaId: ''
            });
            if (onSalvo) onSalvo();
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '5px' }}>
            {mensagem && <Mensagem {...mensagem} onFechar={() => setMensagem(null)} />}
            
            <h3>{produtoParaEditar ? '✏️ Editar Produto' : '➕ Cadastrar Produto'}</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <input
                        type="text"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        placeholder="Nome do produto*"
                        style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                        type="text"
                        name="descricao"
                        value={produto.descricao}
                        onChange={handleChange}
                        placeholder="Descrição"
                        style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                        type="number"
                        name="preco"
                        value={produto.preco}
                        onChange={handleChange}
                        placeholder="Preço*"
                        step="0.01"
                        style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                        type="number"
                        name="quantidadeEmEstoque"
                        value={produto.quantidadeEmEstoque}
                        onChange={handleChange}
                        placeholder="Estoque*"
                        style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <select
                        name="categoriaId"
                        value={produto.categoriaId}
                        onChange={handleChange}
                        style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                        <option value="">Selecione a categoria*</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                    <button type="submit" style={{ padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {produtoParaEditar ? 'Atualizar' : 'Cadastrar'}
                    </button>
                    {produtoParaEditar && (
                        <button type="button" onClick={() => onSalvo && onSalvo(null)} style={{ padding: '8px 15px', background: '#999', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProdutoForm;