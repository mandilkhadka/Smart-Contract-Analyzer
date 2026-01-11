import React, { useState } from 'react';
import api from '../services/api';

const ExportButton = ({ contractId, onError }) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingJSON, setIsExportingJSON] = useState(false);

  const handleExportPDF = async () => {
    if (!contractId) {
      onError('No contract ID available');
      return;
    }

    setIsExportingPDF(true);
    
    try {
      await api.exportPDF(contractId);
    } catch (error) {
      onError(error.message || 'Failed to export PDF');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportJSON = async () => {
    if (!contractId) {
      onError('No contract ID available');
      return;
    }

    setIsExportingJSON(true);
    
    try {
      await api.exportJSON(contractId);
    } catch (error) {
      onError(error.message || 'Failed to export JSON');
    } finally {
      setIsExportingJSON(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        className="btn btn-primary"
        onClick={handleExportPDF}
        disabled={isExportingPDF || !contractId}
      >
        {isExportingPDF ? (
          <>
            <span className="loading"></span>
            <span style={{ marginLeft: '0.5rem' }}>Generating PDF...</span>
          </>
        ) : (
          'Export PDF'
        )}
      </button>
      <button
        className="btn btn-secondary"
        onClick={handleExportJSON}
        disabled={isExportingJSON || !contractId}
      >
        {isExportingJSON ? (
          <>
            <span className="loading"></span>
            <span style={{ marginLeft: '0.5rem' }}>Exporting JSON...</span>
          </>
        ) : (
          'Export JSON'
        )}
      </button>
    </div>
  );
};

export default ExportButton;
