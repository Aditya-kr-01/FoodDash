import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavClient() {
  const navigate = useNavigate();
  const uname = sessionStorage.getItem("uname") || "User";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg tasty-nav-capsule my-3 mx-4 px-4 py-3 shadow-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/navclient" className="navbar-brand fw-bold fs-3 text-white me-3 brand-name" style={{ textDecoration: "none" }}>
            Tasty<span className="brand-accent">Bites</span> 🍕
          </Link>
          <span className="badge user-welcome-badge bg-light text-success fw-bold py-2 px-3 rounded-pill">
            Hello, {uname} 👋
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 nav-actions">
          <Link to="/foodlistclient" className="btn nav-btn px-3 py-2 rounded-pill fw-semibold text-white">Menu</Link>
          <Link to="/sfoodclient" className="btn nav-btn px-3 py-2 rounded-pill fw-semibold text-white">Search</Link>
          <Link to="/billing" className="btn nav-btn px-3 py-2 rounded-pill fw-semibold text-white">Cart / Bill</Link>
          <Link to="/ordersclient" className="btn nav-btn px-3 py-2 rounded-pill fw-semibold text-white">My Orders 📜</Link>
          <button className="btn nav-btn-logout px-3 py-2 rounded-pill fw-bold text-white ms-2" onClick={handleLogout}>
            Logout 🚪
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavClient;