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

        if (register.uname === 'admin' && register.pass === 'admin') {
          navigate("/nav");
        }
        else if (res.data === 'LOGIN SUCCESSFULL') {
          navigate("/navclient");
        }
        else {
          setMsg(res.data);
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