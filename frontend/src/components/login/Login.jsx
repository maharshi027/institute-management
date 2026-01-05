import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import loginImg from "../../assets/inst.webp";
import { Circles } from "react-loading-icons";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_BACKEND_URL}/user/login`,
      { email, password },
      { timeout: 5000 }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("instituteName", res.data.instituteName);
    localStorage.setItem("email", res.data.email);

    toast.success("Welcome Back!");
    navigate("/dashboard");

    setEmail("");
    setPassword("");

  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error || "Invalid credentials");
    } else if (error.code === "ECONNABORTED") {
      toast.error("Server is taking too long to respond");
    } else {
      toast.error("Something went wrong");
    }

    console.error("Login Error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-left">
          <img src={loginImg} alt="login" />
          <h1>Institute Management App</h1>
          <p>Learn to Earn...</p>
        </div>

        <div className="login-right">
          <form onSubmit={submitHandler} className="login-form">
            <h1>Login With Your Account</h1>
            <hr />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your Email"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              required
            />

            <button className="btn" type="submit" disabled={loading}>
              {loading ? <Circles className="loading" /> : "Submit"}
            </button>
            <Link className="link" to="/signup">
              Create Your Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
