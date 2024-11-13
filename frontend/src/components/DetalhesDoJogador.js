import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DetalhesDoJogador = () => {
  const { id } = useParams();
  const [jogador, setJogador] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/jogadores/${id}`)
      .then(response => setJogador(response.data))
      .catch(error => console.error("Erro ao buscar detalhes do jogador:", error));
  }, [id]);

  if (!jogador) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Detalhes do Jogador</h1>
      <p><strong>Nome:</strong> {jogador.nome}</p>
      <p><strong>Posição:</strong> {jogador.posicao}</p>
      <p><strong>Número:</strong> {jogador.numero}</p>

      {jogador.time && (
        <div>
          <h2>Informações do Time</h2>
          <p><strong>Nome do Time:</strong> {jogador.time.nome}</p>
          <p><strong>Divisão:</strong> {jogador.time.divisao}</p>
          <p><strong>Títulos de Super Bowl:</strong> {jogador.time.titulos_superbowl}</p>
        </div>
      )}

      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default DetalhesDoJogador;