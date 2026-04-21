import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import CEBLogo from "../assets/pention/ceb_logo_remove.png";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ clear session / local storage
    localStorage.removeItem("userData");

    // ✅ redirect without full page reload
    navigate("/pentionId", { replace: true }); // Redirect to login
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-red-900 text-yellow-400 text-sm flex justify-end gap-5 px-4 py-1 z-50">
        <a href="#" className="hover:underline">ENGLISH</a> | 
        <a href="#" className="hover:underline">සිංහල</a> | 
        <a href="#" className="hover:underline">தமிழ்</a>
      </div>

      {/* Main Bar */}
      <div className="fixed top-6 left-0 w-full flex justify-between items-center bg-white bg-opacity-40 backdrop-blur-lg shadow-xl border-b border-white border-opacity-20 px-6 py-3 z-40 rounded-b-xl">
        
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={CEBLogo} alt="CEB Logo" className="w-14 h-14"/>
          <div className="text-black">
            <p className="text-lg font-bold">ලංකා විදුලිබල මණ්ඩලය</p>
            <p className="text-sm font-semibold text-gray-800">CEYLON ELECTRICITY BOARD</p>
          </div>
        </div>

        {/* Navigation + Logout */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a href="#" className="p-2 rounded-full hover:bg-yellow-400 hover:text-white transition-all duration-300">
              <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home" className="w-7 h-7"/>
            </a>
            <a href="#" className="relative font-semibold text-gray-900 hover:text-yellow-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-yellow-400 after:w-0 hover:after:w-full transition-all duration-300">
              PROCUREMENT
            </a>
            <a href="#" className="relative font-semibold text-gray-900 hover:text-yellow-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-yellow-400 after:w-0 hover:after:w-full transition-all duration-300">
              CAREERS
            </a>
            <a href="#" className="relative font-semibold text-gray-900 hover:text-yellow-400 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-yellow-400 after:w-0 hover:after:w-full transition-all duration-300">
              CONTACT US
            </a>

            {/* Search Input (inline) */}
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setShowSearch(true)}
              onMouseLeave={() => setShowSearch(false)}
            >
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 px-3 py-1 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 mr-2"
                  autoFocus
                />
              )}
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="Search"
                className="w-7 h-7 cursor-pointer p-1 rounded-full hover:bg-yellow-400 hover:text-white transition-all duration-300"
              />
            </div>
          </nav>

          {/* ✅ Logout Button (no form) */}
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-900 text-sm text-white font-bold py-1 px-4 rounded-xl hover:bg-red-800 transition duration-300 shadow-lg hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
