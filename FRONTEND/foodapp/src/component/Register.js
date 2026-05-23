import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {

  const [register, setRegister] = useState({
    uname: "",
    pass: "",
    nm: "",
    email: "",
    phno: ""
  });

  const [msg, setMsg] = useState("");

  const addData = () => {
    axios.post("http://localhost:1004/register/add", register)
      .then(() => {
        setMsg("Registration Successful ✅");
      })
     .catch((error) => {

  console.log(error);

  if (error.response && error.response.data) {
    
    const errors = error.response.data;
    let msg = "";

    if (errors.uname) msg += errors.uname + " ";
    if (errors.pass) msg += errors.pass + " ";
    if (errors.nm) msg += errors.nm + " ";
    if (errors.email) msg += errors.email + " ";
    if (errors.phno) msg += errors.phno + " ";

    setMsg(msg || "Validation failed ❌");

  } else {
    // Backend not responding / network issue
    setMsg("Server error or backend not running ❌");
  }

});
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Create Account 🚀</h2>

        <input
          type="text"
          placeholder="Username"
          value={register.uname}
          onChange={(e) => setRegister({ ...register, uname: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={register.pass}
          onChange={(e) => setRegister({ ...register, pass: e.target.value })}
        />

        <input
          type="text"
          placeholder="Full Name"
          value={register.nm}
          onChange={(e) => setRegister({ ...register, nm: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={register.phno}
          onChange={(e) => setRegister({ ...register, phno: e.target.value })}
        />

        <button onClick={addData}>
          Register
        </button>

        <p className="msg">{msg}</p>

      </div>

    </div>
    
  );
  
}


export default Register;