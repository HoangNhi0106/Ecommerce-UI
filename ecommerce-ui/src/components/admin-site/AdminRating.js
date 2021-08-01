import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './AdminSite.css';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModel from '../confirm model/ConfirmModel';
import {PaginationAdmin} from '../../utils/pagination/Pagination';

export const AdminRating = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [ratingList, setRatingList] = useState([]);
    const {confirm} = useConfirm();
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
        
    }, []);

    const DeleteRating = (id) => {
        let Url = "http://localhost:8080/ecommerce-api/admin/rating/delete/" + id;
        
        axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Rating successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    const handleDeleteRating = async(e, item) => {
        e.preventDefault();
        const isConfirmed = await confirm(`Do you want to delete rating id = ${item.ratingId}?`);
        if (isConfirmed) 
            DeleteRating(item.ratingId);
    }

    const header =[
        "ID", "Product ID", "Product Name", "Username", "Date", "Comment", "BUTTON"
    ]

    const Ratinglist = (props) => {
        return(
            <tr key={props.data.ratingId}>
                <td>{props.data.ratingId}</td>
                <td>{props.data.productId}</td>
                <td>{props.data.pname}</td>
                <td>{props.data.username}</td>
                <td>{props.data.date}</td>
                <td>{props.data.comment}</td>
                <td><button className="delete-btn" onClick={(e) => handleDeleteRating(e, props.data)}>X</button></td>
            </tr> 
        )
    }

    return (
        <div id="admin-rating">
            {ratingList.length > 0 ? (
                <>
                    <PaginationAdmin
                        header={header}
                        data={ratingList}
                        RenderComponent={Ratinglist}
                        pageLimit={5}
                        dataLimit={10}
                    />
                </>
                ) : (
                <h1>No Rating to display</h1>
            )}
            <ConfirmModel/>
            
        </div>
    )
}