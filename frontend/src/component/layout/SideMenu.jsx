import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import CharAvatar from "../Cards/CharAvatar.jsx";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route, label) => {
    if (label.toLowerCase() === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 p-6 sticky top-[64px] z-20 shadow-sm flex flex-col items-center">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        {!user && user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-md"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName || "Guest"}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="mt-4 text-gray-800 font-semibold text-lg capitalize text-center">
          {user?.fullName || "Guest"}
        </h5>
      </div>

      {/* Menu Buttons */}
      <div className="w-full flex flex-col">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 py-3 px-5 rounded-md mb-2 transition 
              ${
                activeMenu === item.label
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
            onClick={() => handleClick(item.path, item.label)}
          >
            <item.icon
              className={`text-xl ${activeMenu === item.label ? "text-white" : "text-primary"}`}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
