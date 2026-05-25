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
    <div className="navbar navbar-dark px-4 py-2 shadow-sm" style={{ display: "flex", justifyContent: "space-between", background: "#00B14F" }}>
      <div className="d-flex align-items-center">
        <Link to="/navclient" className="navbar-brand fw-bold fs-4 text-white me-3" style={{ textDecoration: "none" }}>
          Tasty Bites 🍕
        </Link>
        <span className="badge bg-light text-success fw-bold">Hello, {uname} 👋</span>
      </div>

      <div className="d-flex align-items-center">
        <Link to="/foodlistclient" className="btn btn-outline-light btn-sm m-1 px-3">Menu</Link>
        <Link to="/sfoodclient" className="btn btn-outline-light btn-sm m-1 px-3">Search</Link>
        <Link to="/billing" className="btn btn-outline-light btn-sm m-1 px-3">Cart / Bill</Link>
        <Link to="/ordersclient" className="btn btn-outline-light btn-sm m-1 px-3">My Orders 📜</Link>
        <button className="btn btn-warning btn-sm m-1 ms-3 px-3 fw-bold text-dark" onClick={handleLogout}>
          Logout 🚪
        </button>
      </div>
    </div>
  );
}

export default NavClient;