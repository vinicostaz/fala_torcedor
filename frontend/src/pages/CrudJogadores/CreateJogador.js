import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateJogador = () => {
  const [jogadorData, setJogadorData] = useState({
    nome: '',
    posicao: '',
    time: '',
    numero: '',
    foto_url: '',
  });
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/jogadores', jogadorData);
      alert('Jogador criado com sucesso.');
      navigate('/crud/jogador');
    } catch (error) {
      console.error('Erro ao criar jogador:', error);
      alert('Erro ao criar jogador.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJogadorData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button
        onClick={() => navigate(-1)}
        style={backButtonStyle}
      >
        Voltar
      </button>
      <form onSubmit={handleCreate} style={formStyle}>
        <h1>Criar Novo Jogador</h1>
        <label style={labelStyle}>
          Nome:
          <input
            type="text"
            name="nome"
            value={jogadorData.nome}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Posição:
          <input
            type="text"
            name="posicao"
            value={jogadorData.posicao}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Time:
          <input
            type="text"
            name="time"
            value={jogadorData.time}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Número:
          <input
            type="number"
            name="numero"
            value={jogadorData.numero}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Foto URL:
          <input
            type="text"
            name="foto_url"
            value={jogadorData.foto_url}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <button type="submit" style={buttonStyle}>Criar</button>
      </form>
    </div>
  );
};

const formStyle = {
  padding: '20px',
  maxWidth: '400px',
  margin: '0 auto',
  marginBottom: '40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  border: '2px solid #ccc',
  borderRadius: '10px',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#333',
  color: 'white',
  cursor: 'pointer',
};

const backButtonStyle = {
  padding: '10px 20px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f8f8f8',
  cursor: 'pointer',
  marginLeft: '20px',
};

export default CreateJogador;