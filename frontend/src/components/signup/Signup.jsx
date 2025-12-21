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
    const formData = new FormData();
    formData.append("instituteName", instituteName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      const res = await axios.post(
        "https://institute-management-backend-oxl8.onrender.com/user/signup",
        formData
      );
      setLoading(false);
      toast.success("Congrats ! Registred succeefully...");
      navigate("/login");
      console.log(res.data);

      // Reset fields
      setInstituteName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      setLoading(true);
      toast.error("Something went wrong...");
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
              placeholder="Institution Name..."
              list="institutions"
              required
            />

            <datalist id="institutions">
              <option value="Dinesh Chemistry Classes" />
              <option value="Vikas Maths Classes" />
              <option value="Balram Physics Classes" />
              <option value="Arvind Biology CLasses" />
              <option value="Chandresh Chemistry Classes" />
              <option value="JK Chemistry Classes" />
              <option value="Ravindra Biology Classes" />
            </datalist>
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
              {loading && <Circles className="loading" />} submit
            </button>
            <Link className="link" to="/login">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
