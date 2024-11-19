import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="https://www.thewebfactory.us/blogs/wp-content/uploads/2022/09/NFL-LOGO-2.jpg"
          alt="Logo da NFL"
          style={{
            width: '550px',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />
        <h1>Bem-vindo ao site de informações da NFL</h1>
        <p>A liga esportiva profissional de futebol americano dos Estados Unidos</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Link to="/times">
          <button style={buttonStyle}>Ver Times</button>
        </Link>
        <Link to="/jogadores">
          <button style={buttonStyle}>Ver Jogadores</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  color: '#333',
  borderRadius: '5px',
  transition: 'background-color 0.3s, color 0.3s',
};

export default Home;