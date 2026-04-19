import React, { useState } from 'react';
import CategoriaLista from './components/CategoriaLista';
import ProdutoForm from './components/ProdutoForm';
import ProdutoLista from './components/ProdutoLista';
import PedidoForm from './components/PedidoForm';
import PedidoLista from './components/PedidoLista';
import './App.css';

function App() {
    const [produtoParaEditar, setProdutoParaEditar] = useState(null);
    const [refreshProdutos, setRefreshProdutos] = useState(0);
    const [refreshPedidos, setRefreshPedidos] = useState(0);
    const [abaAtiva, setAbaAtiva] = useState('produtos');

    const handleProdutoSalvo = () => {
        setProdutoParaEditar(null);
        setRefreshProdutos(prev => prev + 1);
    };

    const handleEditarProduto = (produto) => {
        setProdutoParaEditar(produto);
        setAbaAtiva('produtos');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePedidoCriado = () => {
        setRefreshPedidos(prev => prev + 1);
    };

    return (
        <div className="app">
            <header className="header">
                <h1>📦 Mini Sistema de Pedidos</h1>
            </header>

            <div className="container">
                <CategoriaLista />

                <div className="abas">
                    <button 
                        className={`aba ${abaAtiva === 'produtos' ? 'ativa' : ''}`}
                        onClick={() => setAbaAtiva('produtos')}
                    >
                        🛍️ Produtos
                    </button>
                    <button 
                        className={`aba ${abaAtiva === 'pedidos' ? 'ativa' : ''}`}
                        onClick={() => setAbaAtiva('pedidos')}
                    >
                        🛒 Pedidos
                    </button>
                </div>

                {abaAtiva === 'produtos' && (
                    <div className="tab-content">
                        <ProdutoForm 
                            produtoParaEditar={produtoParaEditar}
                            onSalvo={handleProdutoSalvo}
                        />
                        <ProdutoLista 
                            onEditar={handleEditarProduto}
                            refresh={refreshProdutos}
                        />
                    </div>
                )}

                {abaAtiva === 'pedidos' && (
                    <div className="tab-content">
                        <PedidoForm onPedidoCriado={handlePedidoCriado} />
                        <PedidoLista refresh={refreshPedidos} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

/*import React, { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('Testando conexão...');

  useEffect(() => {
    fetch('/api/categorias')
      .then(response => response.json())
      .then(data => setStatus('✅ Conectado! Backend respondendo'))
      .catch(error => setStatus('❌ Erro de conexão: ' + error.message));
  }, []);

  return (
    <div>
      <h1>Status da Conexão</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;*/