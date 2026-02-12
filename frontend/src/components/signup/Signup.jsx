import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import signupImg from "../../assets/inst.webp";
import { Circles } from "react-loading-icons";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [instituteName, setInstituteName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/user/signup`,
        {
          instituteName,
          email,
          phone,
          password,
        },
        { timeout: 5000 }
      );

      toast.success("Congrats! Registered successfully...");
      navigate("/login");

      setInstituteName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || "Signup failed");
      } else if (error.code === "ECONNABORTED") {
        toast.error("Server is taking too long to respond");
      } else {
        toast.error("Only for admins or Paid users...");
        setInstituteName("");
        setEmail("");
        setPhone("");
        setPassword("");
      }

      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <div className="overlay-content">
             <img src={signupImg} alt="Signup" />
             <h1>Institute Management App</h1>
             <p>Learn to Earn...</p>
          </div>
        </div>

        <div className="signup-right">
          <form onSubmit={submitHandler} className="signup-form">
            <div className="form-header">
              <h1>Create Your Account</h1>
              <p>Join our community today</p>
            </div>
            
            <div className="input-container">
              <input
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                type="text"
                placeholder="Institution Name"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Phone Number"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? <Circles className="loading" stroke="#ffffff" /> : "Create Account"}
            </button>

            <p className="auth-text">
              Already have an account?
              <Link className="auth-link" to="/login"> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
