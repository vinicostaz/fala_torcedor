import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageTorcedores = () => {
  const [torcedores, setTorcedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/torcedores')
      .then((response) => setTorcedores(response.data))
      .catch((error) => console.error('Erro ao buscar torcedores:', error));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este torcedor?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/torcedores/${id}`);
        setTorcedores(torcedores.filter((torcedor) => torcedor.id !== id));
        alert('Torcedor deletado com sucesso.');
      } catch (error) {
        console.error('Erro ao deletar torcedor:', error);
        alert('Erro ao deletar torcedor.');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate('/admin')} style={backButtonStyle}>
        Voltar para o Painel Administrativo
      </button>
      <h1 style={headerStyle}>Gerenciar Torcedores</h1>
      <div style={tableStyle}>
        {torcedores.map((torcedor) => (
          <div key={torcedor.id} style={rowStyle}>
            <p style={{ margin: 0 }}>{torcedor.nome}</p>
            <div style={buttonContainerStyle}>
              <button
                style={buttonStyle}
                onClick={() => navigate(`/update-torcedor/${torcedor.id}`)}
              >
                Atualizar
              </button>
              <button
                style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
                onClick={() => handleDelete(torcedor.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
      <button style={createButtonStyle} onClick={() => navigate('/create-torcedor')}>
        Criar Novo Torcedor
      </button>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const backButtonStyle = {
  padding: '10px 20px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f8f8f8',
  cursor: 'pointer',
  alignSelf: 'flex-start',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const tableStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  flex: '1',
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
};

const buttonStyle = {
  padding: '5px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const createButtonStyle = {
  marginTop: '20px',
  padding: '10px',
  width: '100%',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#333',
  color: 'white',
  cursor: 'pointer',
};

export default ManageTorcedores;