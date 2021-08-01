import React, {useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./Search.css";
import { PaginationUser } from '../../utils/pagination/Pagination';

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

    const ProductList = (props) => {
        return (
            <Link to={{ pathname: RouteChange(props.data), state: {id: props.data.productId} }} id = "product-item" key={props.data.productId}>
                    <img src={props.data.image} width="150px" height="150px"/>
                    <div className = "product-name">{props.data.pname}</div>
                    <div className = "product-price">{props.data.price}</div>
                    <div className = "product-rating">
                        <img src="/images/star.png" height="16px"/>
                        <p>{props.data.rating}</p>
                    </div>
            </Link>
        )
    }

    return (
        <div className="search-view">
            {productList.length > 0 ? (
                <>
                    <PaginationUser
                        data={productList}
                        RenderComponent={ProductList}
                        pageLimit={5}
                        dataLimit={10}
                    />
                </>
                ) : (
                <h1>No Product to display</h1>
            )}
        </div>
    )
}

export default Search;