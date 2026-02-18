🚀 Support Ticket System

A full-stack Support Ticket Management System built with modern production-ready tools.

This project demonstrates backend API design, database-level aggregation, filtering, LLM integration, and containerized deployment.

🏗️ Tech Stack
Backend

Python 3.12

Django 6

Django REST Framework

PostgreSQL

OpenAI API (LLM Classification)

Frontend

React (Vite)

Modern UI (Dark professional layout)

DevOps

Docker

Docker Compose

Git & GitHub

✨ Features
🎫 Ticket Management

Create ticket

List tickets

Update ticket (PATCH)

Delete ticket

🔎 Filtering & Search

Filter by:

Category

Priority

Status

Search by:

Title

Description

📊 Statistics Endpoint

Database-level aggregation using Django ORM:

Total tickets

Open tickets

Average tickets per day

Priority breakdown

Category breakdown

🤖 LLM Classification

Uses OpenAI API to:

Suggest ticket category

Suggest ticket priority

📁 Project Structure
Support-Ticket-System/
│
├── backend/
│ ├── tickets/
│ ├── requirements.txt
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ ├── package.json
│ └── Dockerfile
│
├── docker-compose.yml
├── README.md
└── .gitignore

🐳 Run With Docker (Recommended)
1️⃣ Build containers
docker-compose build

2️⃣ Start application
docker-compose up

3️⃣ Access the app

Frontend:
👉 http://localhost:5173

Backend API:
👉 http://localhost:8000/api/tickets/

🔌 API Endpoints
Method Endpoint Description
GET /api/tickets/ List all tickets
POST /api/tickets/ Create ticket
PATCH /api/tickets/{id}/ Update ticket
DELETE /api/tickets/{id}/ Delete ticket
GET /api/tickets/stats/ Ticket statistics
POST /api/tickets/classify/ LLM classification
📊 Example Ticket JSON
{
"title": "Payment Failed",
"description": "My payment is not processing",
"category": "billing",
"priority": "high",
"status": "open"
}

🧠 LLM Classification Example

POST request to:

/api/tickets/classify/

Body:

{
"description": "My account is locked and I cannot login"
}

Response:

{
"suggested_category": "account",
"suggested_priority": "high"
}

🛠️ Environment Variables

Backend requires:

LLM_API_KEY=your_openai_api_key

Set inside:

.env

or Docker environment

🏆 What This Project Demonstrates

Clean REST API design

Database-level aggregation (no Python loops)

Proper error handling (frontend + backend)

Dockerized full-stack setup

LLM integration in real application

Production-style architecture

🎯 Why This Project Is Strong For Interviews

This project shows:

Full-stack capability

API development with DRF

PostgreSQL integration

Real-world filtering and search

AI integration (LLM-based classification)

DevOps understanding with Docker

GitHub workflow

📌 Future Improvements

Authentication (JWT)

Role-based access control

Swagger API documentation

Deployment to cloud (Render / Railway / AWS)

Frontend UI framework (Material UI / Tailwind)

👨‍💻 Author

Rakesh
Full Stack Developer
GitHub: https://github.com/KatravathRakesh
