import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetalhesDoTorcedor = () => {
  const { id } = useParams();
  const [torcedor, setTorcedor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/torcedores/${id}`)
      .then(response => {
        setTorcedor(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do torcedor:", error);
      });
  }, [id]);

  if (!torcedor) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between', backgroundColor: '#fff' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          alignSelf: 'flex-start',
          margin: '20px',
          padding: '10px 20px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f8f8f8',
        }}
      >
        Voltar
      </button>
      <main style={{ textAlign: 'center', flex: '1' }}>
        <h1>{torcedor.nome}</h1>
        {torcedor.foto_url && (
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '2px solid #000',
              margin: '20px auto',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}
          >
            <img
              src={torcedor.foto_url}
              alt={`Foto de ${torcedor.nome}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <p><strong>Data de Nascimento:</strong> {torcedor.data_nascimento}</p>
        <h2>Time Favorito</h2>
        {torcedor.time ? (
          <Link to={`/time/${torcedor.time.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '10px',
                border: '1px solid #000',
                overflow: 'hidden',
                margin: '10px auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={torcedor.time.foto_url}
                alt={`Logo do time ${torcedor.time.nome}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{torcedor.time.nome}</p>
            <p><strong>Série:</strong> {torcedor.time.serie}</p>
            <p><strong>Data de Fundação:</strong> {torcedor.time.data_fundacao}</p>
          </Link>
        ) : (
          <p>Time não informado</p>
        )}
      </main>
    </div>
  );
};

export default DetalhesDoTorcedor;