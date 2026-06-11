# Dynamic Form Builder (MERN Stack)

## 🚀 Overview
This is a full-stack Dynamic Form Builder application built using React and Express.js.  
It allows users to create dynamic forms, submit responses, and view analytics in real-time.

---

## 🧠 Architecture

Frontend (React)
        ↓
REST API (Express.js)
        ↓
MongoDB Database

---

## ⚙️ Tech Stack

- Frontend: React (JavaScript)
- Backend: Node.js + Express.js
- Database: MongoDB (Local Server)
- Charts: Recharts
- State: React Hooks + Local Storage

---

## 📊 Features

### Admin Side
- Create dynamic forms
- Add text, number, select fields
- Save form schema
- Generate shareable form link

### Public Side
- Dynamic form rendering
- Input validation
- Form submission

### Analytics
- Total submissions
- Select field distribution
- Average values for numeric fields
- Pie & Bar charts

---

## 🔄 Data Flow

1. Admin creates form
2. Form schema saved in MongoDB
3. User opens form via unique URL
4. User submits response
5. Response stored in DB
6. Analytics computed dynamically
7. Dashboard shows charts

---

## 📦 Installation

### Backend


cd backend
npm install
npm start

### Frontend

cd frontend
npm install
npm run dev


---

## 🌐 API Endpoints

- POST /api/forms → create form
- GET /api/forms → get all forms
- GET /api/forms/:id → get form
- POST /api/responses → submit response
- GET /api/analytics/:id → get analytics

---




Example:
- Form Builder UI
- Dynamic Form Page
- Analytics Dashboard

---

## 🚀 Deployment

Frontend: https://your-frontend-link.com  
Backend: https://your-backend-link.com  

---

## 👨‍💻 Author

Built for Full Stack Developer Assignment (React + Express)
