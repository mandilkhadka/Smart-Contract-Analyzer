import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={{ 
      borderBottom: '1px solid #E5E5E5', 
      padding: '1rem 0',
      marginBottom: '2rem'
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
            Smart Contract Analyzer
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
