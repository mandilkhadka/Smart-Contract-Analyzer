import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      borderTop: '1px solid #E5E5E5', 
      padding: '2rem 0',
      marginTop: '4rem',
      textAlign: 'center'
    }}>
      <div className="container">
        <p className="text-muted">
          Smart Contract Analyzer - AI-powered contract analysis
        </p>
      </div>
    </footer>
  );
};

export default Footer;
