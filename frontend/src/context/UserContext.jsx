import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        // console.log('Initial user from storage:', storedUser);
        try {
            if (!storedUser || storedUser === "undefined") return null; // ✅ skip invalid string
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Failed to parse user from localStorage:', error);
            return null;
        }
    });

    const updateUser = (userData) => {
        try {
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            if (userData.token) {
                localStorage.setItem("accessToken", userData.token); // ✅ store token separately for axios
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    const clearUser = () => {
        try {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken"); // ✅ remove token when clearing user
        } catch (error) {
            console.error('Error clearing user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;