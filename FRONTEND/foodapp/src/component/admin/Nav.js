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
    <nav className="navbar navbar-expand-lg tasty-nav-capsule-admin my-3 mx-4 px-4 py-3 shadow-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/nav" className="navbar-brand fw-bold fs-3 text-white me-3 brand-name-admin" style={{ textDecoration: "none" }}>
            Tasty<span className="brand-accent-admin">Admin</span> ⚙️
          </Link>
          <span className="badge admin-badge bg-light text-dark fw-bold py-2 px-3 rounded-pill">
            Logged in: {uname} 🛡️
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 nav-actions">
          <Link to="/addfood" className="btn nav-btn-admin px-3 py-2 rounded-pill fw-semibold text-white">Add Food</Link>
          <Link to="/foodlist" className="btn nav-btn-admin px-3 py-2 rounded-pill fw-semibold text-white">Directory</Link>
          <Link to="/delfood" className="btn nav-btn-admin px-3 py-2 rounded-pill fw-semibold text-white">Delete</Link>
          <Link to="/updfood" className="btn nav-btn-admin px-3 py-2 rounded-pill fw-semibold text-white">Update</Link>
          <Link to="/sfood" className="btn nav-btn-admin px-3 py-2 rounded-pill fw-semibold text-white">Search</Link>
          <Link to="/ordersadmin" className="btn nav-btn-admin px-3 py-2 rounded-pill fw-semibold text-white">Orders 📋</Link>
          <button className="btn nav-btn-logout px-3 py-2 rounded-pill fw-bold text-white ms-2" onClick={handleLogout}>
            Logout 🚪
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;