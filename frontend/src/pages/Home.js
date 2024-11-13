
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Bem-vindo ao site de informações da NFL</h1>
      </header>
      <main style={{ textAlign: 'center', flex: '1' }}>
        <p style={{ marginBottom: '20px' }}>
          A liga esportiva profissional de futebol americano dos Estados Unidos
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to="/times">
            <button style={buttonStyle}>Ver Times</button>
          </Link>
          <Link to="/jogadores">
            <button style={buttonStyle}>Ver Jogadores</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  backgroundColor: '#f8f8f8',
  color: '#333',
  borderRadius: '5px',
  transition: 'background-color 0.3s, color 0.3s',
};

export default Home;
