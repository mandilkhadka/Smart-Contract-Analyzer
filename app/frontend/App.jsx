import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import UploadForm from './components/ContractUpload/UploadForm';
import RiskDashboard from './components/AnalysisResults/RiskDashboard';
import ExportButton from './components/ExportButton';
import ContractList from './components/ContractList/ContractList';
import Statistics from './components/Statistics/Statistics';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Toast from './components/Toast';
import api from './services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleUploadSuccess = (contractId) => {
    navigate(`/contracts/${contractId}`);
  };

  const handleError = (error) => {
    showToast(error, 'error');
  };

  return (
    <div>
      <UploadForm
        onUploadSuccess={handleUploadSuccess}
        onError={handleError}
      />
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

const ContractShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        const data = await api.getContract(id);
        setContract(data);
        
        // Poll for updates if status is processing
        if (data.status === 'processing') {
          pollForUpdates(id);
        }
      } catch (error) {
        showToast(error.message || 'Failed to load contract', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  const pollForUpdates = async (contractId) => {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = async () => {
      try {
        const data = await api.getContract(contractId);
        if (data.analysis && data.analysis.risk_score !== undefined) {
          setContract(data);
          setLoading(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 2000); // Poll every 2 seconds
        } else {
          showToast('Analysis is taking longer than expected. Please refresh the page.', 'error');
          setLoading(false);
        }
      } catch (error) {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 2000);
        } else {
          showToast('Failed to fetch analysis results', 'error');
          setLoading(false);
        }
      }
    };

    setTimeout(poll, 2000);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleExportError = (error) => {
    showToast(error, 'error');
  };

  if (loading) {
    return (
      <div className="card text-center">
        <div className="loading" style={{ margin: '2rem auto' }}></div>
        <p className="text-muted">Analyzing contract...</p>
      </div>
    );
  }

  if (!contract || !contract.analysis) {
    return (
      <div className="card">
        <p className="text-muted">Contract not found or analysis not available.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Upload
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
        <button
          className="btn"
          onClick={() => navigate('/')}
          style={{ marginRight: '1rem' }}
        >
          ← Back to Upload
        </button>
        <ExportButton
          contractId={id}
          onError={handleExportError}
        />
      </div>

      {contract.file_name && (
        <div className="card mb-4">
          <h4>Uploaded File</h4>
          <p>
            <strong>File:</strong>{' '}
            {contract.file_url ? (
              <a href={contract.file_url} target="_blank" rel="noopener noreferrer">
                {contract.file_name}
              </a>
            ) : (
              contract.file_name
            )}
          </p>
        </div>
      )}

      <RiskDashboard analysis={contract.analysis} />

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

const App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main className="container" style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contracts" element={<ContractList />} />
            <Route path="/contracts/:id" element={<ContractShowPage />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
