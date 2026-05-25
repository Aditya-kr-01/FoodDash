import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavClient from './NavClient';

function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const uname = sessionStorage.getItem("uname");

  useEffect(() => {
    if (!uname) {
      setMsg("Please login to see your orders ❌");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:1004/order/user/${uname}`)
      .then((res) => {
        // Sort orders so newest are first
        const sorted = res.data.sort((a, b) => b.oid - a.oid);
        setOrders(sorted);
        setLoading(false);
        // Fetch bill for each order
        sorted.forEach((order) => {
          fetchBill(order.oid);
        });
      })
      .catch((err) => {
        console.log(err);
        setMsg("Could not load orders ❌");
        setLoading(false);
      });
  }, [uname]);

  const fetchBill = (oid) => {
    axios.get(`http://localhost:1004/order/bill/${oid}`)
      .then((res) => {
        // Parse "Total: 100\nGST (5%): 5\nFinal Amount: 105"
        const text = res.data;
        const finalAmountMatch = text.match(/Final Amount:\s*([\d.]+)/);
        const finalAmount = finalAmountMatch ? finalAmountMatch[1] : "N/A";
        
        setBills(prev => ({
          ...prev,
          [oid]: {
            text: text,
            finalAmount: finalAmount
          }
        }));
      })
      .catch((err) => console.log(err));
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "DELIVERED") return <span className="badge bg-success px-3 py-1 text-white fw-bold">Delivered ✅</span>;
    if (s === "PREPARING") return <span className="badge bg-warning text-dark px-3 py-1 fw-bold">Preparing 🍳</span>;
    if (s === "OUT FOR DELIVERY") return <span className="badge bg-info text-white px-3 py-1 fw-bold">Out for Delivery 🛵</span>;
    return <span className="badge bg-secondary px-3 py-1 text-white fw-bold">Placed 🛒</span>;
  };

  return (
    <div>
      <NavClient />
      
      <div className="container mt-5" style={{ maxWidth: "800px" }}>
        <h2 className="mb-4 text-center fw-bold text-dark">Your Order History 📜</h2>
        <p className="text-center text-muted mb-5">Track and view invoices for your recent delicious meals</p>

        {msg && <div className="alert alert-danger text-center fw-semibold mb-4">{msg}</div>}

        {loading ? (
          <div className="text-center py-5">
            <h4 className="text-muted">Loading your orders... ⏳</h4>
          </div>
        ) : orders.length > 0 ? (
          <div className="d-flex flex-column gap-4 mb-5">
            {orders.map((order) => {
              const billInfo = bills[order.oid] || { finalAmount: "Calculating...", text: "" };
              const formattedDate = order.orderDate ? new Date(order.orderDate).toLocaleString() : "Unknown Date";
              
              return (
                <div className="card shadow-sm border-0 rounded-4 overflow-hidden" key={order.oid}>
                  <div className="card-header bg-light border-0 py-3 px-4 d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small">ORDER ID:</span>
                      <strong className="text-dark ms-1">#TS-{order.oid}</strong>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                      <div className="text-muted small mb-1">Ordered on:</div>
                      <div className="fw-semibold text-dark mb-3">{formattedDate}</div>
                      
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-light text-secondary border px-2 py-1">Standard Delivery</span>
                        <span className="badge bg-light text-success border border-success-subtle px-2 py-1">Contactless</span>
                      </div>
                    </div>

                    <div className="text-end" style={{ minWidth: "150px" }}>
                      <div className="text-muted small mb-1">Amount Paid:</div>
                      <div className="text-success fw-black fs-3">₹{billInfo.finalAmount}</div>
                      
                      {billInfo.text && (
                        <button 
                          className="btn btn-link btn-sm text-success fw-bold p-0 mt-2 text-decoration-none"
                          onClick={() => {
                            alert(`Tasty Bites Invoice Summary:\n\nOrder ID: #TS-${order.oid}\nDate: ${formattedDate}\n\n${billInfo.text}`);
                          }}
                        >
                          📄 View Full Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5 shadow-sm rounded-4 bg-white border">
            <h4 className="text-muted mb-3">No orders placed yet! 🍕</h4>
            <p className="text-secondary mb-4">Browse our catalog to select delicious food items and place your first order.</p>
            <button className="btn btn-primary px-4 rounded-pill" onClick={() => window.location.href = "/foodlistclient"}>
              Explore Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersClient;
