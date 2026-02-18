# 🎫 Support Ticket System

A full-stack Support Ticket Management System built using:

- Django REST Framework (Backend)
- React + Vite (Frontend)
- PostgreSQL (Database)
- OpenAI LLM Integration (Auto Classification)
- Docker & Docker Compose

This project demonstrates full-stack development, REST API design, database aggregation, filtering, and AI-powered ticket classification.

---

## 🚀 Features

### ✅ Ticket Management

- Create ticket
- List tickets
- Update ticket (PUT / PATCH)
- Delete ticket

### ✅ Filtering & Search

- Filter by category
- Filter by priority
- Filter by status
- Search by title and description

### ✅ Statistics Endpoint

- Total tickets
- Open tickets count
- Average tickets per day
- Priority breakdown
- Category breakdown

### ✅ LLM Auto Classification

- Automatically suggests:
  - Category (billing, technical, account, general)
  - Priority (low, medium, high, critical)

### ✅ Dockerized Setup

- Multi-container setup:
  - Backend
  - Frontend
  - PostgreSQL

---

## 🛠 Tech Stack

Backend:

- Python 3.12
- Django 6
- Django REST Framework
- PostgreSQL 15

Frontend:

- React
- Vite

AI:

- OpenAI API (gpt-4o-mini)

DevOps:

- Docker
- Docker Compose

---

## 📂 Project Structure
