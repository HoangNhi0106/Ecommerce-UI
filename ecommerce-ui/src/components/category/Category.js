import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Category.css';
import ProductItem from '../product item/ProductItem';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [sort, setSort] = useState("");
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
                <select name="sort" value={sort} onChange={({ target }) => setSort(target.value)}>
                    <option key={0} value="">None</option>
                    <option key={1} value="/sort/price/asc">Lowest Price</option>
                    <option key={2} value="/sort/price/desc">Highest Price</option>
                    <option key={3} value="/sort/createdin">Newest Product</option>
                    <option key={4} value="/sort/rating">Highest Rating</option>
                </select>
                <ProductItem name={cname} type={false} sort={sort}/>
            </div>
        </div>
    )
}

export default Category;
