A full-stack personal finance management web application to track income, expenses, and visualize spending patterns. Built with modern technologies for a seamless user experience.

<img width="1432" height="783" alt="Screenshot 2026-04-04 at 1 41 57 AM" src="https://github.com/user-attachments/assets/22a30257-63c4-4dcd-a00c-1c4fc90fc2c9" />

<img width="1440" height="538" alt="Screenshot 2026-04-04 at 1 42 32 AM" src="https://github.com/user-attachments/assets/147d0cb8-0a31-4c02-b01c-8ddcc8b93c65" />

✨ Features
🔐 Authentication & Security
    - User registration with profile photo upload
    - JWT-based authentication
    - Protected routes and persistent sessions
    - Secure password handling

📊 Dashboard & Analytics
    Real-time Overview — Total balance, income, and expense summaries
    Visual Analytics — Interactive pie charts and bar graphs
    Recent Activity — Quick view of latest transactions
    30-Day Trends — Bar chart tracking monthly expense patterns

💰 Income Management
    Add and categorize income entries
    Visual bar chart overview
    Export data to Excel
    Delete and manage records

💸 Expense Tracking
    Category-based expense organization
    Comprehensive expense overview
    Bar chart visualization
    Excel export functionality

👤 User Experience

  Customizable user profiles with avatars
  Initials-based fallback avatars
  Responsive design for all devices
  Collapsible sidebar navigation

  
🛠️ Tech Stack
  Frontend: React 18, Vite
  Styling: Tailwind CSS
  Routing & HTTP: React Router v6, Axios
  Extras: Recharts, Moment.js, React Icons

  Backend: Node.js, Express.js
  Database: MongoDB, Mongoose
  Auth & Security: JWT, bcrypt
  Storage: Cloudinary


🚀 Installation & Setup
1. Clone the Repository
  bashgit clone https://github.com/Tushalkumar30/expense-tracker.git
  cd expense-tracker

3. Frontend Setup
  bashcd frontend/expense-tracker
  npm install
  Create a .env file in the frontend directory (optional):
  envVITE_API_BASE_URL=http://localhost:8000/api/v1
  If using custom API URL, update src/utils/apiPath.js:
  javascriptexport const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
  Start the development server:
  bashnpm run dev
  Frontend will run at: http://localhost:5173

3. Backend Setup
bashcd backend
npm install
Create a .env file in the backend root:

npm run dev
or
node server.js

