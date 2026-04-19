import React, { useState, useEffect } from 'react';
import { categoriaService } from '../services/api';
import Mensagem from './Mensagem';

const CategoriaLista = ({ onCategoriaSelecionada }) => {
    const [categorias, setCategorias] = useState([]);
    const [novaCategoria, setNovaCategoria] = useState('');
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async () => {
        try {
            const response = await categoriaService.listar();
            setCategorias(response.data);
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    const criarCategoria = async () => {
        if (!novaCategoria.trim()) {
            setMensagem({ tipo: 'erro', texto: 'Nome da categoria é obrigatório' });
            return;
        }

        try {
            await categoriaService.criar({ nome: novaCategoria });
            setMensagem({ tipo: 'sucesso', texto: 'Categoria criada com sucesso!' });
            setNovaCategoria('');
            carregarCategorias();
        } catch (error) {
            setMensagem({ tipo: 'erro', texto: error.message });
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '5px' }}>
            {mensagem && <Mensagem {...mensagem} onFechar={() => setMensagem(null)} />}
            
            <h3>📁 Categorias</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input
                    type="text"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    placeholder="Nome da categoria"
                    style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <button onClick={criarCategoria} style={{ padding: '8px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Criar Categoria
                </button>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categorias.map(cat => (
                    <span key={cat.id} style={{
                        padding: '5px 10px',
                        background: '#e0e0e0',
                        borderRadius: '20px',
                        fontSize: '14px',
                        cursor: 'pointer'
                    }} onClick={() => onCategoriaSelecionada && onCategoriaSelecionada(cat)}>
                        {cat.nome} (ID: {cat.id})
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CategoriaLista;