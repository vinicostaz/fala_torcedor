import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTime = () => {
  const [timeData, setTimeData] = useState({
    nome: '',
    serie: '',
    data_fundacao: '',
    foto_url: 'https://cdn-icons-png.flaticon.com/512/8893/8893606.png',
  });
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/times', timeData);
      alert('Time criado com sucesso.');
      navigate('/crud/time');
    } catch (error) {
      console.error('Erro ao criar time:', error);
      alert('Erro ao criar time.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimeData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        Voltar
      </button>
      <form onSubmit={handleCreate} style={formStyle}>
        <h1>Criar Novo Time</h1>
        <label style={labelStyle}>
          Nome:
          <input
            type="text"
            name="nome"
            value={timeData.nome}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Série:
          <select
            name="serie"
            value={timeData.serie}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </label>
        <label style={labelStyle}>
          Data de Fundação (Mês/Dia/Ano):
          <input
            type="date"
            name="data_fundacao"
            value={timeData.data_fundacao}
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
            value={timeData.foto_url}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Criar
        </button>
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

export default CreateTime;