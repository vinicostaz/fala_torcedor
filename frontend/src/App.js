import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListaDeTimes from './pages/ListaDeTimes';
import ListaDeJogadores from './pages/ListaDeJogadores';
import DetalhesDoTime from './pages/DetalhesDoTime';
import DetalhesDoJogador from './pages/DetalhesDoJogador';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/times" element={<ListaDeTimes />} />
          <Route path="/jogadores" element={<ListaDeJogadores />} />
          <Route path="/time/:id" element={<DetalhesDoTime />} />
          <Route path="/jogador/:id" element={<DetalhesDoJogador />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;