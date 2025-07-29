import React, { useState } from "react";
import axios from "axios";
import { baseApi } from "../../BaseApi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterSchema from "../../Schema/RegisterSchema";
import { useFormik } from "formik";

function Register() {
  

  const notify = (message) => toast(message);

  const styles = {
    container: { padding: 20, maxWidth: 360, margin: "auto" },
    form: {
      border: "1px solid #ccc",
      padding: 20,
      borderRadius: "12px",
      boxShadow: "2px 2px 2px",
       
    },
    inputGroup: { margin:10 },
    input: { padding: 8, width: "90%",borderRadius:"10px" },
    button: {
      padding: 10,
      backgroundColor: "blue",
      color: "white",
      width: "100%",
      border: "none",
      borderRadius: 4,
    },
    error: { color: "red" },
    lo: { textAlign: "center" },
  };
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
      console.log("value", value);
      axios
        .post(`${baseApi}/auth/create`, value)
        .then((resp) => {
          console.log("Respo", resp);
          notify(resp.data.message || "Registration successful!");
          navigate("/login");
        })
        .catch((e) => {
          console.log("Error Register", e);
          notify(e.rasponse.data.message || "Faild to Register!");
        });
    },
  });
  return (
    <div style={styles.container}>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <h2 style={styles.lo}>Register</h2>

        {/* {error && <p style={styles.error}>{error}</p>} */}

        <div style={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
            placeholder="Enter your username"
          />
          {formik.touched.username && formik.errors.username ? (
            <p style={{ color: "red" }}>{formik.errors.username}</p>
          ) : (
            ""
          )}
        </div>
        {}

        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email ? (
            <p style={{ color: "red" }}>{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div style={styles.inputGroup}>
          <label>Phone Number</label>
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
            style={styles.input}
            placeholder="Enter your email"
          />
          {formik.touched.phonenumber && formik.errors.phonenumber ? (
            <p style={{ color: "red" }}>{formik.errors.phonenumber}</p>
          ) : (
            ""
          )}
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password ? (
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          ) : (
            ""
          )}
        </div>

        <div style={styles.inputGroup}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={styles.input}
            placeholder="Confirm your password"
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <p style={{ color: "red" }}>{formik.errors.confirmpassword}</p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="custom_btn"
          onClick={formik.handleSubmit}
        >
          Register
        </button>

        <p style={styles.lo}>
          Already have an account?{" "}
          <Link to={"/login"} style={{ color: "blue" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
