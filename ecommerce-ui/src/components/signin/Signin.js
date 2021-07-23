import React from "react";
import './Signin.css';

const Signin = () => {
    return (
        <div id = "signin">
            <div className = "signin-form">
                <img src="logo-2.png"/>
                <div className = "form">
                    <form id="signin-form">
                        <div className="signin-data">
                            <label for="username">USERNAME</label>
                            <input type="text" name="username" value="NguyenVanA"/>
                        </div>
                        <div className="signin-data">
                            <label for="password">PASSWORD</label>
                            <input type="password" name="password" value="pass123456"/>
                        </div>
                    </form>
                    <button className = "btn-signin" type="submit">SIGNIN</button>
                </div>
            </div>
            <img className="picture-signin" src="signin-picture.jpg"/>
        </div>
    )
}

export default Signin;