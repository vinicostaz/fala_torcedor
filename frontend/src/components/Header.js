import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/times" style={linkStyle}>Times</Link>
        <Link to="/jogadores" style={linkStyle}>Jogadores</Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: 'black',
  padding: '10px',
  textAlign: 'center',
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
};

export default Header;