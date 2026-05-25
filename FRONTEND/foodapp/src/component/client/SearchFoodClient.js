import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavClient from './NavClient';

function SearchFoodClient() {
  const [foodList, setFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [addedItem, setAddedItem] = useState("");

  const uname = sessionStorage.getItem("uname");

  useEffect(() => {
    axios.get("http://localhost:1004/food")
      .then((res) => {
        setFoodList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Could not load catalog ❌");
      });
  }, []);

  const addToCart = (item) => {
    if (!uname) {
      setMsg("Please login to add items to cart ❌");
      return;
    }

    const cartPayload = {
      uname: uname,
      fid: item.fid,
      quantity: 1
    };

    axios.post("http://localhost:1004/cart/add", cartPayload)
      .then((res) => {
        setAddedItem(item.fname);
        setMsg("");
        setTimeout(() => setAddedItem(""), 3000);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Could not add item to cart ❌");
      });
  };

  const filteredFoods = foodList.filter((item) => {
    const nameMatch = item.fname.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = (item.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = item.fid.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || categoryMatch || idMatch;
  });

  return (
    <div>
      <NavClient />
      
      <div className="container mt-5" style={{ maxWidth: "800px" }}>
        <h2 className="mb-4 text-center">Search Delicacies 🔍</h2>

        <div className="mb-5">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm rounded-pill px-4"
            placeholder="Search by food name, category, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {msg && <div className="alert alert-danger text-center fw-semibold">{msg}</div>}
        {addedItem && (
          <div className="alert alert-success text-center fw-semibold position-fixed bottom-0 start-50 translate-middle-x z-3 shadow-lg" style={{ minWidth: "300px" }}>
            🟢 {addedItem} added to cart!
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((item) => (
              <div className="col" key={item.fid}>
                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden position-relative">
                  <div className="row g-0 h-100">
                    <div className="col-4">
                      <img
                        src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"}
                        alt={item.fname}
                        className="img-fluid h-100 w-100"
                        style={{ objectFit: "cover", minHeight: "140px" }}
                      />
                    </div>
                    <div className="col-8 d-flex flex-column justify-content-between p-3">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h6 className="fw-bold text-dark mb-0">{item.fname}</h6>
                          <span className="badge bg-secondary badge-sm px-2 py-1">{item.category || "General"}</span>
                        </div>
                        <p className="text-muted small mb-2" style={{ fontSize: "0.75rem" }}>
                          {item.description || "Fresh chef recommendation."}
                        </p>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="text-success fw-bold">₹{item.price}</span>
                        <button className="btn btn-primary btn-sm px-3 fw-bold" onClick={() => addToCart(item)}>
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-4">
              <p className="text-muted">No dishes match your search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchFoodClient;