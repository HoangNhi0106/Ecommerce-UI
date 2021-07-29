import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import axios from 'axios';
import './AdminSite.css';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModel from '../confirm model/ConfirmModel';
import PaginationAdmin from '../../utils/pagination-admin/PaginationAdmin';

export const AdminAccount = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [accountList, setAccountList] = useState([]);
    const {confirm} = useConfirm();
    const [update, setUpdate] = useState(false);
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

    const DeleteAccount = (id) => {
        let Url = "http://localhost:8080/ecommerce-api/admin/account/delete/" + id;
        axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Account successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    const handleDeleteAccount = async (e, item) => {
        e.preventDefault();
        const isConfirmed = await confirm(`Do you want to delete account ${item.username}?`);
        if (isConfirmed) 
            DeleteAccount(item.accountId);
        await setUpdate(update => !update);
    }


    const AccountList = (props) => {
        let role = [];
        {props.data.roles.map(
            item => role.push(item.rname)
        )}
        return (
            <tr key={props.data.accountId}>
                <td>{props.data.accountId}</td>
                <td>{props.data.username}</td>
                <td>{props.data.email}</td>
                <td>{props.data.firstname}</td>
                <td>{props.data.lastname}</td>
                <td>{props.data.phone}</td>
                <td>{props.data.createdIn}</td>
                <td>{props.data.updatedIn}</td>
                <td>{role.join()}</td>
                <td><button className="delete-btn" onClick={(e) => handleDeleteAccount(e, props.data)}>X</button></td>
            </tr>
        )
    }

    const header = [
        "ID", "Username", "Email", "Firstname", "Lastname", "Phone",
        "Created in", "Updated in", "Roles", "DELETE"
    ]

    return (
        <div id="admin-account">
            <ConfirmModel/>
            {accountList.length > 0 ? (
                <>
                    <PaginationAdmin
                        header={header}
                        data={accountList}
                        RenderComponent={AccountList}
                        pageLimit={5}
                        dataLimit={10}
                    />
                </>
                ) : (
                <h1>No Account to display</h1>
            )}
        </div>
    )
}