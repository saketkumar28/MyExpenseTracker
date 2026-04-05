import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../component/layout/AuthLayout.jsx";
import Input from "../../component/Inputs/Input.jsx";
import ProfilePhotoSelector from "../../component/Inputs/ProfilePhotoSelector.jsx";
import { validateEmail } from "../../utils/helper.js";
import { axiosInstance } from "../../utils/axiosInstance.js";
import { API_PATH } from "../../utils/apiPath.js";
import { UserContext } from "../../context/UserContext.jsx";
import uploadImage from "../../utils/uploadImage.js";

const Signup = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { updateUser } = React.useContext(UserContext);

  const navigate = useNavigate();
  // Handle signup form submit
  const handleSignup = async (e) => {
    e.preventDefault();

    // Initialize errors array
    const errors = [];

    if (!validateEmail(email)) {
      errors.push("*Please enter a valid email address.");
    }
    if (!username) {
      errors.push("*Please enter your username.");
    }
    if (!password) {
      errors.push("*Please enter your password.");
    }
    if (password !== confirmPassword) {
      errors.push("*Passwords do not match.");
    }
    if (!acceptTerms) {
      errors.push("*You must accept the Terms and Conditions.");
    }

    if (errors.length > 0) {
      setError(errors[0]); // Show first error
      return;
    }

    setError("");
    // Send signup request to the server
    try {
      let profileImageUrl = null;

      if (profilePicture) {
        const imgUploadRes = await uploadImage(profilePicture);
        profileImageUrl = imgUploadRes.data.url || ""; // Assuming the response contains the image URL
      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName: username,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("accessToken", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while signing up. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <ProfilePhotoSelector
        image={profilePicture}
        setImage={setProfilePicture}
      />
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-6">
            <div>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder="yourname@mail.com"
                type="text"
              />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                placeholder="Username"
                type="text"
              />

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Enter password"
                type="password"
              />
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                placeholder="Enter confirm password"
                type="password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                className="h-4 w-4 shrink-0 bg-violet-600 hover:bg-violet-700 border-gray-300 rounded"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label
                htmlFor="accept-terms"
                className="text-slate-600 ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="/terms"
                  className="text-violet-700 font-medium hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none cursor-pointer"
            >
              Create an account
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
