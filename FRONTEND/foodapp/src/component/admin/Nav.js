import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  const uname = sessionStorage.getItem("uname") || "Admin";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg tasty-nav-capsule-dark my-3 mx-4 px-4 py-2 shadow-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/nav" className="navbar-brand fw-bold fs-3 text-white me-3 brand-name animate-fade-in" style={{ textDecoration: "none" }}>
            Tasty<span className="brand-accent brand-accent-admin">Admin</span> ⚙️
          </Link>
          <span className="badge admin-badge bg-light text-dark fw-bold py-2 px-3 rounded-pill">
            Logged in: {uname} 🛡️
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 nav-actions">
          <Link to="/addfood" className="nav-link-item px-3 py-2 rounded-pill">Add Food</Link>
          <Link to="/foodlist" className="nav-link-item px-3 py-2 rounded-pill">Directory</Link>
          <Link to="/delfood" className="nav-link-item px-3 py-2 rounded-pill">Delete</Link>
          <Link to="/updfood" className="nav-link-item px-3 py-2 rounded-pill">Update</Link>
          <Link to="/sfood" className="nav-link-item px-3 py-2 rounded-pill">Search</Link>
          <Link to="/ordersadmin" className="nav-link-item px-3 py-2 rounded-pill">Orders 📋</Link>
          <button className="btn nav-btn-solid-white px-4 py-2 rounded-pill ms-2" onClick={handleLogout}>
            Logout 🚪
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;