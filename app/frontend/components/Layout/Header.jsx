import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header style={{ 
      borderBottom: '1px solid #E5E5E5', 
      padding: '1rem 0',
      marginBottom: '2rem',
      background: '#fff'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <h1 
            style={{ 
              fontSize: '1.5rem', 
              cursor: 'pointer',
              margin: 0
            }}
            onClick={() => navigate('/')}
          >
            🧠 Smart Contract Analyzer
          </h1>
          
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button
              className={`btn-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive('/') ? '#007bff' : '#666',
                fontWeight: isActive('/') ? 'bold' : 'normal',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
            >
              Upload
            </button>
            <button
              className={`btn-link ${isActive('/contracts') ? 'active' : ''}`}
              onClick={() => navigate('/contracts')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive('/contracts') ? '#007bff' : '#666',
                fontWeight: isActive('/contracts') ? 'bold' : 'normal',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
            >
              History
            </button>
            <button
              className={`btn-link ${isActive('/statistics') ? 'active' : ''}`}
              onClick={() => navigate('/statistics')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive('/statistics') ? '#007bff' : '#666',
                fontWeight: isActive('/statistics') ? 'bold' : 'normal',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
            >
              Statistics
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
