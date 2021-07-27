import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Category.css';
import ProductItem from '../product item/ProductItem';

const Category = () => {
    const [category, setCategory] = useState([]);
    let { cname } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/ecommerce-api/public/category/${cname}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => {
                setCategory(response.data.data);
                console.log(category);
            });
    }, [cname]);
    
    return (
        <div id = "category">
            <div className="category-info">
                <div className="category-name">{category.cname}</div>
                <div className="category-description">{category.description}</div>
            </div>
            <div className="product-list">
                <ProductItem name={cname} type={false}/>
            </div>
        </div>
    )
}

export default Category;
