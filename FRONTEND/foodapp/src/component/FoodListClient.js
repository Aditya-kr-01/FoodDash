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
// This component fetches food items from the backend and displays them in a card format. Each card shows the food image, name, category, price, and an "Add to Cart" button. The useEffect hook is used to fetch data when the component mounts, and the useState hook manages the food data state.
// The CSS file 'Food.css' is assumed to contain styles for the food container and cards.