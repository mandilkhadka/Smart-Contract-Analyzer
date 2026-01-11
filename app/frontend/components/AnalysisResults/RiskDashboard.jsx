import React from 'react';
import RiskScore from './RiskScore';
import RiskList from './RiskList';
import Summary from './Summary';

const RiskDashboard = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="card">
        <p className="text-muted">Loading analysis...</p>
      </div>
    );
  }

  const {
    critical_risks = [],
    moderate_risks = [],
    low_risks = [],
    summary = '',
    risk_score = 0,
  } = analysis;

  return (
    <div>
      <div className="text-center mb-4">
        <h2>Contract Analysis Results</h2>
        <p className="text-muted">AI-based risk and summary analysis</p>
      </div>

      <div className="mb-4">
        <RiskScore score={risk_score} />
      </div>

      <div className="grid grid-3 mb-4">
        <RiskList
          title="Critical Risks"
          risks={critical_risks}
          type="critical"
        />
        <RiskList
          title="Moderate Risks"
          risks={moderate_risks}
          type="moderate"
        />
        <RiskList
          title="Low Risks"
          risks={low_risks}
          type="low"
        />
      </div>

      <div className="mb-4">
        <Summary summary={summary} />
      </div>
    </div>
  );
};

export default RiskDashboard;
