import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

  const [register, setRegister] = useState({
    uname: "",
    pass: ""
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const checkLogin = () => {
    axios.get(`http://localhost:1004/register/login/${register.uname}/${register.pass}`)
      .then((res) => {
        
        const role = typeof res.data === 'string' ? res.data.trim().toUpperCase() : '';

        if (register.uname === 'admin' && register.pass === 'admin') {
          sessionStorage.setItem("uname", "admin");
          navigate("/nav");
        }
        else if (role === 'ADMIN') {
          sessionStorage.setItem("uname", register.uname);
          navigate("/nav");
        }
        else if (role === 'USER' || role === 'LOGIN SUCCESSFULL') {
          sessionStorage.setItem("uname", register.uname);
          navigate("/navclient");
        }
        else {
          setMsg("Login Failed ❌ Invalid credentials");
        }

      })
      .catch(() => {
        setMsg("Login failed");
      });
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your Tasty Bites account</p>

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

        <button onClick={checkLogin}>
          Login
        </button>

        <p className="error">{msg}</p>

      </div>

    </div>
  );
}

export default Login;