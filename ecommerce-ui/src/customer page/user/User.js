import React from 'react';
import './User.css'

const User = () => {
    return (
        <div id="user">
            <form id="update-user-form">
                <p>UPDATE USER INFORMATION</p>
                <div className="user-data">
                    <label for="firstname">FIRSTNAME</label>
                    <input type="text" name="firstname" value="Nguyen"/>
                </div>
                <div className="user-data">
                    <label for="lastname">LASTNAME</label>
                    <input type="text" name="lastname" value="Van A"/>
                </div>
                <div className="user-data">
                    <label for="email">EMAIL</label>
                    <input type="text" name="email" value="abc@gmail.com"/>
                </div>
                <div className="user-data">
                    <label for="phone">PHONE</label>
                    <input type="number" name="phone" value="0123456789"/>
                </div>
            </form>
            <button className = "btn-update" type="submit">SAVE</button>
        </div>
    )
}

export default User;