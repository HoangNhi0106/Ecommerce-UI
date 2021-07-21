import React from "react";
import './Home.css';

const Home = () => {
    return (
        <div id = "home">
            <div className = "banner"> BANNER </div>
            <div className = "category-list">
                <div className = "category-name">HOT PRODUCTS</div>
                <div className = "product-list">
                    <div className = "product">
                        <img src="product.png" height="100px"/>
                        <div className = "product-name">Romand ZERO VELVET TINT</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home;