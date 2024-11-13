import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/times')
      .then(response => setTimes(response.data))
      .catch(error => console.error("Erro ao buscar times:", error));
  }, []);

  return (
    <div>
      <h1>Times da NFL</h1>
      <ul>
        {times.map(time => (
          <li key={time.id}>
            <h2>{time.nome}</h2>
            <p>Divisão: {time.divisao}</p>
            <p>Títulos de Super Bowl: {time.titulos_superbowl}</p>
            <Link to={`/time/${time.id}`}>Ver Jogadores</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;