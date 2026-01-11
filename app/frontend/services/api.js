const API_BASE_URL = '/api/v1';

class ApiService {
  async uploadContract(file, question) {
    const formData = new FormData();
    formData.append('contract[file]', file);
    formData.append('contract[question]', question || '');

    const response = await fetch(`${API_BASE_URL}/contracts`, {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': this.getCSRFToken(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.join(', ') || 'Failed to upload contract');
    }

    return response.json();
  }

  async getContract(id) {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': this.getCSRFToken(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch contract');
    }

    return response.json();
  }

  async getContracts() {
    const response = await fetch(`${API_BASE_URL}/contracts`, {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': this.getCSRFToken(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch contracts');
    }

    return response.json();
  }

  async deleteContract(id) {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': this.getCSRFToken(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete contract');
    }

    return response.json();
  }

  async getStatistics() {
    const response = await fetch(`${API_BASE_URL}/contracts/statistics`, {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': this.getCSRFToken(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch statistics');
    }

    return response.json();
  }

  async exportPDF(id) {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}/export`, {
      headers: {
        'X-CSRF-Token': this.getCSRFToken(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to export PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract_analysis_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  async exportJSON(id) {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}/export_json`, {
      headers: {
        'X-CSRF-Token': this.getCSRFToken(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to export JSON');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract_analysis_${id}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  getCSRFToken() {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.getAttribute('content') : '';
  }
}

export default new ApiService();
