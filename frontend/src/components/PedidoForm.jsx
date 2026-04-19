import React, { useState, useEffect } from 'react';
import { pedidoService, produtoService } from '../services/api';
import Mensagem from './Mensagem';

const PedidoForm = ({ onPedidoCriado }) => {
    const [itens, setItens] = useState([{ produtoId: '', quantidade: 1 }]);
    const [produtos, setProdutos] = useState([]);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            const response = await produtoService.listar();
            setProdutos(response.data);
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    const adicionarItem = () => {
        setItens([...itens, { produtoId: '', quantidade: 1 }]);
    };

    const removerItem = (index) => {
        const novosItens = itens.filter((_, i) => i !== index);
        setItens(novosItens);
    };

    const atualizarItem = (index, campo, valor) => {
        const novosItens = [...itens];
        novosItens[index][campo] = valor;
        setItens(novosItens);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const itensValidos = itens.filter(item => item.produtoId && item.quantidade > 0);
        
        if (itensValidos.length === 0) {
            setMensagem({ tipo: 'erro', texto: 'Adicione pelo menos um item válido ao pedido!' });
            return;
        }

        const pedido = {
            itens: itensValidos.map(item => ({
                produtoId: parseInt(item.produtoId),
                quantidade: parseInt(item.quantidade)
            }))
        };

        try {
            const response = await pedidoService.criar(pedido);
            setMensagem({ tipo: 'sucesso', texto: `Pedido #${response.data.id} criado com sucesso! Total: R$ ${response.data.valorTotal.toFixed(2)}` });
            setItens([{ produtoId: '', quantidade: 1 }]);
            if (onPedidoCriado) onPedidoCriado();
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '5px' }}>
            {mensagem && <Mensagem {...mensagem} onFechar={() => setMensagem(null)} />}
            
            <h3>🛒 Criar Novo Pedido</h3>
            <form onSubmit={handleSubmit}>
                {itens.map((item, index) => {
                    const produtoSelecionado = produtos.find(p => p.id === parseInt(item.produtoId));
                    const estoqueMaximo = produtoSelecionado ? produtoSelecionado.quantidadeEmEstoque : 0;
                    
                    return (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <select
                                value={item.produtoId}
                                onChange={(e) => atualizarItem(index, 'produtoId', e.target.value)}
                                required
                                style={{ flex: 2, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            >
                                <option value="">Selecione um produto</option>
                                {produtos.map(prod => (
                                    <option key={prod.id} value={prod.id}>
                                        {prod.nome} - R$ {prod.preco.toFixed(2)} (Estoque: {prod.quantidadeEmEstoque})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={item.quantidade}
                                onChange={(e) => atualizarItem(index, 'quantidade', e.target.value)}
                                min="1"
                                max={estoqueMaximo}
                                required
                                style={{ width: '100px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                            {itens.length > 1 && (
                                <button type="button" onClick={() => removerItem(index)} style={{ padding: '8px 15px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    Remover
                                </button>
                            )}
                        </div>
                    );
                })}
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="button" onClick={adicionarItem} style={{ padding: '8px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        + Adicionar Item
                    </button>
                    <button type="submit" style={{ padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Criar Pedido
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PedidoForm;