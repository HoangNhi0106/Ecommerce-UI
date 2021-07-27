import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import axios from 'axios';
import './AdminSite.css';

export const AdminAccount = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [accountList, setAccountList] = useState([]);
    let Url = "http://localhost:8080/ecommerce-api/admin/account";

    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`
            }
        }) .then(response => setAccountList(response.data.data))
            .catch(err => console.log(err));
    }, []);

    const handleDeleteAccount = async (e, id) => {
        console.log(id);
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/account/delete/" + id;
        
        await axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Account successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div id="admin-product">
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Phone</th>
                    <th>Created in</th>
                    <th>Updated in</th>
                    <th>DELETE</th>
                </tr>
                </thead>
                <tbody>
                {accountList.sort((a, b) => (a.accountId > b.accountId) ? 1 : -1).map(item => 
                    <tr key={item.accountId}>
                        <td>{item.accountId}</td>
                        <td>{item.username}</td>
                        <td>{item.comment}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.phone}</td>
                        <td>{item.createdIn}</td>
                        <td>{item.updatedIn}</td>
                        <td><button className="delete-btn" onClick={(e) => handleDeleteAccount(e, item.ratingId)}>X</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}