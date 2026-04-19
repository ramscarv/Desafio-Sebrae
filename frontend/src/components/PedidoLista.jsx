import React, { useState, useEffect } from 'react';
import { pedidoService } from '../services/api';
import PedidoDetalhe from './PedidoDetalhe';
import Mensagem from './Mensagem';

const PedidoLista = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        carregarPedidos();
    }, []);

    const carregarPedidos = async () => {
        try {
            const response = await pedidoService.listar();
            setPedidos(response.data);
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    const verDetalhe = async (id) => {
        try {
            const response = await pedidoService.buscarPorId(id);
            setPedidoSelecionado(response.data);
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    const fecharDetalhe = () => {
        setPedidoSelecionado(null);
        carregarPedidos();
    };

    return (
        <div>
            {mensagem && <Mensagem {...mensagem} onFechar={() => setMensagem(null)} />}
            
            {pedidoSelecionado && (
                <PedidoDetalhe pedido={pedidoSelecionado} onFechar={fecharDetalhe} />
            )}
            
            <h3>📋 Lista de Pedidos</h3>
            <button onClick={carregarPedidos} style={{ marginBottom: '15px', padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Atualizar Lista
            </button>
            
            <div style={{ display: 'grid', gap: '10px' }}>
                {pedidos.length === 0 ? (
                    <p>Nenhum pedido encontrado.</p>
                ) : (
                    pedidos.map(pedido => (
                        <div key={pedido.id} style={{
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
                                <strong>Pedido #{pedido.id}</strong><br />
                                <span>Data: {new Date(pedido.dataHora).toLocaleString('pt-BR')}</span><br />
                                <span>Total: R$ {pedido.valorTotal?.toFixed(2)}</span><br />
                                <span>Itens: {pedido.itens?.length || 0}</span>
                            </div>
                            <button onClick={() => verDetalhe(pedido.id)} style={{ padding: '8px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                Ver Detalhes
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PedidoLista;