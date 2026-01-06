# DLMCSPSE01_Project_Software_Engineering


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

```env
docker compose up -d
```
Check containers:
```env
docker ps
````
You should see:
- farm2kitchen_postgres
- farm2kitchen_mongo (optional)
```
2) Run Backend (Flask)
```
Open terminal in:

```env

cd backend

```
Create venv (first time only):
```env
python -m venv venv

```
Activate venv:

Windows (PowerShell):
```env
venv\Scripts\Activate

```
Install dependencies:
```env
pip install -r requirements.txt

```
Initialize DB tables:
```env
flask --app app.py init-db

```
Run backend:

```env
python app.py

```
Backend runs at:

- http://127.0.0.1:5000

Health endpoint:

- http://127.0.0.1:5000/health

```
3) Run Frontend (React)
```

Open terminal in:

```env

cd frontend
```
Install dependencies:
```env
npm install
```
Run dev server:
```env
npm run dev
```
Frontend runs at:

- http://localhost:5173
````
##✅ Option B: Run without Docker (Local PostgreSQL)
```
1. Install PostgreSQL locally

2. Create a database (example): farm2kitchen

3. Update backend/.env with your local DB credentials

4. Run backend + frontend using the same commands as above

---
##🔑 Default Workflow (How the System Works)
```env
1. Farmer Flow

2. Register as FARMER

3. Login → receives JWT token

4. Create products with stock and price

5. View products list

6. Open forecast dashboard → view predicted demand for all products
```
Use QR traceability (share trace link)
```env
1. Consumer Flow

2.Register as CONSUMER

3.Login → receives JWT token

4. Browse products

5. Add products to subscription box

6. Update/remove items in box

7. Checkout → creates an order

8. View orders history

9. See eco-impact + gamification score in dashboard
