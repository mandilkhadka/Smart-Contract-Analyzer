import React from 'react';

const RiskScore = ({ score }) => {
  const getRiskClass = (score) => {
    if (score <= 50) return 'critical';
    if (score <= 80) return 'moderate';
    return 'low';
  };

  const getRiskLabel = (score) => {
    if (score <= 50) return 'Critical Risk';
    if (score <= 80) return 'Moderate Risk';
    return 'Low Risk';
  };

  const riskClass = getRiskClass(score);
  const riskLabel = getRiskLabel(score);

  return (
    <div className="card risk-score">
      <div className={`score-value ${riskClass}`}>
        {score}%
      </div>
      <div className="score-label">
        {riskLabel}
      </div>
      <p className="text-muted mt-2">
        Lower score indicates higher risk exposure
      </p>
    </div>
  );
};

export default RiskScore;
