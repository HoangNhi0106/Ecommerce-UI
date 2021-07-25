import React, { useState } from "react";
import axios from "axios";
import './Signin.css';

const Signin = (props) => {
    let Url="http://localhost:8080/ecommerce-api/auth/signin";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSigninSubmit = async e => {
        e.preventDefault();
        const data = { username, password };
        await axios.post(Url, data)
        .then(response => {
            console.log(response.data);
            // store the user in localStorage
            localStorage.setItem("user", JSON.stringify(response.data));
            //reload page
            props.handleSigninClick();
        }).catch(err => console.log(err));
        window.location.reload();
    };

    return (
        <div className = {`${!props.isShowSignin ? "active-signin" : ""} show-signin`}>
            <div className = "signin-form">
                <img src="/images/logo-2.png"/>
                <div className = "form">
                    <form id="signin-form">
                        <div className="signin-data">
                            <label htmlFor="username">USERNAME</label>
                            <input type="text" name="username" placeholder="NguyenVanA"
                                onChange={({ target }) => setUsername(target.value)}/>
                        </div>
                        <div className="signin-data">
                            <label htmlFor="password">PASSWORD</label>
                            <input type="password" name="password" placeholder="password"
                                onChange={({ target }) => setPassword(target.value)}/>
                        </div>
                    </form>
                    <button className = "btn-signin" type="submit" onClick={handleSigninSubmit}>SIGNIN</button>
                </div>
            </div>
            <img className="picture-signin" src="/images/signin-picture.jpg"/>
        </div>
    )
}

export default Signin;