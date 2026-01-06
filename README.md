# DLMCSPSE01_Project_Software_Engineering

Abstract

Farm2Kitchen is an innovative web-based platform designed to connect local organic farmers directly with conscious consumers seeking fresh, seasonal, and sustainably produced food. The core concept is to digitalize the organic food supply chain, empowering farmers and enriching the customer experience with personalization, eco impact tracking, and community engagement.  This document outlines the conception phase for the application’s development, detailing the objectives, scope, requirements, chosen methodology, system architecture, and key innovations.


1.	Introduction
Organic farming is gaining momentum globally due to increasing consumer awareness about health, sustainability, and environmental impact. However, the supply chain between organic farmers and end consumers remains inefficient and lacks transparency. Farm2kitchen addresses this gap by offering aa web-based platform for organic farmers to directly list their products, and for consumers to browse, customize, and subscribe to regular deliveries of fresh produce - all while learning about their eco-impact and the farms behind the food.

1.1	Background 
Traditional supply chains introduce inefficiencies, increase carbon emissions, and often disadvantage small-scale farmers. With Farm2Kitchen, the goal is to shorten the supply chain and make the farm-to-fork journey more transparent. The system introduces several innovations:
•	AI-powered crop forecasting based on regional demand
•	Personalized farm box customization with intelligent substitutions
•	Real-time impact tracking and gamification to boost sustainable behaviour

This application will empower farmers and consumers alike while advancing the principles of sustainability and local commerce.

3	Methodology
We are following an Agile (Scrum-inspired) development methodology. The reason for this choice includes:
•	Flexibility to integrate evolving ideas like ML forecasting and gamification.
•	Frequent review cycles for feedback from users (farmers, consumers).
•	Cross-functional task division and sprint-based releases.
Each sprint will last two weeks and deliver a potentially usable feature. Roles include:
•	Scrum Master: Ensures sprint delivery
•	Product Owner: Represents end-user interests
•	Dev Team: Handles coding, design, testing

3.1	System modules
•	Authentication Module
•	Farmer Dashboard
•	Forecasting Engine
•	Rewards Engine
•	Trace & Impact Tracker

# Farm2Kitchen 🌱🚜 (DLMCSPSE01 – Software Engineering Project)

Farm2Kitchen is a full-stack web application that supports **sustainable local food supply chains** by connecting **Farmers** and **Consumers** through a subscription-based ordering workflow. The system includes **AI-like demand forecasting**, **eco-impact tracking**, **gamification**, and **QR-code traceability**.

---

## ✅ Key Features

### Authentication & Roles (FR1)
- JWT-based login and registration
- Role-based access control:
  - **FARMER**
  - **CONSUMER**

### Farmer Module (FR2)
- Create / update / delete products
- Stock management (available quantity)
- View only their own products
- Forecast dashboard for demand prediction (all products)

### Consumer Module (FR3)
- Browse available products
- Add products to **Subscription Box**
- Update quantities / remove items from box
- Checkout subscription and create orders
- View order history

### Forecasting (FR4)
- AI-like heuristic forecast model (prototype-level ML behaviour)
- Forecast per product and forecast dashboard for all products

### Eco-Impact Tracking (FR5)
- Calculates sustainability metrics:
  - CO₂ reduction
  - distance saved
  - eco-score
- Shows metrics in dashboards

### Gamification (FR6)
- Calculates points from actions + eco score
- Assigns badges (Eco Beginner, Eco Supporter, Eco Hero)
- Visible in Consumer dashboard

### QR Traceability (FR7)
- Generate QR code for a product trace link
- Trace endpoint returns product + farmer + eco summary + forecast summary + QR data (base64)

### Docker Deployment (NFR / Deployment)
- Docker Compose provisions:
  - PostgreSQL (primary DB)
  - MongoDB (optional, reserved for logs/analytics)

---

## 🧱 Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Tailwind CSS (UI styling)

**Backend**
- Python Flask
- Flask-SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS
- python-dotenv

**Database**
- PostgreSQL (core relational data)
- MongoDB (optional placeholder for analytics/logs)

**Deployment**
- Docker + Docker Compose

---

## 📁 Project Structure

farm2kitchen/
backend/
app.py
requirements.txt
.env (local only, not committed)
venv/ (local only)
frontend/
src/
pages/
components/
App.jsx
main.jsx
package.json
docker-compose.yml


---

## ⚙️ Prerequisites

Install these before running:

- Python 3.11+
- Node.js (LTS recommended)
- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Git

---

## 🔐 Environment Variables (Backend)

Create a file: `backend/.env`

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/farm2kitchen
JWT_SECRET_KEY=change_this_to_a_strong_secret

````
🚀 How to Run the Project
✅ Option A (Recommended): Run with Docker + Local Flask + Local React
1) Start databases using Docker Compose

From project root (farm2kitchen/):
docker compose up -d

