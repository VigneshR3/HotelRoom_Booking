import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';

const Avater = () => {
  const { User } = useContext(UserContext);
  const { username } = User;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const NameInitial = username?.charAt(0).toUpperCase() || "?";
    const notify = () => toast("Wow so easy!");
  const handleLogout = () => {
    Cookies.remove("adminToken");
    navigate("/");
    notify("Logout Successfully")
  };

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Circle */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer bg-blue-500 text-white font-semibold rounded-full w-10 h-10 flex items-center justify-center border-2 border-blue-700"
        title={username}
      >
        {NameInitial}
      </div>
<ToastContainer />
      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            Hello, <strong>{username}</strong>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avater;
