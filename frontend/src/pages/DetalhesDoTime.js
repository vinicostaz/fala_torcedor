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
        <p>Divisão: {time.divisao}</p>
        <p>Títulos de Super Bowl: {time.titulos_superbowl}</p>
        <h2>Jogadores</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {time.jogadores && time.jogadores.map(jogador => (
            <li key={jogador.id} style={{ marginBottom: '10px' }}>
              <Link to={`/jogador/${jogador.id}`} style={{ color: 'blue', textDecoration: 'none' }}>
                {jogador.nome}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default DetalhesDoTime;