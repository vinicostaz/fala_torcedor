import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DetalhesDoTime from './components/DetalhesDoTime';
import DetalhesDoJogador from './components/DetalhesDoJogador';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/time/:id" element={<DetalhesDoTime />} />
        <Route path="/jogador/:id" element={<DetalhesDoJogador />} />
      </Routes>
    </Router>
  );
};

export default App;