import React from 'react';

const Summary = ({ summary }) => {
  if (!summary) {
    return (
      <div className="card">
        <h4>Summary</h4>
        <p className="text-muted">No summary available.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h4>Summary</h4>
      <p>{summary}</p>
    </div>
  );
};

export default Summary;
