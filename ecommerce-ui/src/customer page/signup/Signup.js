import React from "react";
import './Signup.css';

const Signup = () => {
    return (
        <div id = "signup">
            <div className = "signup-form">
                <img src="logo-2.png"/>
                <div className = "form">
                    <form id="signup-form">
                        <div className="signup-data">
                            <label for="username">USERNAME</label>
                            <input type="text" name="username" value="NguyenVanA"/>
                        </div>
                        <div className="signup-data">
                            <label for="email">EMAIL</label>
                            <input type="text" name="email" value="abc@gmail.com"/>
                        </div>
                        <div className="signup-data">
                            <label for="password">PASSWORD</label>
                            <input type="password" name="password" value="pass123456"/>
                        </div>
                        <div className="signup-data">
                            <label for="re-password">RETYPED PASSWORD</label>
                            <input type="password" name="re-password" value="pass123456"/>
                        </div>
                    </form>
                    <button className = "btn-signup" type="submit">SIGNUP</button>
                </div>
            </div>
            <img className="picture-signup" src="signup-picture.jpg"/>
        </div>
    )
}

export default Signup;