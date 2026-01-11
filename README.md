# 🧠 Smart Contract Analyzer

A powerful AI-powered tool that helps users analyze contracts by automatically summarizing clauses, obligations, and potential risks.

---

## 🚀 Purpose

Manual contract review is time-consuming and error-prone.
This app automates the process by extracting text from uploaded PDFs, identifying key clauses, and generating a comprehensive risk analysis report—helping users make informed decisions faster.

---

## ✨ Core Features

- 📄 **Upload PDF/Images** — Drag-and-drop interface for uploading contract documents
- 🔍 **AI-Powered Clause Detection** — Automatically identifies sections like **termination**, **payment**, **confidentiality**, **liability**, **governing law**, **intellectual property**, and **dispute resolution**
- ⚖️ **Risk Scoring Dashboard** — Visualizes overall risk score (0-100) and categorizes risks by severity:
  - 🔴 **Critical Risks** — Major exposure areas requiring immediate attention
  - 🟡 **Moderate Risks** — Clauses needing negotiation
  - 🟢 **Low Risks** — Standard clauses with minor impact
- 📊 **Contract History** — View all analyzed contracts in one place
- 🗑️ **Delete Contracts** — Manage your contract library
- 📈 **Analytics Dashboard** — View statistics across all analyzed contracts
- 📑 **Multiple Export Options** — Export analysis reports as PDF or JSON
- 💬 **Custom Questions** — Ask specific questions about your contract
- ⏱️ **Real-time Processing** — Live updates during analysis

---

## 🧰 Tech Stack

- **Backend:** Ruby on Rails 7+
- **Frontend:** React 19 with React Router
- **Database:** PostgreSQL
- **AI Integration:** Gemini 2.5 Flash (via RubyLLM)
- **File Handling:** Active Storage
- **PDF Processing:** pdf-reader gem
- **PDF Generation:** Prawn gem
- **Styling:** SCSS with custom theme

---

## 🚀 Getting Started

### Prerequisites
- Ruby 3.2+
- Rails 7+
- PostgreSQL
- Node.js 18+ (for frontend dependencies)

### Installation
```bash
# Clone the repo
git clone https://github.com/yourusername/Smart-Contract-Analyzer
cd Smart-Contract-Analyzer

# Install Ruby dependencies
bundle install

# Install JavaScript dependencies
npm install

# Setup the database
rails db:create db:migrate db:seed

# Run the app (starts both Rails server and Vite dev server)
bin/dev
```

Then open http://localhost:3000 🎉

---

## 📖 Usage Guide

### 1. Upload a Contract
- Navigate to the home page
- Drag and drop a PDF or image file, or click to browse
- Optionally add a custom question about the contract
- Click "Analyze Contract" to start the analysis

### 2. View Analysis Results
- After upload, you'll be redirected to the analysis page
- View the overall risk score (0-100, lower = higher risk)
- Review categorized risks (Critical, Moderate, Low)
- Read the AI-generated summary

### 3. Export Reports
- Click "Export PDF" to download a formatted PDF report
- Click "Export JSON" to download raw data in JSON format

### 4. Manage Contracts
- Click "History" in the navigation to view all contracts
- Click on any contract to view its analysis
- Delete contracts you no longer need

### 5. View Statistics
- Click "Statistics" in the navigation
- View overall analytics including:
  - Total contracts analyzed
  - Average risk score
  - Total risks by category

---

## 🎯 API Endpoints

### Contracts API (`/api/v1/contracts`)

- `GET /api/v1/contracts` - List all contracts
- `POST /api/v1/contracts` - Upload and analyze a new contract
- `GET /api/v1/contracts/:id` - Get contract details and analysis
- `DELETE /api/v1/contracts/:id` - Delete a contract
- `GET /api/v1/contracts/:id/export` - Export PDF report
- `GET /api/v1/contracts/:id/export_json` - Export JSON data
- `GET /api/v1/contracts/statistics` - Get analytics statistics

---

## 🔧 Configuration

### Environment Variables

**⚠️ SECURITY WARNING: Never commit `.env` files or API keys to version control!**

Create a `.env` file in the root directory with the following variables:

```bash
# Required: Gemini API Key for contract analysis
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Cloudinary URL for file storage (defaults to local storage in development)
# Format: cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_URL=your_cloudinary_url_here

# Production: Database password
SMART_CONTRACT_ANALYZER_DATABASE_PASSWORD=your_database_password_here

# Production: Rails Master Key (or use config/master.key file)
RAILS_MASTER_KEY=your_master_key_here
```

The application will automatically load these environment variables. The `.env` file is already included in `.gitignore` to prevent accidental commits.

**For Production:**
- Use environment variables or Rails encrypted credentials (`bin/rails credentials:edit`)
- Never hardcode secrets in your code
- Ensure `config/master.key` is never committed (already in `.gitignore`)

---

## 🔒 Security

### Security Best Practices

1. **API Keys & Secrets**
   - ✅ Never commit `.env` files or API keys to version control
   - ✅ Use environment variables for all sensitive configuration
   - ✅ Use Rails encrypted credentials for production secrets (`bin/rails credentials:edit`)
   - ✅ Rotate API keys immediately if exposed

2. **Error Handling**
   - ✅ Error messages don't expose sensitive information in production
   - ✅ Sensitive parameters are filtered from logs

3. **File Uploads**
   - ✅ File type validation (PDF, JPEG, PNG only)
   - ✅ File size limits (10MB maximum)
   - ✅ File validation at model level

4. **Production Security**
   - ✅ SSL/TLS enforced (`force_ssl = true`)
   - ✅ Master key required for production
   - ✅ Error details hidden in production mode
   - ✅ Parameter filtering configured

### Security Checklist for Deployment

- [ ] Set all required environment variables
- [ ] Ensure `RAILS_MASTER_KEY` is set or `config/master.key` exists
- [ ] Verify `.env` is not tracked in git (`git ls-files | grep .env`)
- [ ] Review and rotate any exposed API keys
- [ ] Enable HTTPS/SSL in production
- [ ] Configure database credentials securely
- [ ] Review file storage configuration (local vs cloud)
- [ ] Set up proper backup strategy for uploaded files

---

## 🛠️ Development

### Running Tests
```bash
rails test
```

### Code Style
The project follows Ruby and JavaScript best practices. Use standard linting tools.

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues and questions, please open an issue on GitHub.

---
