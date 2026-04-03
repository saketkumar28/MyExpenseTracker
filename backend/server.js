require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashBoardRoutes"); 
const expenseRoutes = require("./routes/expenseRoutes");     
const incomeRoutes = require("./routes/incomeRoutes");       

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

// ✅ Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/expense", expenseRoutes);  
app.use("/api/v1/income", incomeRoutes);   

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;