import React from 'react';

const PedidoDetalhe = ({ pedido, onFechar }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Pedido #{pedido.id}</h2>
                    <button onClick={onFechar} style={{ padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Fechar
                    </button>
                </div>
                
                <p><strong>Data/Hora:</strong> {new Date(pedido.dataHora).toLocaleString('pt-BR')}</p>
                <p><strong>Valor Total:</strong> R$ {pedido.valorTotal?.toFixed(2)}</p>
                
                <h3>Itens do Pedido:</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4' }}>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Produto</th>
                            <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Quantidade</th>
                            <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Preço Unitário</th>
                            <th style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.itens?.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.produtoNome}</td>
                                <td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>{item.quantidade}</td>
                                <td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>R$ {item.precoUnitario?.toFixed(2)}</td>
                                <td style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>R$ {item.subtotal?.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PedidoDetalhe;