import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/times" style={linkStyle}>Times</Link>
        <Link to="/torcedores" style={linkStyle}>Torcedores</Link>
        <Link to="/login" style={adminIconContainerStyle}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/78/78948.png"
            alt="Admin Icon"
            style={adminIconStyle}
          />
        </Link>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: 'black',
  padding: '15px',
  textAlign: 'center',
  position: 'relative',
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

const adminIconContainerStyle = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  backgroundColor: 'white',
  borderRadius: '10px',
  border: '2px solid black',
};

const adminIconStyle = {
  width: '25px',
  height: '25px',
};

export default Header;