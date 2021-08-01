import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './User.css'

const User = () => {
    const [user, setUser] = useState(false);  
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        //localStorage.clear();
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
    }, []);

    const handleUpdateUserSubmit = async e => {
        let Url = "http://localhost:8080/ecommerce-api/user/account/update";
        const data = { 
            accountId: user.id,
            username: user.username,
            email: user.email,
            firstname, 
            lastname,
            phone
        }
        console.log(data);
        e.preventDefault();
        await axios.put(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(response => {
            alert("Update successful!");
        }).catch(err => console.log(err))
    }

    return (
        <div id="user">
            <div className="user-info">
                <div className="user-username">{user.username}</div>
                <div className="user-email">{user.email}</div>
            </div>
            <div className="update-user-form">
                <form>
                    <p>UPDATE USER INFORMATION</p>
                    <div className="user-data">
                        <label htmlFor="firstname">FIRSTNAME</label>
                        <input type="text" name="firstname" placeholder="Nguyen"
                            onChange={({ target }) => setFirstname(target.value)}/>
                    </div>
                    <div className="user-data">
                        <label htmlFor="lastname">LASTNAME</label>
                        <input type="text" name="lastname" placeholder="Van A"
                            onChange={({ target }) => setLastname(target.value)}/>
                    </div>
                    <div className="user-data">
                        <label htmlFor="phone">PHONE</label>
                        <input type="tel" name="phone" placeholder="0123456789"
                            onChange={({ target }) => setPhone(target.value)}/>
                    </div>
                </form>
                <button className = "btn-update" type="submit" onClick={handleUpdateUserSubmit}>SAVE</button>
            </div>
        </div>
    )
}

export default User;