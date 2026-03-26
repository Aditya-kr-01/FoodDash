import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">

      <div className="overlay">

        <div className="content">

          <h1 className="title">
            TASTY BITES
          </h1>

          <p className="subtitle">
            Premium food experience at your fingertips 🍕
          </p>

          <div className="buttons">
            <button onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="outline" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;