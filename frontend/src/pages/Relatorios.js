import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Relatorios = () => {
  const [timesPorSerie, setTimesPorSerie] = useState({});
  const [torcedoresPorSerie, setTorcedoresPorSerie] = useState({});

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const timesResponse = await axios.get('http://localhost:3000/times');
        const times = timesResponse.data;

        const timesAgrupados = times.reduce((acc, time) => {
          if (!acc[time.serie]) acc[time.serie] = [];
          acc[time.serie].push(time);
          return acc;
        }, {});

        setTimesPorSerie(timesAgrupados);

        const torcedoresResponse = await axios.get('http://localhost:3000/torcedores');
        const torcedores = torcedoresResponse.data;

        const torcedoresAgrupados = torcedores.reduce((acc, torcedor) => {
          const serie = torcedor.time?.serie;
          if (serie) {
            if (!acc[serie]) acc[serie] = 0;
            acc[serie] += 1;
          }
          return acc;
        }, {});

        setTorcedoresPorSerie(torcedoresAgrupados);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        alert('Erro ao carregar relatórios.');
      }
    };

    fetchRelatorios();
  }, []);

  return (
    <div style={relatoriosContainerStyle}>
      <h1>Relatórios</h1>

      <section style={sectionStyle}>
        <h2>Times por Série</h2>
        {Object.keys(timesPorSerie).length === 0 ? (
          <p>Carregando...</p>
        ) : (
          Object.entries(timesPorSerie).map(([serie, times]) => (
            <div key={serie} style={serieContainerStyle}>
              <h3>Série {serie}</h3>
              <p>Total de times: {times.length}</p>
              <ul>
                {times.map((time) => (
                  <li key={time.id}>
                    {time.nome} - Fundado em {time.data_fundacao}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      <section style={sectionStyle}>
        <h2>Torcedores por Série</h2>
        {Object.keys(torcedoresPorSerie).length === 0 ? (
          <p>Carregando...</p>
        ) : (
          Object.entries(torcedoresPorSerie).map(([serie, count]) => (
            <div key={serie} style={serieContainerStyle}>
              <h3>Série {serie}</h3>
              <p>{count} torcedores</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

const relatoriosContainerStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
};

const sectionStyle = {
  marginBottom: '30px',
};

const serieContainerStyle = {
  marginBottom: '20px',
};

export default Relatorios;