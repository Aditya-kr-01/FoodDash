import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="grab-home-fullscreen">
      {/* Top Header */}
      <header className="grab-header px-4 py-3 d-flex justify-content-between align-items-center bg-white shadow-sm">
        <div className="brand-logo fw-bold fs-3 text-success">
          Tasty<span className="text-dark">Bites</span> 🟢
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-outline-success px-4 rounded-pill fw-bold" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-success px-4 rounded-pill fw-bold" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Fullscreen Split Layout (GrabFood Inspo) */}
      <div className="grab-main-split">
        {/* Left Section: Search and Copy */}
        <div className="split-left d-flex align-items-center justify-content-center p-5">
          <div className="w-100" style={{ maxWidth: "480px" }}>
            <span className="badge bg-success-light text-success fw-bold px-3 py-2 rounded-pill mb-3">
              🛵 Tasty Bites Speed Delivery
            </span>
            <h1 className="hero-title-main fw-black text-dark mb-3">
              Good Food, Delivered To You
            </h1>
            <p className="hero-desc text-muted mb-4 fs-6">
              Order food from the best local restaurants near you. Fast delivery, fresh food, and secure checkout.
            </p>

            {/* Delivery address card */}
            <div className="search-card-fullscreen p-4 rounded-4 shadow-sm border bg-white text-dark mb-4">
              <h6 className="fw-bold mb-3 text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                Where should we deliver?
              </h6>
              <div className="input-group mb-3 rounded-pill overflow-hidden border">
                <span className="input-group-text bg-white border-0 text-success fs-5">📍</span>
                <input
                  type="text"
                  className="form-control border-0 py-3"
                  placeholder="Enter your delivery address..."
                  defaultValue="Aditya's Kitchen, New Delhi"
                />
              </div>
              <button className="btn btn-success w-100 py-3 rounded-pill fw-bold fs-6 shadow-sm" onClick={() => navigate("/login")}>
                Find Food near me
              </button>
            </div>
            
            <div className="text-center text-muted small">
              Are you a merchant? <span className="text-success fw-semibold cursor-pointer" onClick={() => navigate("/login")}>Join Tasty Bites Merchant</span>
            </div>
          </div>
        </div>

        {/* Right Section: Visual Food Banner */}
        <div className="split-right"></div>
      </div>
    </div>
  );
}

export default Home;