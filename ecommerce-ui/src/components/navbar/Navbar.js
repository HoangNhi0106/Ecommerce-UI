import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

const signout = () => {
    localStorage.clear();
    window.location.reload();
}

const DropDown = (props) => {
    let roles = props.user.roles;
    if (roles.includes("ROLE_ADMIN")) {
        return (
            <div className={`${props.isShow ? "show" : ""} dropdown-content`}>
                <a href={`/admin/${props.user.username}`}>Admin page</a>
                <a href={`/user/${props.user.username}`}>Update profile</a>
                <a onClick={signout}>Signout</a>
            </div>
        )
    } else
        return (
            <div className={`${props.isShow ? "show" : ""} dropdown-content`}>
                <a href={`/user/${props.user.username}`}>Update profile</a>
                <a onClick={signout}>Signout</a>
            </div>
        )
}

const Account = (props) => {    
    const [isShow, setIsShow] = useState(false);
    
    const handleSignin = () => {
        props.handleSigninClick();
    }

    const handleSignup = () => {
        props.handleSignupClick();
    }

    const handleDropDown = () => {
        setIsShow((isShow) => !isShow);
    }
    if (props.user) {
        return (
            <div className = "account" onClick={handleDropDown}>
                <img src = "/images/user.png" height="32px"/>
                <p>Hoang Nhi</p>
                <DropDown user={props.user} isShow={isShow}/>
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
 

    useEffect(() => {
        //localStorage.clear();
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
      }, []);


    return (
        <nav id = 'navbar'>
            <Link to='/' className = "logo">
                <img src = "/images/logo.png" width="64px" height="64px"/>
            </Link>
            <div className = "menu">
                <img src = "/images/menu.png" height="32px" width="32px"/>
                <p>category</p>
            </div>
            <div className = "search">SEARCH BAR</div>
            <div className = "cart">
                <img src = "/images/cart.png" height="32px"/>
            </div>
            <Account user={user} handleSigninClick={props.handleSigninClick} handleSignupClick={props.handleSignupClick}/>
        </nav>
    )
}
export default Navbar;