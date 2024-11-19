import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateJogador = () => {
  const { id } = useParams();
  const [jogadorData, setJogadorData] = useState({
    nome: '',
    posicao: '',
    time: '', // Nome do time
    numero: '',
    foto_url: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJogadorData = async () => {
      try {
        const jogadorResponse = await axios.get(`http://localhost:3000/jogadores/${id}`);

        setJogadorData({
          nome: jogadorResponse.data.nome,
          posicao: jogadorResponse.data.posicao,
          time: jogadorResponse.data.time?.nome || '', // Nome do time
          numero: jogadorResponse.data.numero,
          foto_url: jogadorResponse.data.foto_url,
        });
      } catch (error) {
        console.error('Erro ao buscar jogador:', error);
        alert('Erro ao carregar informações do jogador.');
      }
    };

    fetchJogadorData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...jogadorData,
        time: jogadorData.time.trim(), // Enviar o nome do time
      };

      await axios.put(`http://localhost:3000/jogadores/${id}`, payload);
      alert('Jogador atualizado com sucesso.');
      navigate('/crud/jogador');
    } catch (error) {
      console.error('Erro ao atualizar jogador:', error);
      alert('Erro ao atualizar jogador.');
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
      <form onSubmit={handleUpdate} style={formStyle}>
        <h1>Atualizar Jogador</h1>
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

export default UpdateJogador;