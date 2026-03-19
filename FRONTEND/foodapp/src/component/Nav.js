import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      background: "#212529",
      padding: "15px"
    }}>
      <h4 style={{ color: "white" }}>Admin Panel</h4>

      <div>
        <Link to="/addfood" className="btn btn-outline-light m-1">Add</Link>
        <Link to="/foodlist" className="btn btn-outline-light m-1">List</Link>
        <Link to="/delfood" className="btn btn-outline-light m-1">Delete</Link>
        <Link to="/updfood" className="btn btn-outline-light m-1">Update</Link>
        <Link to="/sfood" className="btn btn-outline-light m-1">Search</Link>
      </div>
    </div>
  );
}

export default Nav;