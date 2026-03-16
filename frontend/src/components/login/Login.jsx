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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/user/login`,
        { email, password },
        { timeout: 3000 }
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
      } else if (error.request) {
        toast.error("Server not responding");
      } else {
        toast.error("An unexpected error occurred");
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
          <div className="overlay-content">
            <img src={loginImg} alt="login" />
            <h1>Institute Management App</h1>
            <p>Welcome back! Let's get to work.</p>
          </div>
        </div>

        <div className="login-right">
          <form onSubmit={submitHandler} className="login-form">
            <div className="form-header">
              <h1>Sign In</h1>
              <p>Enter your details to access your dashboard</p>
            </div>
            <hr className="form-divider" />

            <div className="input-container">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email"
                required
              />

              <div style={{ position: "relative", width: "100%" }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "14px",
                    cursor: "pointer",
                    fontSize: "18px"
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? <Circles className="loading" stroke="#ffffff" /> : "Sign In"}
            </button>
            
            <p className="auth-text">
              Don’t have an account?
              <Link className="auth-link" to="/signup">
                {" "}Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
