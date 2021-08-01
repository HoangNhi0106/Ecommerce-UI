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

const UserRating = (props) => {
    const [star, setStar] = useState(5);
    const [comment, setComment] = useState("");

    const handleRatingSubmit = async e => {
        e.preventDefault();
        let UrlRating = "http://localhost:8080/ecommerce-api/user/rating/save"
        await axios.post(UrlRating, {
            productId: props.productId,
            accountId: props.user.id,
            star,
            comment
        }, {
            headers : {
                'Authorization': `${props.user.tokenType} ${props.user.accessToken}`
            }
        }).then(() => {
            alert("Rating successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    if (!props.user) return(<></>)
    else return (
        <div className="rating">
            <div className = "rating-account">
                <p>{props.user.username}</p>
            </div>
            <div className = "rating-detail">
                <form>
                <div className="rating-data">
                    <label htmlFor="star"><img src="/images/star.png" height="16px" /></label>
                    <input type="number" max="5" min="1" className="star" placeholder="5"
                        onChange={({ target }) => setStar(target.value)}/>
                </div>
                <textarea className="rating-data comment-box" placeholder="Put your comment" 
                    onChange={({ target }) => setComment(target.value)}>
                </textarea>
                </form>
                <button type="submit" className="rating-btn" onClick={handleRatingSubmit}>ENTER</button>
            </div>
        </div>
    )
}

const Product = () => {
    const [user, setUser] = useState(false);  
    const [product, setProduct] = useState([]);
    const location = useLocation();
    const { id } = location.state;

    let Url = 'http://localhost:8080/ecommerce-api/public/product/product=' + id;
    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        }).then(response => setProduct(response.data.data));

        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
    }, []);

    return (
        <div id = "product">
            <div className = "product-info">
                <img src={product.image} height="400px"/>
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
            <div className = "product-table">
                <p>Detail Information</p> 
                <table className = "information">
                    <tbody>
                        <tr>
                            <th>Brand</th>
                            <td>{product.brandName}</td>
                        </tr>
                        <tr>
                            <th>Volume</th>
                            <td>{product.volume}</td>
                        </tr>
                        <tr>
                            <th>Made In</th>
                            <td>{product.madeIn}</td>
                        </tr>
                        <tr>
                            <th>Skin Type</th>
                            <td>{product.skinType}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className = "product-description">
                <p>description</p> 
                <div className = "description">{product.description}</div>
            </div>
            <div className = "product-review">
                <div className = "box-review">PRODUCT REVIEWS</div>
                {Rating(id)}
                <UserRating user={user} productId={id}/>
            </div>
        </div>
    )
}

export default Product;
