import React from 'react';

const RiskList = ({ title, risks, type }) => {
  if (!risks || risks.length === 0) {
    return (
      <div className="card">
        <h4>{title}</h4>
        <p className="text-muted">No {title.toLowerCase()} detected.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h4>{title} ({risks.length})</h4>
      <ul className="risk-list">
        {risks.map((risk, index) => (
          <li key={index} className={`risk-item ${type}`}>
            {risk}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskList;
