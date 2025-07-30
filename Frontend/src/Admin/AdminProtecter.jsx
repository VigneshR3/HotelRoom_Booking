import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../BaseApi";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AdminProtecter = ({ children }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("adminToken");

    if (!token) {
      setIsCheck(true);  // Still need to finish check
      return;
    }

    axios
      .get(`${baseApi}/auth/is-admin`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setIsAdmin(true)
          
        }
      })
      .catch((e) => {
        console.log("Auth Error:", e);
        setIsAdmin(false);
      })
      .finally(() => {
        setIsCheck(true);
      });
  }, []);

  if (!isCheck) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};
