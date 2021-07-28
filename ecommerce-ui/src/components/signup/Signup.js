import React, { useState } from "react";
import axios from "axios";
import './Signup.css';

const Signup = (props) => {
    let UrlSignup="http://localhost:8080/ecommerce-api/auth/signup";
    let UrlSignin="http://localhost:8080/ecommerce-api/auth/signin";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    //const [user, setUser] = useState(false);  

    const signin = () => {
        axios.post(UrlSignin, { username, password })
                .then(response => {
                    // store the user in localStorage
                    localStorage.setItem('user', JSON.stringify(response.data));
                    //reload page
                    props.handleSignupClick();
                })
                .catch(err => console.log(err));
    }

    const handleSignupSubmit = async e => {
        e.preventDefault();
        if (rePassword !== password)
            console.log("password must be equal to retyped password");
        else {
            axios.post(UrlSignup, { 
                username, email, password } )
                .then(() => signin()) 
                .catch(err => console.log(err)); 
            window.location.reload();
        }
    };

    return (
        <div className={`${!props.isShowSignup ? "active-signup" : ""} show-signup`}>
            <div className = "signup-form">
                <img src="/images/logo-2.png"/>
                <div className = "form">
                    <form id="signup-form">
                        <div className="signup-data">
                            <label htmlFor="username">USERNAME</label>
                            <input type="text" name="username" placeholder="NguyenVanA"
                                onChange={({ target }) => setUsername(target.value)}/>
                        </div>
                        <div className="signup-data">
                            <label htmlFor="email">EMAIL</label>
                            <input type="text" name="email" placeholder="abc@gmail.com"
                                onChange={({ target }) => setEmail(target.value)}/>
                        </div>
                        <div className="signup-data">
                            <label htmlFor="password">PASSWORD</label>
                            <input type="password" name="password" placeholder="password"
                                onChange={({ target }) => setPassword(target.value)}/>
                        </div>
                        <div className="signup-data">
                            <label htmlFor="re-password">RETYPED PASSWORD</label>
                            <input type="password" name="re-password" placeholder="password"
                                onChange={({ target }) => setRePassword(target.value)}/>
                        </div>
                    </form>
                    <button className = "btn-signup" type="submit" onClick={handleSignupSubmit}>SIGNUP</button>
                </div>
            </div>
            <img className="picture-signup" src="/images/signup-picture.jpg"/>
        </div>
    )
}

export default Signup;