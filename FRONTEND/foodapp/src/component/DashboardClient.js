import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './DashboardClient.css';

function DashboardClient() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={`tasty-dashboard-fullscreen ${darkMode ? 'dark-mode' : ''}`}>
      {/* Top Transparent Glass Header */}
      <header className="tasty-glass-header px-4 py-2 d-flex align-items-center justify-content-between">
        {/* Brand Logo */}
        <div className="dashboard-logo fw-bold fs-4 text-danger cursor-pointer" onClick={() => navigate("/navclient")}>
          TASTY BITES
        </div>

        {/* Center Search Input */}
        <div className="dashboard-search-wrapper" style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control rounded-pill px-3 py-2 text-dark bg-white border-0 shadow-sm"
            placeholder="Search foods..."
            onFocus={() => navigate("/sfoodclient")}
          />
        </div>

        {/* Right Navigation & Control Panel */}
        <div className="d-flex align-items-center gap-4">
          <nav className="d-flex gap-4 fw-semibold text-white">
            <Link to="/navclient" className="nav-link-custom active">Home</Link>
            <Link to="/foodlistclient" className="nav-link-custom">Menu</Link>
            <Link to="/billing" className="nav-link-custom">Cart</Link>
          </nav>

          {/* Theme Switcher Toggle */}
          <div className="theme-toggle d-flex align-items-center gap-2 text-white">
            <span>☀️</span>
            <div className={`switch-pill ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)}>
              <div className="switch-dot"></div>
            </div>
            <span>🌙</span>
          </div>

          {/* Logout Red Pill Button */}
          <button className="btn btn-logout-red px-3 py-2 rounded-pill fw-bold" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main Fullscreen Dashboard Banner */}
      <div className="tasty-dashboard-main d-flex align-items-center justify-content-center">
        <div className="text-center text-white p-4">
          
          {/* Main Title */}
          <h1 className="dashboard-hero-title fw-black tracking-wide mb-2">
            TASTY BITES
          </h1>
          
          {/* Subtitle */}
          <p className="dashboard-hero-subtitle mb-4">
            Experience the Future of Fine Dining & Delivery
          </p>

          {/* Circular SVG Wheels Emblem Logo */}
          <div className="dashboard-logo-wrapper mx-auto mb-5">
            <svg viewBox="0 0 200 200" className="tasty-svg-logo">
              {/* Outer Circular Ring with border */}
              <circle cx="100" cy="100" r="85" fill="rgba(0,0,0,0.6)" stroke="white" strokeWidth="4.5" />
              <circle cx="100" cy="100" r="75" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="6,4" />
              
              {/* Inner Elements: Burger & Coffee Cup */}
              <g transform="translate(56, 45) scale(0.85)">
                {/* Burger */}
                <path d="M 10,24 Q 25,3 40,24 Z" fill="#ffb03b" /> {/* Bun top */}
                <rect x="8" y="24" width="34" height="4" rx="2" fill="#2b8a3e" /> {/* Lettuce */}
                <rect x="6" y="28" width="38" height="3" rx="1.5" fill="#f03e3e" /> {/* Tomato */}
                <rect x="8" y="31" width="34" height="5" rx="2" fill="#a61e4d" /> {/* Patty */}
                <path d="M 8,36 H 42 V 41 H 8 Z" fill="#ffb03b" /> {/* Bun bottom */}
              </g>

              <g transform="translate(104, 43) scale(0.9)">
                {/* Drink Cup */}
                <path d="M 5,10 H 25 L 22,40 H 8 Z" fill="white" />
                <rect x="3" y="6" width="24" height="4" rx="1" fill="#212529" />
                <path d="M 15,6 L 20,0" stroke="white" strokeWidth="2" />
                {/* Initial "TB" */}
                <text x="9" y="27" fill="#212529" fontSize="10" fontWeight="bold" fontFamily="sans-serif">TB</text>
              </g>

              {/* Banner for Title */}
              <path d="M 15,110 L 185,110 L 175,138 L 25,138 Z" fill="#212529" stroke="white" strokeWidth="2.5" />
              <text x="100" y="130" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">
                Tasty Bites
              </text>

              {/* Decorative Wheels at the Bottom */}
              <circle cx="70" cy="162" r="11" fill="none" stroke="white" strokeWidth="3" />
              <line x1="70" y1="151" x2="70" y2="173" stroke="white" strokeWidth="2" />
              <line x1="59" y1="162" x2="81" y2="162" stroke="white" strokeWidth="2" />

              <circle cx="130" cy="162" r="11" fill="none" stroke="white" strokeWidth="3" />
              <line x1="130" y1="151" x2="130" y2="173" stroke="white" strokeWidth="2" />
              <line x1="119" y1="162" x2="141" y2="162" stroke="white" strokeWidth="2" />
              
              <line x1="81" y1="162" x2="119" y2="162" stroke="white" strokeWidth="3.5" />
            </svg>
          </div>

          {/* Action Button: Explore Menu */}
          <div className="dashboard-actions">
            <button className="btn btn-explore-menu px-5 py-3 rounded-pill fw-bold" onClick={() => navigate("/foodlistclient")}>
              Explore Menu
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardClient;
