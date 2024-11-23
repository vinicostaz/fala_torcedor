import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="https://juniormedrado.com.br/wp-content/uploads/2023/02/Fala-toredor.jpeg"
          alt="Logo da Torcida"
          style={{
            width: '550px',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />
        <h1>Bem-vindo ao site do Fala Torcedor!</h1>
        <p>A página de informações dos torcedores e seus times favoritos!</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Link to="/times">
          <button style={buttonStyle}>Ver Times</button>
        </Link>
        <Link to="/torcedores">
          <button style={buttonStyle}>Ver Torcedores</button>
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