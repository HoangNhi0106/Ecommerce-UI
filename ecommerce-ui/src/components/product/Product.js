import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './Product.css';

const drawStar = (num) => {
    const starList = [];
   
    for (var i = 0; i < num; i++)
        starList.push(<img src="/images/star.png" height="16px" key={i}/>);
    return(
        <>{starList}</>
    )    
}

const Rating = (productId) => {
    const [rating, setRating] = useState([]);
    let Url = 'http://localhost:8080/ecommerce-api/public/rating/product=' + productId;
    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => setRating(response.data.data));
    }, []);

    return (
        <div className = "rating-list">
            {rating.map(item => (
                <div className = "rating" key={item.ratingId}>
                    <div className = "rating-account">
                        <p>{item.accountUsername}</p>
                    </div>
                    <div className = "rating-detail">
                        <div className = "rating-star">
                            {drawStar(Math.round(item.star))}
                        </div>
                        <div className = "rating-comment">
                            {item.comment}
                        </div>
                    </div>
                </div>
            ))} 
        </div>
    )
}

const Product = () => {
    const [product, setProduct] = useState([]);
    const location = useLocation();
    const { id } = location.state;

    let Url = 'http://localhost:8080/ecommerce-api/public/product/product=' + id;
    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => setProduct(response.data.data));
    }, []);

    return (
        <div id = "product">
            <div className = "product-info">
                <img src="/images/product.png" height="400px"/>
                <div className = "product-detail">
                    <div className = "product-name">{product.pname}</div>
                    <div className = "product-category">{product.categoryName}</div>
                    <div className = "product-rate-sold">
                        <img src = "/images/star.png" height="16px"/>
                        <p>{product.rating} | {product.sold} products sold</p>
                    </div>
                    <div className = "product-price">{product.price}</div>
                    <div className = "product-amount">
                        <button className = "circle-btn">-</button>
                        <input type="text" name="amount" placeholder="1" />
                        <button className = "circle-btn">+</button>
                    </div>
                    <button className = "btn-buy">ADD TO CART</button>
                </div>
            </div>
            <div className = "product-description">
                <p>description</p> 
                <div className = "description">{product.description}</div>
            </div>
            <div className = "product-review">
                <div className = "box-review">PRODUCT REVIEWS</div>
                {Rating(id)}
            </div>
        </div>
    )
}

export default Product;
