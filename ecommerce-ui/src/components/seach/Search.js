import React, {useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./Search.css";

const Search = () => {
    const [productList, setProductList] = useState([]);
    const {pname} = useParams();
    
    const RouteChange = (item) => {
        return `/product/id=${item.productId}`;
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/ecommerce-api/public/product/search=${pname}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => setProductList(response.data.data));
    }, [pname]);

    return (
        <div className="search-view">
            {productList.map(item => (
                <Link to={{ pathname: RouteChange(item), state: {id: item.productId} }} id = "product-item" key={item.productId}>
                    <img src={item.image} width="150px" height="150px"/>
                    <div className = "product-name">{item.pname}</div>
                    <div className = "product-price">{item.price}</div>
                    <div className = "product-rating">
                        <img src="/images/star.png" height="16px"/>
                        <p>{item.rating}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Search;