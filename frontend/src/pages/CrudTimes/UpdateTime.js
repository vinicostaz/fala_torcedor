import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTime = () => {
  const { id } = useParams();
  const [timeData, setTimeData] = useState({
    nome: '',
    divisao: '',
    titulos_superbowl: 0, // Inicializado como número
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
            divisao: response.data.divisao || '',
            titulos_superbowl: response.data.titulos_superbowl || 0,
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        nome: timeData.nome,
        divisao: timeData.divisao,
        titulos_superbowl: Number(timeData.titulos_superbowl), // Garante que seja um número
        foto_url: timeData.foto_url,
      };

      await axios.put(`http://localhost:3000/times/${id}`, updatedData);
      alert('Time atualizado com sucesso.');
      navigate('/crud/time');
    } catch (error) {
      console.error('Erro ao atualizar time:', error);
      alert('Erro ao atualizar time.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimeData((prevData) => ({
      ...prevData,
      [name]: name === 'titulos_superbowl' ? parseInt(value, 10) || 0 : value, // Converte apenas titulos_superbowl para número
    }));
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button
        onClick={() => navigate(-1)}
        style={backButtonStyle}
      >
        Voltar
      </button>
      <form onSubmit={handleUpdate} style={formStyle}>
        <h1>Atualizar Time</h1>
        {['nome', 'divisao', 'titulos_superbowl', 'foto_url'].map((field) => (
          <label key={field} style={labelStyle}>
            {field === 'titulos_superbowl' ? 'Títulos de Super Bowl' : field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              type={field === 'titulos_superbowl' ? 'number' : 'text'}
              name={field}
              value={timeData[field] || ''}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>
        ))}
        <button type="submit" style={buttonStyle}>Atualizar</button>
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