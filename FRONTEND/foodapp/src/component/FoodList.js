import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

function FoodList() {
  const [food, setFood] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:1004/food")
      .then((res) => {
        setFood(res.data);
      })
      .catch((error) => {
        console.log(error);
        setMsg("Could not load food data ❌");
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <h2 className="text-dark mb-4 text-center">Menu Directory</h2>
        
        {msg && <div className="alert alert-danger text-center">{msg}</div>}

        {food.length > 0 ? (
          <div className="table-responsive shadow rounded" style={{ background: "white", padding: "15px" }}>
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: "80px" }}>Image</th>
                  <th>Food ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {food.map((element) => (
                  <tr key={element.fid}>
                    <td>
                      <img 
                        src={element.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"} 
                        alt={element.fname} 
                        className="rounded"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="fw-bold">{element.fid}</td>
                    <td>{element.fname}</td>
                    <td><span className="badge bg-secondary">{element.category || 'General'}</span></td>
                    <td className="fw-bold text-success">₹{element.price}</td>
                    <td className="text-muted small">{element.description || 'No description provided.'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-5">
            <h4 className="text-muted">No food items exist in the catalog.</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodList;