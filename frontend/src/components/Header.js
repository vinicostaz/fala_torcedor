import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

 
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const { expiry } = JSON.parse(token);
      if (new Date().getTime() < expiry) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };


  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth); 
    return () => {
      window.removeEventListener('storage', checkAuth); 
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const dynamicAdminIconStyle = {
    ...adminIconContainerStyle,
    right: isLoggedIn ? '100px' : '20px',
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/times" style={linkStyle}>Times</Link>
        <Link to="/torcedores" style={linkStyle}>Torcedores</Link>

        <Link to={isLoggedIn ? "/admin" : "/login"} style={dynamicAdminIconStyle}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/78/78948.png"
            alt="Admin Icon"
            style={adminIconStyle}
          />
        </Link>

        {isLoggedIn && (
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        )}
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

const logoutButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '20px',
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Header;