import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="grab-home-fullscreen">
      {/* Top Header */}
      <nav className="navbar navbar-expand-lg tasty-nav-capsule-dark my-3 mx-4 px-4 py-2 shadow-lg">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-white brand-name animate-fade-in" style={{ textDecoration: "none" }}>
            Tasty<span className="brand-accent">Bites</span> 🍕
          </Link>
          
          <div className="d-flex align-items-center gap-2 nav-actions">
            <Link to="/" className="nav-link-item px-3 py-2 rounded-pill active">Home</Link>
            <span className="nav-link-item px-3 py-2 rounded-pill cursor-pointer" onClick={() => navigate("/login")}>About</span>
            <Link to="/contact" className="nav-link-item px-3 py-2 rounded-pill">Contact</Link>
            <button className="btn nav-link-item px-3 py-2 rounded-pill border-0 bg-transparent ms-2" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn nav-btn-solid-white px-4 py-2 rounded-pill" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

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