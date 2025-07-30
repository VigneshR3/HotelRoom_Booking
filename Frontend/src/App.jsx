import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Admin/Layout";
import Dhashboard from "./Admin/Pages/Dhashboard";
import HotelRooms from "./Admin/Pages/HotelRooms";
import NotPage from "./Admin/Pages/NotPage";
import ViewLayout from "./View/Pages/Layout";
import Login from "./View/Pages/Login";
import Register from "./View/Pages/Register";
import { AdminProtecter } from "./Admin/AdminProtecter";
import Home from "./View/Pages/Home";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./UserContext";

function App() {
  const [User, setUser] = useState({});

  useEffect(() => {
    const token = Cookies.get("adminToken") || "";
    try {
      if (token) {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUser(decoded);
      }
    } catch (error) {
      console.error("Token decode error:", error);
    }
  }, []); // ← run only once on mount

  return (
    <UserContext.Provider value={{User,setUser}}>

    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtecter>
              <Layout />
            </AdminProtecter>
          }
        >
          <Route index element={<Dhashboard />} />
          <Route path="hotel" element={<HotelRooms />} />
          <Route path="*" element={<NotPage />} />
        </Route>

        {/* Public/View Routes */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}


export default App;
