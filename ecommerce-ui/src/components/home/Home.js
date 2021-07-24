import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import ProductItem  from "../product item/ProductItem";

const CategoryList = () => {
    const [category, setCategory] = useState([]);

    const RouteChange = (item) => {
        return `/category/${item.cname}`;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/ecommerce-api/public/category', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => setCategory(response.data.data));
    }, []);

    return (
        <div className = "category-list">
            {category.map(item => (
                <div className="category-item" key={item.categoryId}>
                    <Link to={{ pathname: RouteChange(item), state: {name: item.cname} }} className = "category-name">
                        {item.cname}
                    </Link>
                    <ProductItem cname={item.cname} type="home"/>
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