import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Home.css';
import ProductItem  from "../product item/ProductItem";

const CategoryList = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:8080/ecommerce-api/public/category', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"}
        })
            .then(response => setCategory(response.data.data));
    }, []);



    return (
        <div className = "category-list">
            {category.map(item => (
                <div className="category-item">
                    <div className = "category-name">{item.cname}</div>
                    <div className = "product-list">
                        <ProductItem/>
                    </div>
                </div>
            ))}
        </div>
    );
}

const Home = () => {
    return (
        <div id = "home">
            <div className = "banner"> BANNER </div>
            {CategoryList()} 
        </div>
    )
}

export default Home;