import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavClient from './NavClient';

function Billing() {
  const [cartItems, setCartItems] = useState([]);
  const [foodCatalog, setFoodCatalog] = useState({});
  const [msg, setMsg] = useState("");
  const [orderReceipt, setOrderReceipt] = useState(null);
  const [loading, setLoading] = useState(true);

  const uname = sessionStorage.getItem("uname");

  useEffect(() => {
    if (!uname) {
      setMsg("Please login to access your cart ❌");
      setLoading(false);
      return;
    }
    loadCartAndCatalog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uname]);

  const loadCartAndCatalog = async () => {
    try {
      setLoading(true);
      // 1. Fetch entire food catalog to lookup item names/prices
      const foodRes = await axios.get("http://localhost:1004/food");
      const catalogMap = {};
      foodRes.data.forEach((item) => {
        catalogMap[item.fid] = item;
      });
      setFoodCatalog(catalogMap);

      // 2. Fetch cart items
      const cartRes = await axios.get(`http://localhost:1004/cart/${uname}`);
      setCartItems(cartRes.data);
      setMsg("");
    } catch (error) {
      console.log(error);
      setMsg("Could not retrieve cart or catalog details ❌");
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = (fid) => {
    axios.delete(`http://localhost:1004/cart/remove/${uname}/${fid}`)
      .then((res) => {
        setCartItems(cartItems.filter(item => item.fid !== fid));
      })
      .catch((err) => {
        console.log(err);
        setMsg("Could not remove item ❌");
      });
  };

  const clearCart = () => {
    axios.delete(`http://localhost:1004/cart/clear/${uname}`)
      .then((res) => {
        setCartItems([]);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Could not clear cart ❌");
      });
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    axios.post(`http://localhost:1004/order/place/${uname}`)
      .then((res) => {
        // Order placed, cart cleared in backend, let's show receipt
        // The backend returns "Order Placed Successfully!"
        // We will generate the receipt summary
        generateInvoiceData();
      })
      .catch((err) => {
        console.log(err);
        setMsg("Checkout failed ❌");
      });
  };

  const generateInvoiceData = () => {
    // Collect purchased items before clearing state
    const invoiceItems = cartItems.map((item) => {
      const foodDetails = foodCatalog[item.fid] || { fname: "Unknown Food", price: 0 };
      return {
        fid: item.fid,
        fname: foodDetails.fname,
        price: foodDetails.price,
        quantity: item.quantity,
        subtotal: foodDetails.price * item.quantity
      };
    });

    const total = invoiceItems.reduce((acc, curr) => acc + curr.subtotal, 0);
    const gst = total * 0.05;
    const grandTotal = total + gst;

    setOrderReceipt({
      invoiceId: "INV-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      items: invoiceItems,
      total: total,
      gst: gst,
      grandTotal: grandTotal
    });

    setCartItems([]); // Clear local cart items state
  };

  const getCartTotals = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      const food = foodCatalog[item.fid];
      if (food) {
        subtotal += food.price * item.quantity;
      }
    });
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };

  if (loading) {
    return (
      <div>
        <NavClient />
        <div className="container mt-5 text-center">
          <h4 className="text-muted">Loading your cart... ⏳</h4>
        </div>
      </div>
    );
  }

  const { subtotal, gst, total } = getCartTotals();

  return (
    <div>
      <NavClient />
      
      <div className="container mt-5" style={{ maxWidth: "800px" }}>
        
        {/* Receipt View Modal/Card */}
        {orderReceipt ? (
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden my-4">
            <div className="bg-success text-white text-center py-4">
              <h2 className="mb-1">Order Placed Successfully! 🎉</h2>
              <p className="mb-0 small">Thank you for dining with Tasty Wheels</p>
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between border-bottom pb-3 mb-3 text-muted small">
                <span>Receipt: <strong>{orderReceipt.invoiceId}</strong></span>
                <span>Date: <strong>{orderReceipt.date}</strong></span>
              </div>

              <h5 className="fw-bold mb-3 text-dark">Invoice Details</h5>
              <table className="table table-borderless align-middle">
                <thead>
                  <tr className="table-light border-bottom">
                    <th>Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderReceipt.items.map((item) => (
                    <tr key={item.fid} className="border-bottom">
                      <td>{item.fname}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">₹{item.price}</td>
                      <td className="text-end fw-semibold">₹{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row justify-content-end mt-4">
                <div className="col-md-5">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal:</span>
                    <span>₹{orderReceipt.total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">GST (5%):</span>
                    <span>₹{orderReceipt.gst.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2 fw-extrabold text-success fs-5">
                    <span>Grand Total:</span>
                    <span>₹{orderReceipt.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5">
                <button className="btn btn-outline-success px-5 rounded-pill" onClick={() => setOrderReceipt(null)}>
                  Order Something Else 🍕
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-dark mb-4 text-center">Your Food Cart 🛒</h2>

            {msg && <div className="alert alert-danger text-center fw-semibold mb-4">{msg}</div>}

            {cartItems.length > 0 ? (
              <div className="row g-4">
                {/* Cart Items List */}
                <div className="col-md-8">
                  <div className="shadow-sm rounded-4 bg-white p-3">
                    {cartItems.map((item) => {
                      const food = foodCatalog[item.fid] || { fname: "Loading...", price: 0, category: "", imageUrl: "" };
                      return (
                        <div className="d-flex align-items-center justify-content-between border-bottom py-3" key={item.fid}>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={food.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"}
                              alt={food.fname}
                              className="rounded"
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="mb-0 fw-bold text-dark">{food.fname}</h6>
                              <span className="badge bg-light text-secondary small" style={{ fontSize: "0.65rem" }}>
                                {food.category || "General"}
                              </span>
                              <div className="text-success small fw-semibold mt-1">₹{food.price} each</div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center gap-4">
                            <span className="fw-bold text-dark px-3 py-1 rounded bg-light border">
                              Qty: {item.quantity}
                            </span>
                            <span className="fw-extrabold text-dark" style={{ minWidth: "70px", textAlign: "right" }}>
                              ₹{(food.price * item.quantity).toFixed(2)}
                            </span>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeCartItem(item.fid)}>
                              🗑️
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div className="d-flex justify-content-between mt-3 pt-2">
                      <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
                        Clear Cart 🧹
                      </button>
                      <button className="btn btn-outline-primary btn-sm" onClick={loadCartAndCatalog}>
                        Refresh 🔄
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkout Summary */}
                <div className="col-md-4">
                  <div className="shadow border-0 rounded-4 p-4 bg-light">
                    <h5 className="fw-bold text-dark mb-4">Checkout Summary</h5>
                    <div className="d-flex justify-content-between mb-3 text-muted">
                      <span>Subtotal:</span>
                      <span className="fw-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 text-muted">
                      <span>GST (5%):</span>
                      <span className="fw-semibold">₹{gst.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4 text-dark fs-5 fw-extrabold">
                      <span>Grand Total:</span>
                      <span className="text-success">₹{total.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow" onClick={placeOrder}>
                      💳 Place Order & Pay
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-5 py-5 shadow-sm rounded-4 bg-white">
                <h4 className="text-muted mb-3">Your cart is empty! 🍔</h4>
                <p className="text-secondary mb-4">Browse our catalog to select delicious food items.</p>
                <button className="btn btn-primary px-4 rounded-pill" onClick={() => window.location.href = "/foodlistclient"}>
                  Explore Menu
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;