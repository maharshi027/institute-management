import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import signupImg from "../../assets/signupImg.jpg";
import {Circles} from "react-loading-icons";

const Signup = () => {
  const [instituteName, setInstituteName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("instituteName", instituteName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      const res = await axios.post(
        "http://localhost:4000/user/signup",
        formData
      );

      console.log(res.data);

      // Reset fields
      setInstituteName("");
      setEmail("");
      setPhone("");
      setPassword("");

    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img src={signupImg} alt="Signup" />
          <h1>Institute Management App </h1>
          <p>Learn to Earn...</p>
        </div>

        <div className="signup-right">
          <form onSubmit={submitHandler} className="signup-form">
            <h1>Create Your Account</h1>
            <hr />

            <input
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              type="text"
              placeholder="Institute Name..."
              required
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your Email"
              required
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Enter Your Phone Number"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              required
            />

            <button className="btn" type="submit">
              {loading && <Circles className="loading"/>} submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
