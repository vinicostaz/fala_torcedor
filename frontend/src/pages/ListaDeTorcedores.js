import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListaDeTorcedores = () => {
  const [torcedores, setTorcedores] = useState([]);

  useEffect(() => {
    // Adicionar logs para depuração
    console.log("Buscando torcedores...");
    axios
      .get('http://localhost:3000/torcedores')
      .then((response) => {
        console.log("Torcedores recebidos:", response.data);
        setTorcedores(response.data);
      })
      .catch((error) => console.error("Erro ao buscar torcedores:", error));
  }, []);

  // Verificar se a lista está vazia
  if (torcedores.length === 0) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Nenhum torcedor encontrado.
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Torcedores cadastrados</h1>
      </header>
      <main style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {torcedores.map((torcedor) => (
            <Link
              to={`/torcedores/${torcedor.id}`}
              key={torcedor.id}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'black',
                width: 'calc(25% - 20px)',
                maxWidth: '200px',
                minWidth: '150px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f9f9f9',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img
                  src={torcedor.foto_url}
                  alt={`Foto do torcedor ${torcedor.nome}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <p style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>{torcedor.nome}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ListaDeTorcedores;