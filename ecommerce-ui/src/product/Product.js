import React from "react";
import './Product.css';

const drawStar = (num) => {
    const starList = [];
   
    for (var i = 0; i < num; i++)
        starList.push(<img src="star.png" height="16px"/>);
    return(
        <>{starList}</>
    )    
}

const Rating = () => {
    return (
        <div className = "rating">
            <div className = "rating-account">
                <img src="user.png" height="64px"/>
                <p>HoangNhi</p>
            </div>
            <div className = "rating-detail">
                <div className = "rating-star">
                    {drawStar(5)}
                </div>
                <div className = "rating-comment">
                    It's good
                </div>
            </div>
        </div>
    )
}

const Product = () => {
    return (
        <div id = "product">
            <div className = "product-info">
                <img src="product.png" height="400px"/>
                <div className = "product-detail">
                    <div className = "product-name">Romand ZERO VELVET TINT</div>
                    <div className = "product-rate-sold">
                        <img src = "star.png" height="16px"/>
                        <p>(4.9) | 16 products sold</p>
                    </div>
                    <div className = "product-price">300 000đ</div>
                </div>
            </div>
            <div className = "product-description">
                <p>description</p> 
                <div className = "description">It is good</div>
            </div>
            <div className = "product-review">
                <div className = "box-review">PRODUCT REVIEWS</div>
                <div className = "rating-list">
                    {Rating()}
                </div>
            </div>
        </div>
    )
}

export default Product;
