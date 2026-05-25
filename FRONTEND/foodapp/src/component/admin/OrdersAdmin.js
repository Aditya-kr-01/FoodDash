import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllOrders = () => {
    setLoading(true);
    axios.get("http://localhost:1004/order/all")
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
        setMsg("Could not load orders from server ❌");
        setLoading(false);
      });
  };

  const fetchBill = (oid) => {
    axios.get(`http://localhost:1004/order/bill/${oid}`)
      .then((res) => {
        const text = res.data;
        const finalAmountMatch = text.match(/Final Amount:\s*([\d.]+)/);
        const finalAmount = finalAmountMatch ? parseFloat(finalAmountMatch[1]) : 0;
        
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

  const updateStatus = (oid, newStatus) => {
    axios.put(`http://localhost:1004/order/status/${oid}/${newStatus}`)
      .then(() => {
        setOrders(prev => prev.map(o => o.oid === oid ? { ...o, status: newStatus } : o));
        setMsg(`Order #${oid} status updated to ${newStatus}! 🟢`);
        setTimeout(() => setMsg(""), 3000);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Failed to update status ❌");
      });
  };

  // KPI Calculations
  const getTotalRevenue = () => {
    return Object.values(bills).reduce((acc, curr) => acc + (curr.finalAmount || 0), 0).toFixed(2);
  };

  const getOrderStatusCount = (status) => {
    return orders.filter(o => (o.status || "").toUpperCase() === status.toUpperCase()).length;
  };

  return (
    <div>
      <Nav />
      
      <div className="container mt-5 mb-5" style={{ maxWidth: "900px" }}>
        <h2 className="mb-4 text-center fw-bold text-dark">Orders Management 📋</h2>
        <p className="text-center text-muted mb-5">Track sales revenue, view invoices, and manage order statuses</p>

        {msg && (
          <div className={`alert ${msg.includes('Failed') ? 'alert-danger' : 'alert-success'} text-center fw-semibold mb-4`}>
            {msg}
          </div>
        )}

        {/* KPI Dashboard Row */}
        <div className="row g-3 mb-5">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 text-center p-3 bg-light">
              <h6 className="text-muted small uppercase mb-1">Total Sales</h6>
              <h3 className="fw-bold text-success">₹{getTotalRevenue()}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 text-center p-3 bg-light">
              <h6 className="text-muted small uppercase mb-1">Total Orders</h6>
              <h3 className="fw-bold text-primary">{orders.length}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 text-center p-3 bg-light">
              <h6 className="text-muted small uppercase mb-1">Pending</h6>
              <h3 className="fw-bold text-warning">{getOrderStatusCount("PLACED") + getOrderStatusCount("PREPARING")}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-4 text-center p-3 bg-light">
              <h6 className="text-muted small uppercase mb-1">Delivered</h6>
              <h3 className="fw-bold text-success">{getOrderStatusCount("DELIVERED")}</h3>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <h4 className="text-muted">Loading orders... ⏳</h4>
          </div>
        ) : orders.length > 0 ? (
          <div className="table-responsive shadow border rounded-4 bg-white overflow-hidden">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Revenue</th>
                  <th className="py-3">Status</th>
                  <th className="px-4 py-3 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const billInfo = bills[order.oid] || { finalAmount: 0, text: "" };
                  const formattedDate = order.orderDate ? new Date(order.orderDate).toLocaleString() : "Unknown Date";
                  
                  return (
                    <tr key={order.oid}>
                      <td className="px-4 py-3 fw-bold text-dark">#TS-{order.oid}</td>
                      <td className="fw-semibold text-secondary">{order.uname}</td>
                      <td className="small text-muted">{formattedDate}</td>
                      <td className="fw-bold text-success">₹{billInfo.finalAmount}</td>
                      <td>
                        <select 
                          className="form-select form-select-sm fw-bold border rounded-pill px-3 py-1"
                          style={{
                            width: "160px",
                            backgroundColor: 
                              order.status === "DELIVERED" ? "#E6F7ED" : 
                              order.status === "PREPARING" ? "#FFF9E6" : 
                              order.status === "OUT FOR DELIVERY" ? "#EBF5FF" : "#F8F9FA",
                            color: 
                              order.status === "DELIVERED" ? "#00B14F" : 
                              order.status === "PREPARING" ? "#D97706" : 
                              order.status === "OUT FOR DELIVERY" ? "#1D4ED8" : "#4B5563"
                          }}
                          value={order.status}
                          onChange={(e) => updateStatus(order.oid, e.target.value)}
                        >
                          <option value="PLACED">🛒 Placed</option>
                          <option value="PREPARING">🍳 Preparing</option>
                          <option value="OUT FOR DELIVERY">🛵 Out for Delivery</option>
                          <option value="DELIVERED">✅ Delivered</option>
                        </select>
                      </td>
                      <td className="px-4 text-center">
                        {billInfo.text && (
                          <button 
                            className="btn btn-outline-primary btn-sm px-3 rounded-pill"
                            onClick={() => {
                              alert(`Tasty Bites Invoice Summary:\n\nOrder ID: #TS-${order.oid}\nCustomer: ${order.uname}\nDate: ${formattedDate}\n\n${billInfo.text}`);
                            }}
                          >
                            📄 Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5 shadow-sm rounded-4 bg-white border">
            <h4 className="text-muted">No orders in the system yet! 🍽️</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersAdmin;
