import React, { useState } from 'react';
import api from '../../services/api';

const UploadForm = ({ onUploadSuccess, onError }) => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      onError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    
    try {
      const result = await api.uploadContract(file, question);
      onUploadSuccess(result.id);
    } catch (error) {
      onError(error.message || 'Failed to upload contract');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-center mb-4">Smart Contract Analyzer</h2>
      <p className="text-center text-muted mb-4">
        Upload a PDF contract to analyze clauses, obligations, and potential risks
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Upload Contract (PDF, Image)</label>
          <div
            className={`file-upload ${isDragging ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            {fileName ? (
              <div>
                <p><strong>{fileName}</strong></p>
                <p className="text-muted">Click to change file</p>
              </div>
            ) : (
              <div>
                <p>Drag and drop your file here</p>
                <p className="text-muted">or click to browse</p>
              </div>
            )}
          </div>
          <input
            id="file-input"
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="question" className="form-label">
            Question (Optional)
          </label>
          <textarea
            id="question"
            className="form-control"
            placeholder="Ask anything about the document..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="4"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <>
                <span className="loading"></span>
                <span style={{ marginLeft: '0.5rem' }}>Analyzing...</span>
              </>
            ) : (
              'Analyze Contract'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
