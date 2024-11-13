import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
        <h1>{jogador.nome}</h1>
        <p>Posição: {jogador.posicao}</p>
        <p>Número: {jogador.numero}</p>
        <h2>Time</h2>
        <p>
          <strong>{jogador.time.nome}</strong><br />
          Divisão: {jogador.time.divisao}<br />
          Títulos de Super Bowl: {jogador.time.titulos_superbowl}
        </p>
      </main>
      <footer style={{ textAlign: 'center', padding: '10px', background: '#f1f1f1' }}>
        <p>Criado por: Vinicius Costa Fonseca</p>
      </footer>
    </div>
  );
};

export default DetalhesDoJogador;