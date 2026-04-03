import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/userContext';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Changed from 'token' to 'accessToken'
  return isAuthenticated ? children : <Navigate to="/login" />;
};


const Root = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Changed from 'token' to 'accessToken'
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (<Navigate to="/login" />)
};

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/income' element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            } />
            <Route path='/expense' element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App;
