import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListaDeTimes from './pages/ListaDeTimes';
import ListaDeTorcedores from './pages/ListaDeTorcedores';
import DetalhesDoTime from './pages/DetalhesDoTime';
import DetalhesDoTorcedor from './pages/DetalhesDoTorcedor';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
import ManageTimes from './pages/CrudTimes/ManageTimes';
import CreateTime from './pages/CrudTimes/CreateTime';
import UpdateTime from './pages/CrudTimes/UpdateTime';
import ManageTorcedores from './pages/CrudJogadores/ManageTorcedores';
import CreateTorcedor from './pages/CrudJogadores/CreateTorcedor';
import UpdateTorcedor from './pages/CrudJogadores/UpdateTorcedor';
import ProtectedRoute from './components/ProtectedRoute';
import Relatorios from './pages/Relatorios';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/times" element={<ListaDeTimes />} />
            <Route path="/torcedores" element={<ListaDeTorcedores />} />
            <Route path="/time/:id" element={<DetalhesDoTime />} />
            <Route path="/torcedores/:id" element={<DetalhesDoTorcedor />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/crud/time" element={<ManageTimes />} />
            <Route path="/create-time" element={<CreateTime />} />
            <Route path="/update-time/:id" element={<UpdateTime />} />
            <Route path="/crud/torcedor" element={<ManageTorcedores />} />
            <Route path="/create-torcedor" element={<CreateTorcedor />} />
            <Route path="/update-torcedor/:id" element={<UpdateTorcedor />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </main>
        <Footer />
      </div>  
    </Router>
  );
};

export default App;