import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './Category.css';
import ProductItem from '../product item/ProductItem';

const Category = () => {
    const [category, setCategory] = useState([]);
    const location = useLocation();
    const { name } = location.state;

    let Url = 'http://localhost:8080/ecommerce-api/public/category/' + name;

    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => setCategory(response.data.data));
    }, []);
    

    return (
        <div id = "category">
            <div className="category-info">
                <div className="category-name">{category.cname}</div>
                <div className="category-description">{category.description}</div>
            </div>
            <div className="product-list">
            <ProductItem cname={name} type="category"/>
            </div>
        </div>
    )
}

export default Category;
