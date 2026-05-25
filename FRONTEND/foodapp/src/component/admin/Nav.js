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
    <div className="navbar navbar-dark bg-dark px-4 py-2 shadow-sm" style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="d-flex align-items-center">
        <Link to="/nav" className="navbar-brand fw-bold fs-4 text-white me-3" style={{ textDecoration: "none" }}>
          Tasty Bites Admin ⚙️
        </Link>
        <span className="badge bg-secondary">Logged in: {uname}</span>
      </div>

      <div className="d-flex align-items-center">
        <Link to="/addfood" className="btn btn-outline-light btn-sm m-1">Add Food</Link>
        <Link to="/foodlist" className="btn btn-outline-light btn-sm m-1">Directory</Link>
        <Link to="/delfood" className="btn btn-outline-light btn-sm m-1">Delete</Link>
        <Link to="/updfood" className="btn btn-outline-light btn-sm m-1">Update</Link>
        <Link to="/sfood" className="btn btn-outline-light btn-sm m-1">Search</Link>
        <button className="btn btn-danger btn-sm m-1 ms-3 px-3 fw-semibold" onClick={handleLogout}>
          Logout 🚪
        </button>
      </div>
    </div>
  );
}

export default Nav;