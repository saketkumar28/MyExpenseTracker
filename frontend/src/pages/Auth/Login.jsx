import React, { useContext, useState } from 'react';
import AuthLayout from '../../component/layout/AuthLayout';
import Input from '../../component/Inputs/Input';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import { axiosInstance } from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Use correct case for updateUser (not UpdateUser)
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("*Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("*Please enter your password.");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred while logging in. Please try again later.");
      }
      console.log(error); // For debugging
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="yourname@mail.com"
          type="text"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter password"
          type="password"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none cursor-pointer">
          Login
        </button>
        <p className="text-sm mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;