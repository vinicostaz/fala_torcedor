import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTorcedor = () => {
  const { id } = useParams();
  const [torcedorData, setTorcedorData] = useState({
    nome: '',
    time: '',
    data_nascimento: '',
    foto_url: '',
  });
  const [times, setTimes] = useState([]); // Lista de times para o dropdown
  const navigate = useNavigate();

  // Buscar dados do torcedor e lista de times
  useEffect(() => {
    const fetchTorcedorData = async () => {
      try {
        const torcedorResponse = await axios.get(`http://localhost:3000/torcedores/${id}`);
        const timesResponse = await axios.get('http://localhost:3000/times'); // Endpoint para buscar os times

        setTorcedorData({
          nome: torcedorResponse.data.nome,
          time: torcedorResponse.data.time?.id || '', // Armazena o ID do time
          data_nascimento: formatDateForInput(torcedorResponse.data.data_nascimento),
          foto_url: torcedorResponse.data.foto_url,
        });

        setTimes(timesResponse.data); // Armazena os times
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar informações do torcedor ou times.');
      }
    };

    fetchTorcedorData();
  }, [id]);

  const formatDateForInput = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Enviar o nome do time no payload
      const selectedTime = times.find((time) => time.id === parseInt(torcedorData.time));

      const payload = {
        ...torcedorData,
        time: selectedTime ? selectedTime.nome : '', // Enviar o nome do time
      };

      await axios.put(`http://localhost:3000/torcedores/${id}`, payload);
      alert('Torcedor atualizado com sucesso.');
      navigate('/crud/torcedor');
    } catch (error) {
      console.error('Erro ao atualizar torcedor:', error);
      alert('Erro ao atualizar torcedor.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTorcedorData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        Voltar
      </button>
      <form onSubmit={handleUpdate} style={formStyle}>
        <h1>Atualizar Torcedor</h1>
        <label style={labelStyle}>
          Nome:
          <input
            type="text"
            name="nome"
            value={torcedorData.nome}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
        <label style={labelStyle}>
          Time:
          <select
            name="time"
            value={torcedorData.time}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">Selecione um time</option>
            {times.map((time) => (
              <option key={time.id} value={time.id}>
                {time.nome}
              </option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          Data de Nascimento:
          <input
            type="date"
            name="data_nascimento"
            value={torcedorData.data_nascimento}
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
            value={torcedorData.foto_url}
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

export default UpdateTorcedor;