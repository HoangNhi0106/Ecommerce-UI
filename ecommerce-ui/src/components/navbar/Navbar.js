import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const signout = () => {
    localStorage.clear();
    window.location.reload();
}

const DropDownAccount = (props) => {
    let roles = props.user.roles;
    if (roles.includes("ROLE_ADMIN")) {
        return (
            <div className={`${props.isShowAccount ? "show" : ""} dropdown-content`}>
                <a href={"/admin"}>Admin page</a>
                <a href={`/user/${props.user.username}`}>Update profile</a>
                <a onClick={signout}>Signout</a>
            </div>
        )
    } else
        return (
            <div className={`${props.isShowAccount ? "show" : ""} dropdown-content`}>
                <a href={`/user/${props.user.username}`}>Update profile</a>
                <a onClick={signout}>Signout</a>
            </div>
        )
}

const DropDownCategory = (props) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/ecommerce-api/public/category', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"}
        })
            .then(response => setCategory(response.data.data));
    }, []);

    const RouteChange = (item) => {
        return `/category/${item.cname}`;
    }

    return (
        <div className={`${props.isShowCategory  ? "show" : ""} dropdown-content`}>
            {category.map(item => (
                <Link key={item.categoryId} to={{ pathname: RouteChange(item)}}>
                    {item.cname}
                </Link>
            ))}
        </div>
    )
}

const Account = (props) => {    
    const [isShowAccount, setIsShowAccount] = useState(false);
    
    const handleSignin = () => {
        props.handleSigninClick();
    }

    const handleSignup = () => {
        props.handleSignupClick();
    }

    const handleDropDownAccount = () => {
        setIsShowAccount((isShowAccount) => !isShowAccount);
    }

    if (props.user) {
        return (
            <div className = "account" onClick={handleDropDownAccount}>
                <img src = "/images/user.png" height="32px"/>
                <p>{props.user.username}</p>
                <DropDownAccount user={props.user} isShowAccount={isShowAccount}/>
            </div>
        )
    }
    else return (
        <div className = "sign">
            <button className="button" onClick={handleSignin}>SIGNIN</button>
            <button className="button" onClick={handleSignup}>SIGNUP</button>
        </div>
    )
}

const Navbar = (props) => {   
    const [user, setUser] = useState();  
    const [search, setSearch] = useState(""); 
    const history = useHistory();
    const [isShowCategory, setIsShowCategory] = useState(false);
 
    const handleDropDownCategory = () => {
        setIsShowCategory((isShowCategory) => !isShowCategory);
    }

    useEffect(() => {
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
      }, []);

    const SearchProduct = (event) => {
        if (event.key === 'Enter')
            history.push(`/search/${search}`)
    }

    return (
        <nav id = 'navbar'>
            <Link to='/' className = "logo">
                <img src = "/images/logo.png" width="64px" height="64px"/>
            </Link>
            <div className = "menu" onClick={handleDropDownCategory}>
                <img src = "/images/menu.png" height="32px" width="32px"/>
                <p>category</p>
                <DropDownCategory isShowCategory={isShowCategory}/>
            </div>
            <input type="text" className = "search" placeholder="search product" 
                onChange={({ target }) => setSearch(target.value)}
                onKeyPress={event => SearchProduct(event)}/>
            <div className = "cart">
                <img src = "/images/cart.png" height="32px"/>
            </div>
            <Account user={user} handleSigninClick={props.handleSigninClick} handleSignupClick={props.handleSignupClick}/>
        </nav>
    )
}
export default Navbar;