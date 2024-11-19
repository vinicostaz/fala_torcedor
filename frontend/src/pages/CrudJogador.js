import React, { useState } from 'react';
import axios from 'axios';

const CrudJogador = () => {
  const [jogadorData, setJogadorData] = useState({
    nome: '',
    posicao: '',
    numero: '',
    time: '',
    foto_url: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/jogadores', jogadorData);
      alert(`Jogador criado com sucesso: ${response.data.nome}`);
      setJogadorData({ nome: '', posicao: '', numero: '', time: '', foto_url: '' });
    } catch (error) {
      console.error('Erro ao criar jogador:', error);
      alert('Erro ao criar jogador');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJogadorData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={crudContainerStyle}>
      <h1>Gerenciar Jogadores</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Nome:
          <input
            type="text"
            name="nome"
            value={jogadorData.nome}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Posição:
          <input
            type="text"
            name="posicao"
            value={jogadorData.posicao}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Número:
          <input
            type="number"
            name="numero"
            value={jogadorData.numero}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Time:
          <input
            type="text"
            name="time"
            value={jogadorData.time}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          URL da Foto:
          <input
            type="url"
            name="foto_url"
            value={jogadorData.foto_url}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Criar Jogador
        </button>
      </form>
    </div>
  );
};

const crudContainerStyle = {
  textAlign: 'center',
  padding: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  alignItems: 'center',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '300px',
};

const buttonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#333',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
};

export default CrudJogador;