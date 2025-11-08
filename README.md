# 🧠 Smart Contract Analyzer

A tool that helps Users analyze contracts by automatically summarizing clauses, obligations, and potential risks.

---

## 🚀 Purpose

Manual contract review is time-consuming and error-prone.
This app automates the process by extracting text from uploaded PDFs, identifying key clauses, and generating a risk analysis report—helping users make informed decisions faster.

---

## ✨ Core Features

- 📄 **Upload PDF** — Extracts and processes contract text.
- 🔍 **Clause Detection** — AI identifies sections like **termination**, **payment**, **confidentiality**, and **liability**.
- ⚖️ **Risk Scoring Dashboard** — Visualizes overall risk and clause severity.
- 📑 **PDF Export** — Exports AI summaries and risk reports as professional PDFs.

---

## 🧰 Tech Stack

- **Backend:** Ruby on Rails
- **Database:** PostgreSQL + `pgvector` (for embeddings)
- **AI Integration:** OpenAI API
- **File Handling:** Cloudinary

---

---

## 🚀 Getting Started

### Prerequisites
- Ruby 3.2+
- Rails 7+
- PostgreSQL

### Installation
```bash
# Clone the repo
git clone https://github.com/yourusername/centsible.git
cd centsible

# Install dependencies
bundle install

# Setup the database
rails db:create db:migrate db:seed

# Run the app
bin/dev
```

Then open http://localhost:3000 🎉

---

