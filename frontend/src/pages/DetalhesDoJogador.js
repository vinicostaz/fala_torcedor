import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetalhesDoJogador = () => {
  const { id } = useParams();
  const [jogador, setJogador] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/jogadores/${id}`)
      .then(response => setJogador(response.data))
      .catch(error => console.error("Erro ao buscar detalhes do jogador:", error));
  }, [id]);

  if (!jogador) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between', backgroundColor: '#fff' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          alignSelf: 'flex-start',
          margin: '20px',
          padding: '10px 20px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f8f8f8',
        }}
      >
        Voltar
      </button>
      <main style={{ textAlign: 'center', flex: '1' }}>
        <h1>{jogador.nome}</h1>
        {jogador.foto_url && (
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '2px solid #000',
              margin: '20px auto',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}
          >
            <img
              src={jogador.foto_url}
              alt={`Foto de ${jogador.nome}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <p>Posição: {jogador.posicao}</p>
        <p>Número: {jogador.numero}</p>
        <h2>Time</h2>
        {jogador.time && (
          <Link to={`/time/${jogador.time.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '10px',
                border: '1px solid #000',
                overflow: 'hidden',
                margin: '10px auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={jogador.time.foto_url}
                alt={`Logo do time ${jogador.time.nome}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{jogador.time.nome}</p>
          </Link>
        )}
      </main>
    </div>
  );
};

export default DetalhesDoJogador;