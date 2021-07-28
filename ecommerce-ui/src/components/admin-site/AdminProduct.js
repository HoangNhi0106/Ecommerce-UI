import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './AdminSite.css';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModel from '../confirm model/ConfirmModel';
import { ConfirmContext } from '../../store/ConfirmContext';

const CreateNewProduct = ({isShowCreate}) => {
    const [user, setUser] = useState();  
    const [pname, setPname] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
      }, []);

    const SaveWithImage = (formData) => {
        let UrlImage = "http://localhost:8080/ecommerce-api/admin/image/save";
        let UrlProduct = "http://localhost:8080/ecommerce-api/admin/product/save";
        
        axios.post(UrlImage, 
            formData, {
                headers : {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `${user.tokenType} ${user.accessToken}`
                } 
            }).then(response => {
                //save product 
                axios.post(UrlProduct, {
                    pname, categoryName, image: response.data.data.imageId, description, price, amount
                }, {
                    headers : {
                        "Content-Type": "application/json",
                        'Authorization': `${user.tokenType} ${user.accessToken}`
                    }
                }).then(() => {
                    alert("Create Product successful!");
                    window.location.reload();
                }).catch(err => console.log(err)); 
            })
            .catch(err => console.log(err));
    }

    const SaveWithoutImage = () => {
        let UrlProduct = "http://localhost:8080/ecommerce-api/admin/product/save";
        axios.post(UrlProduct, {
            pname, categoryName, image: null, description, price, amount
        }, {
            headers : {
                "Content-Type": "application/json",
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Create Product successful!");
            window.location.reload();
        }).catch(err => console.log(err)); 
    }

    const HandleCreateProductSubmit = async e => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", image);

        if (image != null) 
            SaveWithImage(formData);
        else
            SaveWithoutImage();
    }

    return (
        <div className={`${isShowCreate ? "show" : ""} form-product`}>
            <p>CREATE NEW PRODUCT</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="product-name">PRODUCT NAME</label>
                    <input type="text" name="product-name" required
                        onChange={({ target }) => setPname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name" required
                        onChange={({ target }) => setCategoryName(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="image">IMAGE</label>
                    <input type="file" name="image" 
                        onChange={({ target }) => setImage(target.files[0])}/>
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
            <button type="submit" className="submit-btn" onClick={HandleCreateProductSubmit}>SAVE</button>
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
    const [image, setImage] = useState(null);

    useEffect(() => {
        setPname(product.pname);
        setCategoryName(product.categoryName);
        setAmount(product.amount);
        setPrice(product.setPrice);
        setDescription(product.description);
        //get current user
        const checkUser = localStorage.getItem("user");
        if (checkUser)
            setUser(JSON.parse(checkUser));
    }, []);

    const UpdateWithImage = (formData) => {
        let UrlImage = "http://localhost:8080/ecommerce-api/admin/image/save";
        let UrlProduct = "http://localhost:8080/ecommerce-api/admin/product/update";
        axios.post(UrlImage, 
            formData, {
                headers : {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `${user.tokenType} ${user.accessToken}`
                } 
            }).then(response => {
                //save product 
                axios.put(UrlProduct, {
                    productId: product.productId, pname, categoryName, image: response.data.data.imageId, description, price, amount
                }, {
                    headers : {
                        "Content-Type": "application/json",
                        'Authorization': `${user.tokenType} ${user.accessToken}`
                    }
                }).then(() => {
                    alert("Update Product successful!");
                    window.location.reload();
                }).catch(err => console.log(err)); 
            })
            .catch(err => console.log(err));
    }

    const UpdateWithoutImage = () => {
        let UrlProduct = "http://localhost:8080/ecommerce-api/admin/product/update";
        axios.put(UrlProduct, {
            productId: product.productId, pname, categoryName, image: null, description, price, amount
        }, {
            headers : {
                "Content-Type": "application/json",
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Update Product successful!");
            window.location.reload();
        }).catch(err => console.log(err)); 
    }

    const HandleEditProductSubmit = async e => {
        e.preventDefault();
        //save image
        let formData = new FormData();
        formData.append("file", image);
        
        if (image != null) 
            UpdateWithImage(formData);
        else
            UpdateWithoutImage();
    }

    return (
        <div className={`${props.isShowEdit ? "show" : ""} form-product`}>
            <p>EDIT PRODUCT</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="product-name">PRODUCT NAME</label>
                    <input type="text" name="product-name" value={pname} required
                        onChange={({ target }) => setPname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <input type="text" name="category-name" value={categoryName} required
                        onChange={({ target }) => setCategoryName(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="image">IMAGE</label>
                    <input type="file" name="image" 
                        onChange={({ target }) => setImage(target.files[0])}/>
                </div>
                <div className="data">
                    <label htmlFor="amount">AMOUNT</label>
                    <input type="number" name="amount" min="0" value={amount} 
                        onChange={({ target }) => setAmount(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="price">PRICE</label>
                    <input type="number" name="price" min="0" value={price} 
                        onChange={({ target }) => setPrice(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description" value={description} 
                        onChange={({ target }) => setDescription(target.value)}/>
                </div>
            </form>
            <button type="submit" className="submit-btn" onClick={HandleEditProductSubmit}>SAVE</button>
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
    const {confirm} = useConfirm();
    const {state} = useContext(ConfirmContext);
    const [update, setUpdate] = useState(false);
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


    const DeleteProduct = (id) => {
        let Url = "http://localhost:8080/ecommerce-api/admin/product/delete/" + id;
        
        axios.delete(Url, {
            headers : {
                'Authorization': `${user.tokenType} ${user.accessToken}`
            }
        }).then(() => {
            alert("Delete Product successful!");
            window.location.reload();
        }).catch(err => console.log(err));
    }
    
    const handleDeleteProduct = async (e, id) => {
        e.preventDefault();
        const isConfirmed = await confirm('Do you want to delete?');
        if (isConfirmed) 
            DeleteProduct(id);
        await setUpdate(update => !update);
    }

    return (
        <div id="admin-product">
            <ConfirmModel update={update}/>
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
                    <th>Image URL</th>
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
                        <td><a href={item.image}>{item.image}</a></td>
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