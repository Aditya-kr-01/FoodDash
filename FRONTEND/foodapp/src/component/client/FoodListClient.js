import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavClient from './NavClient';
import '../common/Food.css';

function FoodListClient() {
  const [food, setFood] = useState([]);
  const [msg, setMsg] = useState("");
  const [addedItem, setAddedItem] = useState("");
  
  const uname = sessionStorage.getItem("uname");

  useEffect(() => {
    axios.get("http://localhost:1004/food")
      .then((res) => {
        setFood(res.data);
      })
      .catch((err) => console.log(err));
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
        setTimeout(() => setAddedItem(""), 3000); // Clear notification after 3s
      })
      .catch((err) => {
        console.log(err);
        setMsg("Could not add item to cart ❌");
      });
  };

  return (
    <div>
      <NavClient />
      
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Explore Our Menu 🍕</h2>

        {msg && <div className="alert alert-danger text-center fw-semibold">{msg}</div>}
        {addedItem && (
          <div className="alert alert-success text-center fw-semibold position-fixed bottom-0 start-50 translate-middle-x z-3 shadow-lg" style={{ minWidth: "300px" }}>
            🟢 {addedItem} added to cart!
          </div>
        )}

        <div className="food-grid row row-cols-1 row-cols-md-3 g-4 mt-2">
          {food.length > 0 ? (
            food.map((item) => (
              <div className="col" key={item.fid}>
                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden position-relative hover-card">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"} 
                    alt={item.fname}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold text-dark mb-0">{item.fname}</h5>
                        <span className="badge bg-primary px-3 py-1">{item.category || "General"}</span>
                      </div>
                      <p className="card-text text-muted small">{item.description || "Fresh and flavorful menu choice, crafted with love."}</p>
                    </div>

                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted fw-bold small">ID: {item.fid}</span>
                        <span className="text-success fw-extrabold fs-4">₹{item.price}</span>
                      </div>
                      <button className="btn btn-primary w-100 py-2 fw-bold" onClick={() => addToCart(item)}>
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-100 text-center mt-5">
              <h4 className="text-muted">Loading delicious items...</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodListClient;