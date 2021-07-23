import React from 'react';
import './Category.css';
import ProductItem from '../product item/ProductItem';

const Category = () => {
    return (
        <div id = "category">
            <div className="category-info">
                <div className="category-name">NAME</div>
                <div className="category-description">"description"</div>
            </div>
            <div className="product-list">
                <ProductItem/>
            </div>
        </div>
    )
}

export default Category;
