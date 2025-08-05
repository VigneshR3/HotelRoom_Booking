import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
 
 
 
 
 
 
 
 
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
 
import { MyBookingContext } from "./MyBookingContext";
import ViewLayout from "./Pages/ViewLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import HotelDetails from "./Pages/HotelDetails";
import BookingConfirmForm from "./Pages/BookingConfirmForm";
import Register from "./Pages/Register";
 
 

function App() {
  const [User, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
    email:"",
    startdate: "",
    enddate: "",
    roomtype: "single",
    withpats: false,
    adults: 2,
    children: 0,
    rooms: 1,
    hotel:"",
    location:"",
    price:"",
    hotelid:"",
    userid:""
  });
  // adults: 2,
  //   children: 0,
  //   rooms: 1,
  //   withpats: false,
  //   startdate: "",
  //   enddate: "",
  
  useEffect(() => {
    const token = Cookies.get("userToken") || "";
    try {
      if (token) {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUser(decoded);
        setForm(pre=>({...pre,email:decoded.email}))
        setForm(pre=>({...pre,userid:decoded.id}))
      }
    } catch (error) {
      console.error("Token decode error:", error);
    }
  }, []); // ← run only once on mount

  return (
    <MyBookingContext.Provider value={{ User, setUser,form ,setForm }}>
      <BrowserRouter>
        <Routes>
           
          
          <Route path="/" element={<ViewLayout/>}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/:id" element={<HotelDetails />} />
            <Route path="/booking/:id" element={<BookingConfirmForm/>} />
          </Route>

          {/* Public/View Routes */}
        </Routes>
      </BrowserRouter>
    </MyBookingContext.Provider>
  );
}

export default App;
