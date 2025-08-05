import React, { useState } from "react";
import axios from "axios";
import { baseApi } from "../BaseApi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterSchema from "../Schema/RegisterSchema";
import { useFormik } from "formik";

function Register() {
  const notify = (message) => toast(message);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (value) => {
      axios
        .post(`${baseApi}/auth/create`, value)
        .then((resp) => {
          notify(resp.data.message || "Registration successful!");
          navigate("/login");
        })
        .catch((e) => {
          notify(
            e?.response?.data?.message || "Failed to Register!"
          );
        });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Register</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="number"
            name="phonenumber"
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your phone number"
          />
          {formik.touched.phonenumber && formik.errors.phonenumber && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.phonenumber}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm your password"
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.confirmpassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
