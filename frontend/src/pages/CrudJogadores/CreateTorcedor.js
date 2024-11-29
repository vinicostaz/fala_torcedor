import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTorcedor = () => {
  const [torcedorData, setTorcedorData] = useState({
    nome: '',
    time: '',
    data_nascimento: '',
    foto_url: 'https://cdn-icons-png.freepik.com/512/10015/10015419.png',
  });
  const [times, setTimes] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/times'); 
        setTimes(response.data);
      } catch (error) {
        console.error('Erro ao buscar times:', error);
        alert('Erro ao carregar lista de times.');
      }
    };

    fetchTimes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {

      const selectedTime = times.find((time) => time.id === parseInt(torcedorData.time));

      const payload = {
        ...torcedorData,
        time: selectedTime ? selectedTime.nome : '', 
      };

      await axios.post('http://localhost:3000/torcedores', payload);
      alert('Torcedor criado com sucesso.');
      navigate('/crud/torcedor');
    } catch (error) {
      console.error('Erro ao criar torcedor:', error);
      alert('Erro ao criar torcedor.');
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
      <form onSubmit={handleCreate} style={formStyle}>
        <h1>Criar Novo Torcedor</h1>
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

export default CreateTorcedor;