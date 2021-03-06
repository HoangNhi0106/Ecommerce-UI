import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import axios from 'axios';
import './AdminSite.css';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModel from '../confirm model/ConfirmModel';
import {PaginationAdmin} from '../../utils/pagination/Pagination';

const CreateNewCategory = ({isShowCreate}) => {  
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [cname, setCname] = useState("");
    const [description, setDescription] = useState("");


    const handleCreateCategorySubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/category/save";
        const data = {
            cname, description
        }

        await axios.post(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(response => {
            alert("Create Category successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className={`${isShowCreate ? "show" : ""} form-admin`}>
            <p>CREATE NEW CATEGORY</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name" required
                        onChange={({ target }) => setCname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description"
                        onChange={({ target }) => setDescription(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleCreateCategorySubmit}>SAVE</button>
        </div>
    )
}

const EditCategory = (props) => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [cname, setCname] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setCname(props.editCategory.cname);
        setDescription(props.editCategory.description);
    }, [props]);


    const handleEditCategorySubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/category/update";
        const data = {
            categoryId: props.editCategory.categoryId, cname, description
        }

        console.log(data);
        await axios.put(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Update Category successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className={`${props.isShowEdit ? "show" : ""} form-admin`}>
            <p>EDIT CATEGORY</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name" value={cname} required
                        onChange={({ target }) => setCname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description" value={description}
                        onChange={({ target }) => setDescription(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleEditCategorySubmit}>SAVE</button>
        </div>
    )
}

export const AdminCategory = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [categoryList, setCategoryList] = useState([]);
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [editCategory, setEditCategory] = useState(0);
    const [search, setSearch] = useState(""); 
    const {confirm} = useConfirm();
    let Url = "http://localhost:8080/ecommerce-api/admin/category";

    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`}
        })
            .then(response => setCategoryList(response.data.data));
    }, []);

    const handleIsShowCreate = () => {
        setIsShowCreate(isShowCreate => !isShowCreate);
    }

    const handleIsShowEdit = (item) => {
        setIsShowEdit(isShowEdit => !isShowEdit);
        setEditCategory(item);
    }

    const DeleteCategory = (id) => {
        let Url = "http://localhost:8080/ecommerce-api/admin/category/delete/" + id;
        axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Category successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    const handleDeleteCategory = async (e, item) => {
        e.preventDefault();
        const isConfirmed = await confirm(`Do you want to delete category ${item.cname}?`);
        if (isConfirmed) 
            DeleteCategory(item.categoryId);
    }

    const header = [
        "ID",  "Category Name", "Created in", "Updated in", "Description", "BUTTON"
    ]

    const CategoryList = (props) => {
        return (
            <tr key={props.data.categoryId}>
                <td>{props.data.categoryId}</td>
                <td>{props.data.cname}</td>
                <td>{props.data.createdIn}</td>
                <td>{props.data.updatedIn}</td>
                <td>{props.data.description}</td>
                <td>
                    <button className="delete-btn" onClick={(e) => handleDeleteCategory(e, props.data)}>X</button>
                    <button className="edit-btn" onClick={() => handleIsShowEdit(props.data)}>E</button>
                </td>
            </tr>
        )
    }

    const SearchCategory = (event) => {
        if (event.key === 'Enter') {
            if (search != null) {
                axios.get(`http://localhost:8080/ecommerce-api/admin/category/search=${search}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Authorization": `${user.tokenType} ${user.accessToken}`}
            })
                .then(response => setCategoryList(response.data.data));
            } else {
                axios.get(Url, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                        "Authorization": `${user.tokenType} ${user.accessToken}`}
                })
                    .then(response => setCategoryList(response.data.data));
            }
        } 
    }

    return (
        <div id="admin-category">
            <ConfirmModel/>
            <CreateNewCategory isShowCreate={isShowCreate}/>
            <EditCategory isShowEdit={isShowEdit} editCategory={editCategory}/>
            <div className="manage">
                 <input type="text" className = "admin-search" placeholder="search category name" 
                    onChange={({ target }) => setSearch(target.value)}
                    onKeyPress={event => SearchCategory(event)}/>
                <button className="create-btn" onClick={handleIsShowCreate}>CREATE NEW CATEGORY</button>
            </div>
            {categoryList.length > 0 ? (
                <>
                    <PaginationAdmin
                        header={header}
                        data={categoryList}
                        RenderComponent={CategoryList}
                        pageLimit={5}
                        dataLimit={10}
                    />
                </>
                ) : (
                <h1>No Category to display</h1>
            )}
        </div>
    )
}