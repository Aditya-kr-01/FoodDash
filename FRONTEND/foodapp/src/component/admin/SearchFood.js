import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

function SearchFood() {
  const [fid, setFid] = useState("");
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  const searchData = () => {
    if (!fid) {
      setMsg("Please enter a Food ID ❌");
      setData(null);
      return;
    }

    axios.get(`http://localhost:1004/food/${fid}`)
      .then((res) => {
        setData(res.data);
        setMsg("");
      })
      .catch((error) => {
        console.log(error);
        setData(null);
        setMsg("Food item not found with this ID ❌");
      });
  };

  return (
    <div>
      <Nav />
      <div className="container-box" style={{ maxWidth: "450px" }}>
        <h2 className="text-primary mb-4">Search Food Catalog</h2>
        
        <div className="mb-4 d-flex gap-2">
          <input 
            className="form-control" 
            type="text" 
            placeholder="Enter Food ID" 
            value={fid} 
            onChange={(e) => setFid(e.target.value)}
          />
          <button className="btn btn-primary px-4" onClick={searchData}>
            Search
          </button>
        </div>

        {msg && <div className="alert alert-danger text-center fw-semibold mb-3">{msg}</div>}

        {data && (
          <div className="card shadow border-0 overflow-hidden rounded-4">
            <img 
              src={data.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"} 
              alt={data.fname} 
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h4 className="card-title text-dark mb-0 fw-bold">{data.fname}</h4>
                <span className="badge bg-primary px-3 py-2">{data.category || 'General'}</span>
              </div>
              <p className="text-muted small mb-3">{data.description || 'No description available for this delicious menu item.'}</p>
              <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                <span className="text-muted fw-bold small">ID: {data.fid}</span>
                <span className="text-success fw-bold fs-5">₹{data.price}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFood;