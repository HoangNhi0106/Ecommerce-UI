import React from "react";
import './Home.css';
import ProductItem  from "../product item/ProductItem";

const categoryList = () => {
    return (
        <div className="category-item">
            <div className = "category-name">HOT PRODUCTS</div>
            <div className = "product-list">
                <ProductItem/>
            </div>
        </div>
    );
}

const Home = () => {
    return (
        <div id = "home">
            <div className = "banner"> BANNER </div>
            <div className = "category-list">
                {categoryList()} 
            </div>
        </div>
    )
}

export default Home;