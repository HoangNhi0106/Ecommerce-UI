import React, { Component } from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav id = 'navbar'>
            <div className = "logo">
                <img src = "logo.png" width="64px" height="64px"/>
            </div>
            <div className = "menu">
                <img src = "menu.png" height="32px" width="32px"/>
                <p>category</p>
            </div>
            <div className = "search">SEARCH BAR</div>
            <div className = "cart">
                <img src = "cart.png" height="32px"/>
            </div>
            <div className = "account">
                <img src = "user.png" height="32px"/>
                <p>Hoang Nhi</p>
            </div>
        </nav>
    )
}
export default Navbar;