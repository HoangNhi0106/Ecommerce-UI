import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
            <div className = "account">
                <img src = "/images/user.png" height="32px"/>
                <p>Hoang Nhi</p>
            </div>
        </nav>
    )
}
export default Navbar;