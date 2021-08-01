import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './AdminSite.css';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModel from '../confirm model/ConfirmModel';
import {PaginationAdmin} from '../../utils/pagination/Pagination';

const CreateNewBrand = ({isShowCreate}) => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [bname, setBname] = useState("");
    const [madeIn, setMadeIn] = useState("");

    const handleCreateBrandSubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/brand/save";
        const data = {
            bname, madeIn
        }

        await axios.post(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Create Brand successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className={`${isShowCreate ? "show" : ""} form-admin`}>
            <p>CREATE NEW BRAND</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="brand-name">BRAND NAME</label>
                    <input type="text" name="brand-name" required
                        onChange={({ target }) => setBname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="made-in">MADE IN</label>
                    <input type="text" name="made-in"
                        onChange={({ target }) => setMadeIn(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleCreateBrandSubmit}>SAVE</button>
        </div>
    )
}

const EditBrand = (props) => {
    const [bname, setBname] = useState("");
    const [madeIn, setMadeIn] = useState("");
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 

    useEffect(() => {
        setBname(props.editBrand.bname);
        setMadeIn(props.editBrand.madeIn);
    }, [props]);

    const handleEditBrandSubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/brand/update";
        const data = {
            brandId: props.editBrand.brandId , bname, madeIn
        }
        await axios.put(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Update Brand successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className={`${props.isShowEdit ? "show" : ""} form-admin`}>
            <p>EDIT BRAND</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="brand-name">BRAND NAME</label>
                    <input type="text" name="brand-name" value={bname} required
                        onChange={({ target }) => setBname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="made-in">MADE IN</label>
                    <input type="text" name="made-in" value={madeIn}
                        onChange={({ target }) => setMadeIn(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleEditBrandSubmit}>SAVE</button>
        </div>
    )
}

export const AdminBrand = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [brandList, setBrandList] = useState([]);
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [editBrand, setEditBrand] = useState(0);
    const [search, setSearch] = useState(""); 
    const {confirm} = useConfirm();
    let Url = "http://localhost:8080/ecommerce-api/admin/brand";

    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`}
        })
            .then(response => setBrandList(response.data.data));
        
    }, []);

    const handleIsShowCreate = () => {
        setIsShowCreate(isShowCreate => !isShowCreate);
    }

    const handleIsShowEdit = (item) => {
        setIsShowEdit(isShowEdit => !isShowEdit);
        setEditBrand(item);
    }

    const DeleteBrand = (id) => {
        console.log(id);
        let Url = "http://localhost:8080/ecommerce-api/admin/brand/delete/" + id;
        axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Brand successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    const handleDeleteBrand = async (e, item) => {
        e.preventDefault();
        const isConfirmed = await confirm(`Do you want to delete brand ${item.bname}?`);
        if (isConfirmed) 
            DeleteBrand(item.brandId);
    }

    const header = [
        "ID",  "Brand Name", "Made In", "Created in", "Updated in", "BUTTON"
    ]

    const BrandList = (props) => {
        return (
            <tr key={props.data.brandId}>
                <td>{props.data.brandId}</td>
                <td>{props.data.bname}</td>
                <td>{props.data.madeIn}</td>
                <td>{props.data.createdIn}</td>
                <td>{props.data.updatedIn}</td>
                <td>
                    <button className="delete-btn" onClick={(e) => handleDeleteBrand(e, props.data)}>X</button>
                    <button className="edit-btn" onClick={() => handleIsShowEdit(props.data)}>E</button>
                </td>
            </tr>
        )
    }

    const SearchBrand = (event) => {
        if (event.key === 'Enter') {
            if (search != null) {
                axios.get(`http://localhost:8080/ecommerce-api/admin/brand/search=${search}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Authorization": `${user.tokenType} ${user.accessToken}`}
            })
                .then(response => setBrandList(response.data.data));
            } else {
                axios.get(Url, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                        "Authorization": `${user.tokenType} ${user.accessToken}`}
                })
                    .then(response => setBrandList(response.data.data));
            }
        } 
    }

    return (
        <div id="admin-brand">
            <ConfirmModel/>
            <CreateNewBrand isShowCreate={isShowCreate}/>
            <EditBrand isShowEdit={isShowEdit} editBrand={editBrand}/>
            <div className="manage">
                <input type="text" className = "admin-search" placeholder="search brand name" 
                    onChange={({ target }) => setSearch(target.value)}
                    onKeyPress={event => SearchBrand(event)}/>
                <button className="create-btn" onClick={handleIsShowCreate}>CREATE NEW BRAND</button>
            </div>
            {brandList.length > 0 ? (
                <>
                    <PaginationAdmin
                        header={header}
                        data={brandList}
                        RenderComponent={BrandList}
                        pageLimit={5}
                        dataLimit={10}
                    />
                </>
                ) : (
                <h1>No Brand to display</h1>
            )}
        </div>
    )
}