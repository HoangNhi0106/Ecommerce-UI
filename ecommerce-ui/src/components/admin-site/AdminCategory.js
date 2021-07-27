import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import axios from 'axios';
import './AdminSite.css';

const CreateNewCategory = ({isShowCreate}) => {
    const [user, setUser] = useState();  
    const [cname, setCname] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
      }, []);


    const handleCreateProductSubmit = async e => {
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
        <div className={`${isShowCreate ? "show" : ""} form-product`}>
            <p>CREATE NEW CATEGORY</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name"
                        onChange={({ target }) => setCname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description"
                        onChange={({ target }) => setDescription(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleCreateProductSubmit}>SAVE</button>
        </div>
    )
}

const EditCategory = (props) => {
    const category = props.editCategory;
    const [user, setUser] = useState();  
    const [cname, setCname] = useState(category.cname);
    const [description, setDescription] = useState(category.description);

    useEffect(() => {
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
    }, []);


    const handleEditProductSubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/category/update";
        const data = {
            categoryId: category.categoryId, cname, description
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
        <div className={`${props.isShowEdit ? "show" : ""} form-product`}>
            <p>EDIT CATEGORY</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name" placeholder={category.cname}
                        onChange={({ target }) => setCname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description" placeholder={category.description}
                        onChange={({ target }) => setDescription(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleEditProductSubmit}>SAVE</button>
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

    const handleDeleteCategory = async (e, id) => {
        console.log(id);
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/category/delete/" + id;
        
        await axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Category successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div id="admin-product">
            <CreateNewCategory isShowCreate={isShowCreate}/>
            <EditCategory isShowEdit={isShowEdit} editCategory={editCategory}/>
            <div className="manage">
                <button className="create-btn" onClick={handleIsShowCreate}>CREATE NEW CATEGORY</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Created in</th>
                    <th>Updated in</th>
                    <th>Description</th>
                    <th>DELETE</th>
                </tr>
                </thead>
                <tbody>
                {categoryList.sort((a, b) => (a.categoryId > b.categoryId) ? 1 : -1).map(item => 
                    <tr key={item.categoryId}>
                        <td>{item.categoryId}</td>
                        <td onClick={() => handleIsShowEdit(item)}>{item.cname}</td>
                        <td>{item.createdIn}</td>
                        <td>{item.updatedIn}</td>
                        <td>{item.description}</td>
                        <td><button className="delete-btn" onClick={(e) => handleDeleteCategory(e, item.categoryId)}>X</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}