🧾 Credalyze — Full-Stack Assignment (MERN)

A full-stack web application that processes Experian soft credit pull XML files, extracts key financial data, stores it in MongoDB, and displays a clean, insightful report via a modern React frontend.

🚀 Live Links

Frontend (Vercel): https://credalyze.vercel.app/

Backend (Render): https://credalyze.onrender.com/api
 

🧩 Tech Stack
Layer	Technology
Frontend	React (Vite) + Tailwind CSS + Lucide Icons + Sonner Toasts
Backend	Node.js + Express.js
Database	MongoDB (Mongoose ODM)
File Handling	Multer
XML Parsing	xml2js
Deployment	Vercel (Frontend) + Render (Backend)
📄 Assignment Objective

Design and implement a full-stack application (MERN) that:

Accepts XML file uploads (simulating Experian soft credit pulls).

Parses and extracts key credit and account details.

Persists the extracted data to MongoDB.

Provides a frontend dashboard to display reports in a clear, intuitive format.

⚙️ Features Implemented
🖥️ Frontend (React + Tailwind)

Sleek dark-themed dashboard UI.

XML file upload interface with client-side validation (accepts only .xml).

Toast notifications for success and error handling using sonner.

Report visualization showing:

Basic Details (Name, PAN, Mobile, Score)

Summary (Total, Active, Closed Accounts, Balances)

Detailed Account Information (Bank, Account Number, Balance, Overdue, City)

Responsive Design — works seamlessly on all devices.

⚙️ Backend (Express + MongoDB)

RESTful API built with modular routes and controllers.

XML Parsing: Extracts data using xml2js from uploaded files.

Schema Design: MongoDB models structured for flexible data queries.

Error Handling:

Invalid file type → 400 Bad Request

Missing XML tags → handled gracefully

Server or DB issues → clean error messages

CORS Protection: Allows requests only from the Vercel frontend domain.

🧠 System Architecture
Frontend (React/Vercel)
        |
        ↓
Backend (Express/Render)
        |
        ↓
Database (MongoDB Atlas)

📁 Folder Structure
credalyze/
│
├── server/
│   ├── app.js
│   ├── routes/uploadRoutes.js
│   ├── controllers/xmlController.js
│   ├── models/CreditReport.js
│   ├── uploads/ (temp storage for files)
│   ├── .env
│   └── package.json
│
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── UploadPage.jsx
    │   │   └── ReportPage.jsx
    │   ├── components/ReportCard.jsx
    │   ├── lib/api.js
    │   └── App.jsx
    ├── .env
    └── package.json

🧰 Environment Variables
Backend (/server/.env)
MONGO_URI=<your_mongodb_connection_string>
CLIENT_URL=https://credalyze.vercel.app
PORT=10000

Frontend (/client/.env)
VITE_SERVER_URL=https://credalyze.onrender.com/api
 

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/upload	Uploads XML file, extracts & stores data
GET	/api/reports	Fetches all parsed reports from MongoDB

Sample Request (Upload XML):

POST /api/upload
Content-Type: multipart/form-data
file: Sagar_Ugle1.xml


Response:

{
  "success": true,
  "data": {
    "basicDetails": { "name": "John Doe", "score": 780 },
    "reportSummary": { "totalAccounts": 5, "activeAccounts": 3 },
    "accounts": [...]
  }
}

🧑‍💻 Local Setup Instructions
1. Clone Repository
git clone https://github.com/<yourusername>/creditsea.git
cd creditsea

2. Backend Setup
cd server
npm install
npm run dev

3. Frontend Setup
cd ../client
npm install
npm run dev

4. Access App

Visit → http://localhost:5173

🚀 Deployment
Frontend (Vercel)

Framework: Vite

Build Command: npm run build

Output Directory: dist

Environment Variable:
VITE_SERVER_URL=https://creditsea-api.onrender.com/api

Backend (Render)

Build Command: npm install

Start Command: node app.js

Environment Variables:

MONGO_URI

CLIENT_URL=https://credalyze.vercel.app

PORT=5000
