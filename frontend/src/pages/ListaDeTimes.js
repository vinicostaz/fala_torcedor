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
        <h1>Times</h1>
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
          {times.map((time) => (
            <Link
              to={`/time/${time.id}`}
              key={time.id}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'black',
                width: 'calc(25% - 20px)',
                maxWidth: '200px',
                minWidth: '150px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
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
                  src={time.foto_url}
                  alt={`Logo do time ${time.nome}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <p style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>{time.nome}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListaTimes;