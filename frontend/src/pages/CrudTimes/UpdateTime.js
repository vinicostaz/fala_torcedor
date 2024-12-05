import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTime = () => {
  const { id } = useParams();
  const [timeData, setTimeData] = useState({
    nome: '',
    serie: '',
    data_fundacao: '',
    foto_url: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/times/${id}`);
        if (response.data) {
          setTimeData({
            nome: response.data.nome || '',
            serie: response.data.serie || '',
            data_fundacao: formatDateForInput(response.data.data_fundacao),
            foto_url: response.data.foto_url || '',
          });
        } else {
          alert('Time não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar time:', error);
        alert('Erro ao carregar informações do time.');
      }
    };

    fetchTimeData();
  }, [id]);

  const formatDateForInput = (dateString) => {

    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/times/${id}`, timeData);
      alert('Time atualizado com sucesso.');
      navigate('/crud/time');
    } catch (error) {
      console.error('Erro ao atualizar time:', error);
      alert('Erro ao atualizar time.');
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
      <form onSubmit={handleUpdate} style={formStyle}>
        <h1>Atualizar Time</h1>
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
          Atualizar
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

export default UpdateTime;