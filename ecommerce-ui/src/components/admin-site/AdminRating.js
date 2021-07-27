import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import axios from 'axios';
import './AdminSite.css';

export const AdminRating = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(checkUser); 
    const [ratingList, setRatingList] = useState([]);
    let Url = "http://localhost:8080/ecommerce-api/admin/rating";

    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`
            }
        })
            .then(response => setRatingList(response.data.data))
            .catch(err => console.log(err));
        
    }, [user]);

    const handleDeleteRating = async (e, id) => {
        console.log(id);
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/rating/delete/" + id;
        
        await axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Rating successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div id="admin-product">
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Username</th>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>DELETE</th>
                </tr>
                </thead>
                <tbody>
                {ratingList.sort((a, b) => (a.ratingId > b.ratingId) ? 1 : -1).map(item => 
                    <tr key={item.ratingId}>
                        <td>{item.ratingId}</td>
                        <td>{item.productId}</td>
                        <td>{item.pname}</td>
                        <td>{item.username}</td>
                        <td>{item.date}</td>
                        <td>{item.comment}</td>
                        <td><button className="delete-btn" onClick={(e) => handleDeleteRating(e, item.ratingId)}>X</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}