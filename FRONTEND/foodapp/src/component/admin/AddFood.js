import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

function AddFood() {
  const [food, setFood] = useState({
    fid: "",
    fname: "",
    price: "",
    category: "",
    description: "",
    imageUrl: ""
  });

  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({
    efid: "",
    efname: "",
    eprice: ""
  });

  const addData = () => {
    // Basic frontend check
    if (!food.fname || !food.price) {
      setMsg("Please fill out all required fields ❌");
      return;
    }

    axios.post("http://localhost:1004/food", food)
      .then((res) => {
        setMsg("Food added successfully! 🎉");
        setErrors({ efid: "", efname: "", eprice: "" });
        // Clear fields except ID maybe, or clear all
        refreshData();
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          // If backend validation failed
          const serverErrors = error.response.data;
          setErrors({
            efid: serverErrors.fid || "",
            efname: serverErrors.fname || "",
            eprice: serverErrors.price || ""
          });
          setMsg("Validation failed ❌");
        } else {
          setMsg("Something went wrong 😣");
        }
      });
  };

  const refreshData = () => {
    setFood({
      fid: "",
      fname: "",
      price: "",
      category: "",
      description: "",
      imageUrl: ""
    });
    setMsg("");
    setErrors({ efid: "", efname: "", eprice: "" });
  };

  return (
    <div>
      <Nav />
      <div className="container-box" style={{ maxWidth: "450px" }}>
        <h2 className="text-primary mb-4">Add Food Item</h2>

        <div className="mb-3">
          <label className="form-label fw-semibold text-muted">Food ID</label>
          <input
            type="text"
            className="form-control bg-light text-muted"
            value="Auto-generated ✨"
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Food Name *</label>
          <input
            type="text"
            className="form-control"
            value={food.fname}
            onChange={(e) => setFood({ ...food, fname: e.target.value })}
            placeholder="e.g., Spicy Paneer Burger"
          />
          {errors.efname && <small className="text-danger">{errors.efname}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Price (₹) *</label>
          <input
            type="number"
            className="form-control"
            value={food.price}
            onChange={(e) => setFood({ ...food, price: e.target.value })}
            placeholder="e.g., 250"
          />
          {errors.eprice && <small className="text-danger">{errors.eprice}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <input
            type="text"
            className="form-control"
            value={food.category}
            onChange={(e) => setFood({ ...food, category: e.target.value })}
            placeholder="e.g., Burgers, Pizzas, Desserts"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            value={food.description}
            onChange={(e) => setFood({ ...food, description: e.target.value })}
            placeholder="Brief description of the item"
            rows="2"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={food.imageUrl}
            onChange={(e) => setFood({ ...food, imageUrl: e.target.value })}
            placeholder="URL to an image"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary px-4 py-2" onClick={addData}>
            Add Item
          </button>
          <button className="btn btn-outline-secondary px-4 py-2" onClick={refreshData}>
            Clear
          </button>
        </div>

        {msg && (
          <div className={`mt-3 alert ${msg.includes('success') ? 'alert-success' : 'alert-warning'} text-center fw-semibold`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFood;