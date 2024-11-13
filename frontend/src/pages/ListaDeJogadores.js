import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListaJogadores = () => {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/jogadores')
      .then(response => setJogadores(response.data))
      .catch(error => console.error("Erro ao buscar jogadores:", error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <header style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Jogadores da NFL</h1>
      </header>
      <main style={{ textAlign: 'center', flex: '1' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {jogadores.map(jogador => (
            <li key={jogador.id} style={{ marginBottom: '10px' }}>
              <Link to={`/jogador/${jogador.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                {jogador.nome}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ListaJogadores;