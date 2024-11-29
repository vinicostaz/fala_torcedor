import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div style={adminContainerStyle}>
      <h1 style={adminHeaderStyle}>Painel Administrativo</h1>
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={() => navigate('/crud/time')}
        >
          Gerenciar Times
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate('/crud/torcedor')}
        >
          Gerenciar Torcedores
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate('/relatorios')}
        >
          Relatórios
        </button>
      </div>
    </div>
  );
};

const adminContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
};

const adminHeaderStyle = {
  marginBottom: '30px',
  color: '#333',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '20px',
};

const buttonStyle = {
  padding: '15px 25px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#333',
  color: '#fff',
  fontSize: '18px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
};

export default AdminPanel;