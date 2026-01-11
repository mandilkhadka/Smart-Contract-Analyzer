import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Toast from '../Toast';

const ContractList = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const data = await api.getContracts();
      setContracts(data.contracts || []);
    } catch (error) {
      showToast(error.message || 'Failed to load contracts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this contract analysis?')) {
      return;
    }

    try {
      setDeletingId(id);
      await api.deleteContract(id);
      setContracts(contracts.filter(c => c.id !== id));
      showToast('Contract deleted successfully', 'success');
    } catch (error) {
      showToast(error.message || 'Failed to delete contract', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const getRiskClass = (score) => {
    if (score <= 50) return 'critical';
    if (score <= 80) return 'moderate';
    return 'low';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  if (loading) {
    return (
      <div className="card text-center">
        <div className="loading" style={{ margin: '2rem auto' }}></div>
        <p className="text-muted">Loading contracts...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Contract History</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          + Upload New Contract
        </button>
      </div>

      {contracts.length === 0 ? (
        <div className="card text-center">
          <p className="text-muted">No contracts analyzed yet.</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Upload Your First Contract
          </button>
        </div>
      ) : (
        <div className="contract-list">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="card contract-item"
              onClick={() => contract.status === 'completed' && navigate(`/contracts/${contract.id}`)}
              style={{ 
                cursor: contract.status === 'completed' ? 'pointer' : 'default',
                marginBottom: '1rem',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, marginRight: '1rem' }}>
                      {contract.file_name || `Contract #${contract.id}`}
                    </h4>
                    <span className={`badge ${contract.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                      {contract.status === 'completed' ? 'Completed' : 'Processing'}
                    </span>
                  </div>
                  
                  {contract.question && (
                    <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      <strong>Question:</strong> {contract.question}
                    </p>
                  )}

                  {contract.status === 'completed' && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className={`risk-badge ${getRiskClass(contract.risk_score)}`}>
                        Risk Score: {contract.risk_score}%
                      </span>
                    </div>
                  )}

                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Analyzed: {formatDate(contract.created_at)}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {contract.status === 'completed' && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/contracts/${contract.id}`);
                      }}
                    >
                      View
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => handleDelete(contract.id, e)}
                    disabled={deletingId === contract.id}
                  >
                    {deletingId === contract.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default ContractList;
