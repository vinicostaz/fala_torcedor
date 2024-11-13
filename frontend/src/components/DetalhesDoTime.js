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

  if (!time) return <p>Carregando...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Voltar</button>
      <h1>{time.nome}</h1>
      <p>Divisão: {time.divisao}</p>
      <p>Títulos de Super Bowl: {time.titulos_superbowl}</p>
      <h2>Jogadores</h2>
      <ul>
        {time.jogadores && time.jogadores.map(jogador => (
          <li key={jogador.id}>
            <Link to={`/jogador/${jogador.id}`}>{jogador.nome} - {jogador.posicao} - Número {jogador.numero}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetalhesDoTime;
