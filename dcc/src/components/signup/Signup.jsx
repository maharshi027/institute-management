import React, { useState } from "react";
import "./signup.css";
import signupImg from "../../assets/signupImg.jpg";

const Signup = () => {
    const [instituteName, setInstituteName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    
    const submitHandler = (event)=> {
        event.preventDefault();
        const formData = new FormData();
        formData.append('instituteName', instituteName)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('password',password )

        
        // console.log(instituteName, email, phone, password);
        axios.post('http://localhost:5174/user/signup')
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(err);
            
        })
    }

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img src={signupImg} alt="Signup" />
          <h1>Institute Management App</h1>
          <p>Learn to Earn...</p>
        </div>
        <div className="signup-right">
          <form onSubmit={submitHandler} className="signup-form" action="">
            <h1>Create Your Account</h1>
            <hr />
            <input onChange={e => {setInstituteName(e.target.value)}} type="text" placeholder="Institute Name..." />
            <input onChange={e => {setEmail(e.target.value)}} type="email" placeholder="Enter your Email" />
            <input onChange={e => {setPhone(e.target.value)}} type="text" placeholder="Enter Your Phone Number" />
            <input onChange={e => {setPassword(e.target.value)}} type="password" placeholder="Enter Password" />
            <button className="btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
