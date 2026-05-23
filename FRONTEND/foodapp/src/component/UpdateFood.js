import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

function UpdateFood() {
  const [fid, setFid] = useState("");
  const [food, setFood] = useState({
    fname: "",
    price: "",
    category: "",
    description: "",
    imageUrl: ""
  });

  const [msg, setMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchFoodDetails = () => {
    if (!fid) {
      setMsg("Please enter a Food ID ❌");
      return;
    }

    axios.get(`http://localhost:1004/food/${fid}`)
      .then((res) => {
        setFood({
          fname: res.data.fname,
          price: res.data.price,
          category: res.data.category || "",
          description: res.data.description || "",
          imageUrl: res.data.imageUrl || ""
        });
        setIsLoaded(true);
        setMsg("Food details loaded successfully! 🟢");
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(false);
        setMsg("Food item not found with this ID ❌");
      });
  };

  const updateData = () => {
    if (!fid) return;

    axios.put(`http://localhost:1004/food/${fid}`, {
      fid: fid,
      fname: food.fname,
      price: food.price,
      category: food.category,
      description: food.description,
      imageUrl: food.imageUrl
    })
      .then((res) => {
        setMsg("Food updated successfully! 📝");
      })
      .catch((error) => {
        console.log(error);
        setMsg("Something went wrong during update ❌");
      });
  };

  const refreshData = () => {
    setMsg("");
    setFid("");
    setFood({
      fname: "",
      price: "",
      category: "",
      description: "",
      imageUrl: ""
    });
    setIsLoaded(false);
  };

  return (
    <div>
      <Nav />
      <div className="container-box" style={{ maxWidth: "450px" }}>
        <h2 className="text-success mb-4">Update Food Item</h2>

        <div className="mb-3 d-flex gap-2">
          <input
            className="form-control"
            type="text"
            placeholder="Enter Food ID to Edit"
            value={fid}
            onChange={(e) => setFid(e.target.value)}
            disabled={isLoaded}
          />
          {!isLoaded ? (
            <button className="btn btn-primary" onClick={fetchFoodDetails}>
              Load
            </button>
          ) : (
            <button className="btn btn-outline-secondary" onClick={refreshData}>
              Change ID
            </button>
          )}
        </div>

        {isLoaded && (
          <div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Food Name</label>
              <input
                className="form-control"
                type="text"
                value={food.fname}
                onChange={(e) => setFood({ ...food, fname: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input
                className="form-control"
                type="number"
                value={food.price}
                onChange={(e) => setFood({ ...food, price: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input
                className="form-control"
                type="text"
                value={food.category}
                onChange={(e) => setFood({ ...food, category: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control"
                value={food.description}
                onChange={(e) => setFood({ ...food, description: e.target.value })}
                rows="2"
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Image URL</label>
              <input
                className="form-control"
                type="text"
                value={food.imageUrl}
                onChange={(e) => setFood({ ...food, imageUrl: e.target.value })}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-success px-4 py-2" onClick={updateData}>
                Save Changes
              </button>
              <button className="btn btn-outline-secondary px-4 py-2" onClick={refreshData}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {msg && (
          <div className={`mt-3 alert ${msg.includes('successfully') || msg.includes('loaded') ? 'alert-success' : 'alert-danger'} text-center fw-semibold`}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateFood;