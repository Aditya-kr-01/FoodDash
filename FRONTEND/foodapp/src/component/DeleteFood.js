import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

function DeleteFood() {
  const [fid, setFid] = useState("");
  const [msg, setMsg] = useState("");
  const [foodInfo, setFoodInfo] = useState(null);

  const fetchFoodInfo = () => {
    if (!fid) {
      setMsg("Please enter a Food ID ❌");
      return;
    }
    axios.get(`http://localhost:1004/food/${fid}`)
      .then((res) => {
        setFoodInfo(res.data);
        setMsg("");
      })
      .catch((error) => {
        console.log(error);
        setFoodInfo(null);
        setMsg("Food item not found with this ID ❌");
      });
  };

  const deleteData = () => {
    if (!fid) return;
    
    axios.delete(`http://localhost:1004/food/${fid}`)
      .then((res) => {
        setMsg("Food deleted successfully! 🗑️");
        setFoodInfo(null);
        setFid("");
      })
      .catch((error) => {
        console.log(error);
        setMsg("Something went wrong during deletion ❌");
      });
  };

  const refreshData = () => {
    setMsg("");
    setFid("");
    setFoodInfo(null);
  };

  return (
    <div>
      <Nav />
      <div className="container-box" style={{ maxWidth: "450px" }}>
        <h2 className="text-danger mb-4">Delete Food Item</h2>
        
        <div className="mb-3 d-flex gap-2">
          <input 
            className="form-control" 
            type="text" 
            placeholder="Enter Food ID" 
            value={fid} 
            onChange={(e) => setFid(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchFoodInfo}>
            Verify
          </button>
        </div>

        {foodInfo && (
          <div className="card mb-4 bg-light border-danger">
            <div className="card-body">
              <h5 className="card-title text-dark">{foodInfo.fname}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{foodInfo.category || 'General'}</h6>
              <p className="card-text fw-bold text-danger">Price: ₹{foodInfo.price}</p>
              <button className="btn btn-danger w-100 mt-2" onClick={deleteData}>
                Confirm Deletion
              </button>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-outline-secondary px-4 py-2" onClick={refreshData}>
            Reset
          </button>
        </div>

        {msg && (
          <div className={`mt-3 alert ${msg.includes('successfully') ? 'alert-success' : 'alert-danger'} text-center fw-semibold`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteFood;