import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import axios from 'axios';
import './AdminSite.css';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModel from '../confirm model/ConfirmModel';
import {PaginationAdmin} from '../../utils/pagination/Pagination';

const EditAccount = (props) => {
    const account = props.editAccount;
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [roles, setRoles] = useState([]);
    const [adminRole, setAdminRole] = useState(false);
    const [userRole, setUserRole] = useState(false);

    useEffect(() => {
        setRoles([]);
    }, []);


    const handleEditAccountSubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/account/update";
        setRoles([]);
        if (adminRole) roles.push("admin");
        if (userRole) roles.push("user");
        const data = {
            accountId: account.accountId, roles
        }
        console.log(data);
        await axios.put(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Update Account successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className={`${props.isShowEdit ? "show" : ""} form-admin`}>
            <p>EDIT ACCOUNT ROLES</p>
            <form className="admin-form">
                <div className="data-check">
                    <label htmlFor="admin-role">ADMIN_ROLE</label>
                    <input type="checkbox" name="admin-role" onClick={() => setAdminRole(true)}/>
                </div>
                <div className="data-check">
                    <label htmlFor="user-role">USER_ROLE</label>
                    <input type="checkbox" name="user-role" onClick={() => setUserRole(true)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleEditAccountSubmit}>SAVE</button>
        </div>
    )
}

export const AdminAccount = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [accountList, setAccountList] = useState([]);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [editAccount, setEditAccount] = useState(0);
    const [search, setSearch] = useState(""); 
    const {confirm} = useConfirm();
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

    const handleIsShowEdit = (item) => {
        setIsShowEdit(isShowEdit => !isShowEdit);
        setEditAccount(item);
    }

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
    }


    const AccountList = (props) => {
        let role = [];
        {props.data.roles.map(
            item => role.push(item.rname)
        )}
        console.log(role);
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
                <td>
                    <button className="delete-btn" onClick={(e) => handleDeleteAccount(e, props.data)}>X</button>
                    <button className="edit-btn" onClick={() => handleIsShowEdit(props.data)}>E</button>
                </td>
            </tr>
        )
    }

    const header = [
        "ID", "Username", "Email", "Firstname", "Lastname", "Phone",
        "Created in", "Updated in", "Roles", "BUTTON"
    ]

    const SearchAccount = (event) => {
        if (event.key === 'Enter') {
            if (search != null) {
                axios.get(`http://localhost:8080/ecommerce-api/admin/account/search=${search}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Authorization": `${user.tokenType} ${user.accessToken}`}
            })
                .then(response => setAccountList(response.data.data));
            } else {
                axios.get(Url, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                        "Authorization": `${user.tokenType} ${user.accessToken}`}
                })
                    .then(response => setAccountList(response.data.data));
            }
        } 
    }

    return (
        <div id="admin-account">
            <ConfirmModel/>
            <EditAccount isShowEdit={isShowEdit} editAccount={editAccount}/>
            <div className="manage">
                 <input type="text" className = "admin-search" placeholder="search by username" 
                    onChange={({ target }) => setSearch(target.value)}
                    onKeyPress={event => SearchAccount(event)}/>
            </div>
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