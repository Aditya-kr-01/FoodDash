import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './DashboardClient.css';
import NavClient from './NavClient';

function DashboardClient() {
  const navigate = useNavigate();
  const [foodList, setFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState({});
  const [msg, setMsg] = useState("");
  const [addedItem, setAddedItem] = useState("");
  const [loading, setLoading] = useState(true);

  // Carousel slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  const uname = sessionStorage.getItem("uname") || "User";

  // Banner details
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1200",
      title: "Everyday is Wing Day",
      subtitle: "Sauced up goodness!",
      price: "$6.99",
      contact: "+123 456 789 0"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
      title: "Double Cheese Feast",
      subtitle: "Melty burger goodness",
      price: "$5.59",
      contact: "+123 456 789 0"
    }
  ];

  useEffect(() => {
    // Auto-slide banner carousel every 5 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    // Load catalog items from the backend
    axios.get("http://localhost:1004/food")
      .then((res) => {
        setFoodList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMsg("Could not load menu items ❌");
        setLoading(false);
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

  const toggleFavorite = (fid) => {
    setFavorites((prev) => ({
      ...prev,
      [fid]: !prev[fid]
    }));
  };

  // Filter foods based on category & search query
  const filteredFoods = foodList.filter((item) => {
    const matchesSearch = item.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? (item.category || "").toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  // Categories metadata matching the mockup
  const categories = [
    {
      name: "Beverage",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      )
    },
    {
      name: "Chicken",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l1.5-1.5c1.5-1.5 3.5-2.5 5.5-2.5h1c2.5 0 4.5-2 4.5-4.5V9c0-3.5-3-7-5-7Z" />
          <path d="M17.5 13.5c1.5 1.5 3.5 1.5 5 0s1.5-3.5 0-5" />
          <circle cx="17.5" cy="17.5" r="1.5" />
          <circle cx="19.5" cy="19.5" r="1.5" />
        </svg>
      )
    },
    {
      name: "Pizza",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 11l-9 9" />
          <path d="M19 8.5C19 4.36 15.64 1 11.5 1S4 4.36 4 8.5c0 1.25.3 2.43.83 3.47L11.5 23l6.67-11.03c.53-1.04.83-2.22.83-3.47Z" />
          <circle cx="9" cy="7" r="0.75" fill="currentColor" />
          <circle cx="13" cy="10" r="0.75" fill="currentColor" />
          <circle cx="10" cy="13" r="0.75" fill="currentColor" />
        </svg>
      )
    }
  ];

  // Hardcoded recent order items matching the circular mockup
  const recentOrders = [
    {
      fid: "r1",
      fname: "Japan Ramen",
      price: "$5.59",
      distance: "4.97 km",
      time: "21 min",
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300"
    },
    {
      fid: "r2",
      fname: "Fried Rice",
      price: "$5.59",
      distance: "4.97 km",
      time: "21 min",
      imageUrl: "https://images.unsplash.com/photo-1603133872878-685f5888259a?w=300"
    },
    {
      fid: "r3",
      fname: "Pepperoni Pizza",
      price: "$5.59",
      distance: "4.97 km",
      time: "21 min",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300"
    }
  ];

  return (
    <div className="premium-dashboard">
      {/* Top Capsule Glass Navigation Header */}
      <NavClient />

      <div className="container dashboard-scroll-content pb-5">
        
        {/* Alerts & Notifications */}
        {msg && <div className="alert alert-danger text-center fw-semibold mt-3 animate-fade-in">{msg}</div>}
        {addedItem && (
          <div className="alert alert-success text-center fw-semibold position-fixed bottom-0 start-50 translate-middle-x z-3 shadow-lg" style={{ minWidth: "300px" }}>
            🟢 {addedItem} added to cart!
          </div>
        )}

        {/* 📍 Search & Location Capsule */}
        <div className="search-location-capsule shadow-sm my-4 d-flex align-items-center">
          <div className="location-section px-4 py-3 d-flex align-items-center gap-2">
            <span className="location-icon">📍</span>
            <span className="location-textfw-bold text-dark">India</span>
          </div>
          <div className="divider-vertical"></div>
          <div className="search-section flex-grow-1 d-flex align-items-center px-3">
            <span className="search-icon me-2">🔍</span>
            <input
              type="text"
              className="border-0 bg-transparent w-100 py-2 search-input-field"
              placeholder="What do you want eat today"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 📢 Visual Promo Banner Slider */}
        <div className="promo-banner-slider rounded-4 shadow-sm overflow-hidden mb-5">
          <div className="slides-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide) => (
              <div 
                className="banner-slide" 
                key={slide.id}
                style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.1) 80%), url(${slide.image})` }}
              >
                <div className="banner-content text-white p-5 d-flex flex-column justify-content-center">
                  <div className="badge bg-warning text-dark mb-3 rounded-pill py-2 px-3 fw-bold align-self-start">
                    SPECIAL OFFER
                  </div>
                  <h1 className="banner-title fw-black mb-1">{slide.title}</h1>
                  <h3 className="banner-subtitle text-warning fw-bold mb-4">{slide.subtitle}</h3>
                  <div className="d-flex align-items-center gap-4">
                    <button className="btn btn-light rounded-pill fw-extrabold px-4 py-2 text-success shadow" onClick={() => navigate("/foodlistclient")}>
                      Order Now &bull; {slide.price}
                    </button>
                    <span className="contact-info fw-semibold text-white-50">{slide.contact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Pagination Dots */}
          <div className="slider-dots d-flex flex-column gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`dot-indicator ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></div>
            ))}
          </div>
        </div>

        {/* 🏷️ Categories Section */}
        <div className="category-section mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-dark m-0">Category</h3>
            <button className="btn btn-link text-success fw-bold p-0 text-decoration-none" onClick={() => setSelectedCategory("")}>
              View all <span className="arrow-icon">&gt;</span>
            </button>
          </div>

          <div className="row row-cols-3 g-3">
            {categories.map((cat) => (
              <div className="col" key={cat.name}>
                <div 
                  className={`category-pill-card p-4 rounded-4 shadow-sm text-center cursor-pointer ${selectedCategory === cat.name ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                >
                  <div className={`category-icon-wrapper mb-3 ${cat.name.toLowerCase()}`}>
                    {cat.icon}
                  </div>
                  <h6 className="fw-bold m-0">{cat.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🍔 Popular Dishes Section */}
        <div className="popular-dishes-section mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-dark m-0">Popular Dishes</h3>
            <Link to="/foodlistclient" className="btn btn-link text-success fw-bold p-0 text-decoration-none">
              View all <span className="arrow-icon">&gt;</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <h5 className="text-muted">Loading popular delicacies...</h5>
            </div>
          ) : filteredFoods.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredFoods.slice(0, 6).map((item, idx) => {
                // Determine mock properties to match layout screenshot
                const isOdd = idx % 2 !== 0;
                const discountText = isOdd ? "15% Off" : "Exclusive";
                const isFavorite = !!favorites[item.fid];
                
                return (
                  <div className="col animate-fade-in" key={item.fid}>
                    <div className="card h-100 popular-item-card shadow-sm border-0 rounded-4 overflow-hidden position-relative">
                      {/* Badge Top Left */}
                      <span className={`badge discount-item-badge position-absolute top-0 start-0 m-3 ${isOdd ? 'bg-danger' : 'bg-warning-orange'}`}>
                        {discountText}
                      </span>

                      {/* Favorite Icon Top Right */}
                      <button 
                        className="btn favorite-btn-round position-absolute top-0 end-0 m-3 shadow-sm border-0"
                        onClick={() => toggleFavorite(item.fid)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#ff4d4d" : "none"} stroke={isFavorite ? "#ff4d4d" : "#7f8c8d"} strokeWidth="2.5">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>

                      {/* Card Food Image */}
                      <div className="card-image-container text-center pt-5 pb-3 bg-light-gradient">
                        <img 
                          src={item.imageUrl || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"} 
                          alt={item.fname}
                          className="popular-food-image"
                        />
                      </div>

                      {/* Card Details */}
                      <div className="card-body p-4 d-flex flex-column justify-content-between">
                        <div>
                          {/* Mock Star Rating */}
                          <div className="rating-stars mb-2">
                            <span className="star-filled">★</span>
                            <span className="star-filled">★</span>
                            <span className="star-filled">★</span>
                            <span className="star-empty">★</span>
                            <span className="star-empty">★</span>
                          </div>
                          
                          <h5 className="card-title fw-extrabold text-dark mb-1">{item.fname}</h5>
                          <p className="card-text text-muted small mb-0">{item.description || "Premium chef specialty dish crafted with fresh local ingredients."}</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <span className="price-tag fw-black fs-4 text-success">
                            ₹{item.price}
                          </span>
                          
                          {/* Circular Add Button */}
                          <button className="btn add-to-cart-circle-btn shadow" onClick={() => addToCart(item)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm">
              <h5 className="text-muted">No popular dishes match the selected category.</h5>
            </div>
          )}
        </div>

        {/* 🍕 Recent Orders Section */}
        <div className="recent-orders-section mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-dark m-0">Recent Order</h3>
            <Link to="/ordersclient" className="btn btn-link text-success fw-bold p-0 text-decoration-none">
              View all <span className="arrow-icon">&gt;</span>
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {recentOrders.map((item) => {
              const isFavorite = !!favorites[item.fid];
              
              return (
                <div className="col" key={item.fid}>
                  <div className="card h-100 recent-order-card shadow-sm border-0 p-4 text-center rounded-4 overflow-hidden position-relative">
                    {/* Favorite Icon Top Right */}
                    <button 
                      className="btn favorite-btn-round position-absolute top-0 end-0 m-3 shadow-sm border-0"
                      onClick={() => toggleFavorite(item.fid)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#ff4d4d" : "none"} stroke={isFavorite ? "#ff4d4d" : "#7f8c8d"} strokeWidth="2.5">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>

                    {/* Circular Image Container */}
                    <div className="circular-image-wrapper mx-auto my-3 shadow-sm">
                      <img 
                        src={item.imageUrl} 
                        alt={item.fname}
                        className="recent-food-circular-image"
                      />
                    </div>

                    <h5 className="fw-extrabold text-dark mb-1">{item.fname}</h5>
                    <div className="recent-price text-success fw-bold fs-5 mb-3">{item.price}</div>
                    
                    {/* Distance & Delivery Time */}
                    <div className="delivery-metadata d-flex justify-content-center align-items-center gap-2 text-muted small">
                      <span>{item.distance}</span>
                      <span className="dot-divider">&bull;</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardClient;
