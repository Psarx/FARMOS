# FARMOS 🌾

A smart farming assistant that combines crop recommendation, AI-powered farming guides, and wheat yellow rust disease detection.

## Architecture

| Module | Tech Stack | Port | Description |
|---|---|---|---|
| Frontend | React 19, Axios, Framer Motion | 3000 | User interface — signup, login, crop prediction, disease detection |
| Backend | Flask, PostgreSQL, scikit-learn, Hugging Face | 5001 | REST API — authentication, crop prediction, AI farming guide |
| Yellow Rust | Streamlit, TensorFlow (VGG16) | 8501 | Wheat yellow rust disease detection via image upload |

## Prerequisites

- **Node.js** (v16+) and **npm**
- **Python 3.10+**
- **PostgreSQL** (or a Neon cloud DB connection string)

## Environment Variables

Create a `backend/.env` file with the following keys:

```
HF_API_KEY=<your-huggingface-api-token>
JWT_SECRET=<your-jwt-secret>
SALT_ROUNDS=<bcrypt-salt-rounds>
SECRET_KEY=<flask-secret-key>
```

---

## Running the Project

### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

The API server starts at **http://localhost:5001**.

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

The React app starts at **http://localhost:3000** and proxies API requests to the backend.

### 3. Yellow Rust Module

```bash
cd yellowrust
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
streamlit run main.py --server.port 8501
```

The Streamlit app starts at **http://localhost:8501**.

---

## Features

- **Crop Prediction** — Recommends the best crop based on soil parameters (N, P, K, temperature, humidity, pH, rainfall).
- **AI Farming Guide** — Generates a step-by-step growing guide using Hugging Face LLMs.
- **Yellow Rust Detection** — Upload a wheat leaf image to classify disease severity into 6 levels (No disease → Susceptible) with Grad-CAM heatmap visualization.
