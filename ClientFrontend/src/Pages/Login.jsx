import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginSchema from "../Schema/LoginShema";
import { useFormik } from "formik";
import { baseApi } from "../BaseApi";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
// import { UserContext } from "../../UserContext";
// import AppBar from "../../Admin/Components/Appbar";
// import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { MyBookingContext } from "../MyBookingContext";

function Login() {
  const { setUser, setForm } = useContext(MyBookingContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //   useEffect(() => {
  //   toast("Test Toast! 🚀");
  // }, []);
  const notify = (m) =>
    toast.success(m, {
      position: "top-right",
      autoClose: 2000,
    });

  const initialValues = { email: "", password: "" };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (value) => {
      try {
        const resp = await axios.post(`${baseApi}/auth/login`, value, {
          withCredentials: true,
        });
        console.log("login", resp);
        if (resp.status === 200) {
          const { token } = resp.data;
          const decode = jwtDecode(token);
          if (decode.role === "ADMIN") {
            setUser(decode);
            notify("Login Successfully");
            setTimeout(() => navigate("/admin"), 1000);
          }
          if (decode.role === "USER") {
            Cookies.set("userToken", token);
            setUser(decode);
            setForm((pre) => ({ ...pre, email: decode.email }));
            setForm((pre) => ({ ...pre, userid: decode.id }));
            notify("Login Successfully");
            setTimeout(() => navigate("/"), 1000);
          }
        }
      } catch (e) {
        console.log("Login Error", e);
        setError("Invalid email or password");
      }
    },
  });

  return (
    <>
      {/* <AppBar /> */}
      <div className="flex  justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 ">
        <div
          className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg backdrop-blur-lg"
          style={{ maxHeight: 400, marginTop: 10 }}
        >
          {/* <ToastContainer /> */}
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={Formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={Formik.values.email}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
              {Formik.touched.email && Formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {Formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              {Formik.touched.password && Formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {Formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
