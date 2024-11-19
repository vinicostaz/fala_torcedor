import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListaDeTimes from './pages/ListaDeTimes';
import ListaDeJogadores from './pages/ListaDeJogadores';
import DetalhesDoTime from './pages/DetalhesDoTime';
import DetalhesDoJogador from './pages/DetalhesDoJogador';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
import ManageTimes from './pages/CrudTimes/ManageTimes';
import CreateTime from './pages/CrudTimes/CreateTime';
import UpdateTime from './pages/CrudTimes/UpdateTime';
import ManageJogadores from './pages/CrudJogadores/ManageJogadores';
import CreateJogador from './pages/CrudJogadores/CreateJogador';
import UpdateJogador from './pages/CrudJogadores/UpdateJogador';

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/crud/time" element={<ManageTimes />} />
            <Route path="/create-time" element={<CreateTime />} />
            <Route path="/update-time/:id" element={<UpdateTime />} />
            <Route path="/crud/jogador" element={<ManageJogadores />} />
            <Route path="/create-jogador" element={<CreateJogador />} />
            <Route path="/update-jogador/:id" element={<UpdateJogador />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;