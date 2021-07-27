import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import axios from 'axios';
import './AdminSite.css';

const CreateNewProduct = ({isShowCreate}) => {
    const [user, setUser] = useState();  
    const [pname, setPname] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
      }, []);


    const handleCreateProductSubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/product/save";
        const data = {
            pname, categoryName, description, price, amount
        }

        await axios.post(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(response => {
            alert("Create Product successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className={`${isShowCreate ? "show" : ""} form-product`}>
            <p>CREATE NEW PRODUCT</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="product-name">PRODUCT NAME</label>
                    <input type="text" name="product-name"
                        onChange={({ target }) => setPname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name"
                        onChange={({ target }) => setCategoryName(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="amount">AMOUNT</label>
                    <input type="number" name="amount" min="0"
                        onChange={({ target }) => setAmount(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="price">PRICE</label>
                    <input type="number" name="price" min="0"
                        onChange={({ target }) => setPrice(target.value)}/>
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

const EditProduct = (props) => {
    const product = props.editProduct;
    const [user, setUser] = useState();  
    const [pname, setPname] = useState(product.pname);
    const [categoryName, setCategoryName] = useState(product.categoryName);
    const [amount, setAmount] = useState(product.amount);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    useEffect(() => {
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
    }, []);

    const handleEditProductSubmit = async e => {
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/product/update";
        const data = {
            productId: product.productId, pname, categoryName, description, price, amount
        }

        console.log(data);
        await axios.put(Url, data, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Update Product successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className={`${props.isShowEdit ? "show" : ""} form-product`}>
            <p>EDIT PRODUCT</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="product-name">PRODUCT NAME</label>
                    <input type="text" name="product-name" placeholder={product.pname}
                        onChange={({ target }) => setPname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name" placeholder={product.categoryName}
                        onChange={({ target }) => setCategoryName(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="amount">AMOUNT</label>
                    <input type="number" name="amount" min="0" placeholder={product.amount}
                        onChange={({ target }) => setAmount(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="price">PRICE</label>
                    <input type="number" name="price" min="0" placeholder={product.price}
                        onChange={({ target }) => setPrice(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description" placeholder={product.description}
                        onChange={({ target }) => setDescription(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={handleEditProductSubmit}>SAVE</button>
        </div>
    )
}

export const AdminProduct = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [productList, setProductList] = useState([]);
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [editProduct, setEditProduct] = useState(0);
    let Url = "http://localhost:8080/ecommerce-api/admin/product";

    useEffect(() => {
        axios.get(Url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`}
        })
            .then(response => setProductList(response.data.data));
    }, []);

    const handleIsShowCreate = () => {
        setIsShowCreate(isShowCreate => !isShowCreate);
        
    }

    const handleIsShowEdit = (item) => {
        setIsShowEdit(isShowEdit => !isShowEdit);
        setEditProduct(item);
    }

    const handleDeleteProduct = async (e, id) => {
        console.log(id);
        e.preventDefault();
        let Url = "http://localhost:8080/ecommerce-api/admin/product/delete/" + id;
        
        await axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Product successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div id="admin-product">
            <CreateNewProduct isShowCreate={isShowCreate}/>
            <EditProduct isShowEdit={isShowEdit} editProduct={editProduct}/>
            <div className="manage">
                <button className="create-btn" onClick={handleIsShowCreate}>CREATE NEW PRODUCT</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category Name</th>
                    <th>Amount</th>
                    <th>Sold</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Created in</th>
                    <th>Updated in</th>
                    <th>Description</th>
                    <th>DELETE</th>
                </tr>
                </thead>
                <tbody>
                {productList.sort((a, b) => (a.productId > b.productId) ? 1 : -1).map(item => 
                    <tr key={item.productId} >
                        <td>{item.productId}</td>
                        <td onClick={() => handleIsShowEdit(item)}>{item.pname}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.amount}</td>
                        <td>{item.sold}</td>
                        <td>{item.price}</td>
                        <td>{item.rating}</td>
                        <td>{item.createdIn}</td>
                        <td>{item.updatedIn}</td>
                        <td>{item.description}</td>
                        <td><button className="delete-btn" onClick={(e) => handleDeleteProduct(e, item.productId)}>X</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}