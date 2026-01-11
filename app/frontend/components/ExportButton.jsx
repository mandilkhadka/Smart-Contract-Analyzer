import React, { useState } from 'react';
import api from '../services/api';

const ExportButton = ({ contractId, onError }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!contractId) {
      onError('No contract ID available');
      return;
    }

    setIsExporting(true);
    
    try {
      await api.exportPDF(contractId);
    } catch (error) {
      onError(error.message || 'Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleExport}
      disabled={isExporting || !contractId}
    >
      {isExporting ? (
        <>
          <span className="loading"></span>
          <span style={{ marginLeft: '0.5rem' }}>Generating PDF...</span>
        </>
      ) : (
        'Export PDF Report'
      )}
    </button>
  );
};

export default ExportButton;
