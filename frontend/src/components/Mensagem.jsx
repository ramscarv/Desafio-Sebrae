import React, { useState, useEffect } from 'react';

const Mensagem = ({ tipo, mensagem, duracao = 5000, onFechar }) => {
    const [visivel, setVisivel] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisivel(false);
            if (onFechar) onFechar();
        }, duracao);
        return () => clearTimeout(timer);
    }, [duracao, onFechar]);

    if (!visivel) return null;

    const cores = {
        sucesso: '#4CAF50',
        erro: '#f44336',
        info: '#2196F3',
        alerta: '#ff9800'
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: cores[tipo] || cores.info,
            color: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out'
        }}>
            {mensagem}
            <button onClick={() => setVisivel(false)} style={{
                marginLeft: '15px',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px'
            }}>✕</button>
        </div>
    );
};

export default Mensagem;