import React, { useContext } from "react";
import { UserContext } from "../../context/userContext.js";

import Navbar from "./Navbar.jsx";
import SideMenu from "./SideMenu.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* Sidebar in separate div, always visible on lg screens */}
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main content in separate div */}
          <div className="flex-1 p-3">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
