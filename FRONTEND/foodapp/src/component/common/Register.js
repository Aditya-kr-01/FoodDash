import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {

  const [register, setRegister] = useState({
    uname: "",
    pass: "",
    nm: "",
    email: "",
    phno: "",
    role: "USER"
  });

  const [msg, setMsg] = useState("");

  const addData = () => {

    console.log("Sending Data:", register);

    axios.post("http://localhost:1004/register/add", register, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      console.log(res.data);
      setMsg("Registration Successful ✅");

      // reset form
      setRegister({
        uname: "",
        pass: "",
        nm: "",
        email: "",
        phno: "",
        role: "USER"
      });
    })
    .catch((error) => {

      console.log("FULL ERROR:", error);

      if (error.response) {
        console.log("BACKEND ERROR:", error.response.data);
        const errData = error.response.data;
        if (typeof errData === 'object' && errData !== null) {
          const errorMsgs = Object.values(errData).join(" | ");
          setMsg(`Validation Failed: ${errorMsgs} ❌`);
        } else {
          setMsg(`${errData || "Registration failed"} ❌`);
        }
      } else {
        setMsg("Server not reachable ❌");
      }
    });
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Create Account 🚀</h2>
        <p className="subtitle">Sign up for exclusive local food deliveries</p>

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

        <select 
          className="form-select rounded-pill px-3 py-2 mb-3 text-dark bg-white border"
          value={register.role}
          onChange={(e) => setRegister({ ...register, role: e.target.value })}
          style={{ width: "100%", fontSize: "0.95rem" }}
        >
          <option value="USER">Customer Signup 🛵</option>
          <option value="ADMIN">Admin Signup ⚙️</option>
        </select>

        <button onClick={addData}>
          Register
        </button>

        <p className="msg">{msg}</p>

      </div>

    </div>
  );
}

export default Register;