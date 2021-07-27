import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductItem.css';

const ProductItem = (props) => {
    const [productList, setProductList] = useState([]);

    const RouteChange = (item) => {
        return `/product/id=${item.productId}`;
    }
    let Url = 'http://localhost:8080/ecommerce-api/public/product/category=' + props.name;
    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => setProductList(response.data.data));
    }, [props.name]);


    if (props.type === true) {
        return (
            <div className = "product-list center">
                {productList.slice(0,5).map(item => (
                    <Link to={{ pathname: RouteChange(item), state: {id: item.productId} }} id = "product-item" key={item.productId}>
                        <img src={item.image} width="150px" height="150px"/>
                        <div className = "product-name">{item.pname}</div>
                        <div className = "product-rating">
                            <img src="/images/star.png" height="16px"/>
                            <p>{item.rating}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    } 
    else return (
        <div className = "product-list left">
            {productList.map(item => (
                <Link to={{ pathname: RouteChange(item), state: {id: item.productId} }} id = "product-item" key={item.productId}>
                    <img src={item.image} width="150px" height="150px"/>
                    <div className = "product-name">{item.pname}</div>
                    <div className = "product-rating">
                        <img src="/images/star.png" height="16px"/>
                        <p>{item.rating}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductItem;