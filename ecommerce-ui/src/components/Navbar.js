import React, { Component } from 'react';
import './Navbar.css'

export default class Navbar extends Component {
    render() {
        return (
            <nav id='navbar'>
                <div class = "logo">
                    <img src = "logo.png" width="64px" height="64px"/>
                </div>
                <div class = "menu">
                    <img src = "menu.png" height="32px" width="32px"/>
                    <p>category</p>
                </div>
                <div class = "search">SEARCH BAR</div>
                <div class = "cart">
                    <img src = "cart.png" height="32px"/>
                </div>
                <div class = "account">
                    <img src = "user.png" height="32px"/>
                    <p>Hoang Nhi</p>
                </div>
            </nav>
        )
    }
}