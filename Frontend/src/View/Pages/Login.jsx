import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginSchema from "../../Schema/LoginShema";
import { useFormik } from "formik";
import { baseApi } from "../../BaseApi";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { UserContext } from "../../UserContext";
 
function Login() {
  const {setUser} = useContext(UserContext)
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const styles = {
    container: { padding: 20 },
    form: {
      border: "1px solid #ccc",
      padding: 20,
      borderRadius: 15,
      boxShadow: "2px 2px 2px",
    },
    inputGroup: { margin: 10 },
    input: { padding: 8, width: "100%",borderRadius:"10px" },
    button: {
      padding: 10,
      backgroundColor: "blue",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    error: { color: "red" },
    lo: { textAlign: "center" },
  };

  const initialValues = { email: "", password: "" };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (value) => {
      console.log("login value", value);
      await axios
        .post(`${baseApi}/auth/login`, value,{withCredentials:true})
        .then((resp) => {
          console.log("response", resp);
          if (resp.status === 200) {
            const { token } = resp.data;
            Cookies.set("adminToken",token)
            const decode = jwtDecode(token);
            console.log("token",decode)
            setUser(decode)
            // notify("Login Successfully");
          //   if (decode.role === "USER") {
          //     localStorage.setItem("userToken", token);
          //     navigate("/home");
          //     // window.location.reload();
          //   }
            if (decode.role === "ADMIN") {
               
              navigate("/admin");
              notify("Login Successfully");
              
            }
          }
        })
        .catch((e) => {
          console.log("Error loGin ", e);
        });
    },
  }
);

  return (
    <div style={{ margin: "auto", maxWidth: 350 }}>
      <ToastContainer />
      <div style={styles.container}>
        <form onSubmit={Formik.handleSubmit} style={styles.form}>
          <h2 style={styles.lo}>Login</h2>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              style={styles.input}
              placeholder="Enter your email"
            />
            {Formik.touched.email && Formik.errors.email ? (
              <p style={{ color: "red" }}>{Formik.errors.email}</p>
            ) : (
              ""
            )}
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              style={styles.input}
              placeholder="Enter your password"
            />
            {Formik.touched.password && Formik.errors.password ? (
              <p style={{ color: "red" }}>{Formik.errors.password}</p>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="custom_btn">
            Login
          </button>

          <p style={{ marginTop: 10 }}>
            Don't have an account?{" "}
            <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
