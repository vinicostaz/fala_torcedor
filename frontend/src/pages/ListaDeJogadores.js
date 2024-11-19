import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListaJogadores = () => {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/jogadores')
      .then(response => setJogadores(response.data))
      .catch(error => console.error("Erro ao buscar jogadores:", error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Jogadores da NFL</h1>
      </header>
      <main style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {jogadores.map((jogador) => (
            <Link
              to={`/jogador/${jogador.id}`}
              key={jogador.id}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'black',
                width: 'calc(25% - 20px)', // Cada coluna ocupa 25% do espaço com um pequeno espaçamento
                maxWidth: '200px',
                minWidth: '150px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1', // Garante que o quadrado é perfeitamente proporcional
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f9f9f9',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img
                  src={jogador.foto_url}
                  alt={`Foto do jogador ${jogador.nome}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <p style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>{jogador.nome}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListaJogadores;