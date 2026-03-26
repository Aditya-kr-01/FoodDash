import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Food.css';

function FoodListClient() {

    const [food, setFood] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1004/food/fetch")
            .then((res) => {
                setFood(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="food-container">
            {food.map((item) => (
                <div className="food-card" key={item.fid}>
                    
                    <img 
                        src={item.imageUrl || "https://via.placeholder.com/150"} 
                        alt="food"
                    />

                    <h3>{item.fname}</h3>
                    <p className="category">{item.category}</p>
                    <p className="price">₹{item.price}</p>

                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}

export default FoodListClient;