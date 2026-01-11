import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Toast from '../Toast';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const data = await api.getStatistics();
      setStats(data);
    } catch (error) {
      showToast(error.message || 'Failed to load statistics', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  if (loading) {
    return (
      <div className="card text-center">
        <div className="loading" style={{ margin: '2rem auto' }}></div>
        <p className="text-muted">Loading statistics...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="card">
        <p className="text-muted">No statistics available.</p>
      </div>
    );
  }

  const getRiskLevelClass = (score) => {
    if (score <= 50) return 'critical';
    if (score <= 80) return 'moderate';
    return 'low';
  };

  return (
    <div>
      <h2 className="mb-4">Analytics Dashboard</h2>
      
      <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <h4>Total Contracts</h4>
          <div className="stat-value">{stats.total_contracts}</div>
          <p className="text-muted">All uploaded contracts</p>
        </div>

        <div className="card">
          <h4>Completed Analyses</h4>
          <div className="stat-value">{stats.completed_contracts}</div>
          <p className="text-muted">Successfully analyzed</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h4>Average Risk Score</h4>
        <div className={`stat-value ${getRiskLevelClass(stats.average_risk_score)}`}>
          {stats.average_risk_score}%
        </div>
        <p className="text-muted">Across all completed analyses</p>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <h4>Critical Risks</h4>
          <div className="stat-value critical">{stats.total_critical_risks}</div>
          <p className="text-muted">Total critical risks found</p>
        </div>

        <div className="card">
          <h4>Moderate Risks</h4>
          <div className="stat-value moderate">{stats.total_moderate_risks}</div>
          <p className="text-muted">Total moderate risks found</p>
        </div>

        <div className="card">
          <h4>Low Risks</h4>
          <div className="stat-value low">{stats.total_low_risks}</div>
          <p className="text-muted">Total low risks found</p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Statistics;
