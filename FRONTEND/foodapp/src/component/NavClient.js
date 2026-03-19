import React from 'react';
import { Link } from 'react-router-dom';

function NavClient() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      background: "#0d6efd",
      padding: "15px"
    }}>
      <h4 style={{ color: "white" }}>Client Panel</h4>

      <div>
        <Link to="/foodlistclient" className="btn btn-light m-1">Menu</Link>
        <Link to="/sfoodclient" className="btn btn-light m-1">Search</Link>
        <Link to="/billing" className="btn btn-light m-1">Billing</Link>
      </div>
    </div>
  );
}

export default NavClient;