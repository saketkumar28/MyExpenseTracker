import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import Income from "./pages/Dashboard/Income.jsx";
import Expense from "./pages/Dashboard/Expense.jsx";
import UserProvider from "./context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Changed from 'token' to 'accessToken'
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Changed from 'token' to 'accessToken'
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/income"
              element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expense"
              element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
