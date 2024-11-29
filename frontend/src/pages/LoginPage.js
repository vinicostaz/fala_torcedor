import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      const token = JSON.stringify({ username, expiry: new Date().getTime() + 3600 * 1000 });
      localStorage.setItem('authToken', token);
      window.dispatchEvent(new Event('storage'));
      navigate('/admin');
    } else {
      alert('Nome de usuário ou senha incorretos!');
    }
  };
  
  return (
    <div style={loginContainerStyle}>
      <h1 style={loginHeaderStyle}>Admin Login</h1>
      <form onSubmit={handleLogin} style={formStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="username" style={labelStyle}>Nome de Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            placeholder="Digite seu usuário"
            required
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="password" style={labelStyle}>Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Entrar</button>
      </form>
    </div>
  );
};

const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
};

const loginHeaderStyle = {
  marginBottom: '20px',
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '320px',
  padding: '25px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '2px solid black',
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#333',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const buttonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#333',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.2s',
  textAlign: 'center',
};

export default LoginPage;