import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetalhesDoTime = () => {
  const { id } = useParams();
  const [time, setTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/times/${id}`)
      .then(response => setTime(response.data))
      .catch(error => console.error("Erro ao buscar detalhes do time:", error));
  }, [id]);

  if (!time) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
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
        <h1>{time.nome}</h1>
        {time.foto_url && (
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '10px',
              border: '2px solid #000',
              margin: '20px auto',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}
          >
            <img
              src={time.foto_url}
              alt={`Logo do time ${time.nome}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <p>Divisão: {time.divisao}</p>
        <p>Títulos de Super Bowl: {time.titulos_superbowl}</p>
        <h2>Jogadores</h2>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {time.jogadores && time.jogadores.map(jogador => (
            <li key={jogador.id} style={{ margin: '10px', textAlign: 'center' }}>
              <Link to={`/jogador/${jogador.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    border: '1px solid #000',
                    overflow: 'hidden',
                    margin: '0 auto',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img
                    src={jogador.foto_url}
                    alt={`Foto do jogador ${jogador.nome}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default DetalhesDoTime;