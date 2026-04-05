import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import { axiosInstance } from "../utils/axiosInstance.js";
import { API_PATH } from "../utils/apiPath.js";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (isMounted) {
          clearUser();
          setError(error);
          navigate("/login");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);

  return { user, loading, error, updateUser, clearUser };
};
