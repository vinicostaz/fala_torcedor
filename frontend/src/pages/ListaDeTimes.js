import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListaTimes = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/times')
      .then(response => setTimes(response.data))
      .catch(error => console.error("Erro ao buscar times:", error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Times da NFL</h1>
      </header>
      <main style={{ textAlign: 'center', flex: '1' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {times.map(time => (
            <li key={time.id} style={{ marginBottom: '10px' }}>
              <Link to={`/time/${time.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                {time.nome}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ListaTimes;