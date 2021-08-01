import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './AdminSite.css';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModel from '../confirm model/ConfirmModel';
import {PaginationAdmin} from '../../utils/pagination/Pagination';
import { useHistory } from 'react-router-dom';

const CreateNewProduct = ({isShowCreate}) => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [pname, setPname] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [brandName, setBrandName] = useState(null);
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [volume, setVolume] = useState(null);
    const [madeIn, setMadeIn] = useState(null);
    const [skinType, setSkinType] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);

    useEffect(async () => {
        //get category list
        axios.get("http://localhost:8080/ecommerce-api/admin/category", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`}
        })
            .then(response => {
                setCategoryList(response.data.data);
                if (response.data.data[0] != null)
                    setCategoryName(response.data.data[0].cname);
            });

        //get brand list
        axios.get("http://localhost:8080/ecommerce-api/admin/brand", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`}
        })
            .then(response => {
                setBrandList(response.data.data);
                if (response.data.data[0] != null)
                    setBrandName(response.data.data[0].bname);
            });
        
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
                    pname, categoryName, brandName, image: response.data.data.imageId, description, price, amount, volume, madeIn, skinType
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
            pname, categoryName, brandName, image: null, description, price, amount, volume, madeIn, skinType
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

        const data = {
            pname, categoryName, brandName, image: null, description, price, amount, volume, madeIn, skinType
        }

        console.log(data);

        if (image != null) 
            SaveWithImage(formData);
        else
            SaveWithoutImage();
    }

    return (
        <div className={`${isShowCreate ? "show" : ""} form-admin`}>
            <p>CREATE NEW PRODUCT</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="product-name">PRODUCT NAME</label>
                    <input type="text" name="product-name" required
                        onChange={({ target }) => setPname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <select name="category-name" value={categoryName}
                        onChange={({ target }) => setCategoryName(target.value)}>
                        {categoryList.map(item => <option key={item.categoryId} value={item.cname}>{item.cname}</option>)}
                    </select>
                </div>
                <div className="data">
                    <label htmlFor="image">IMAGE</label>
                    <input type="file" name="image" 
                        onChange={({ target }) => setImage(target.files[0])}/>
                </div>
                <div className="data">
                    <label htmlFor="brand-name">BRAND NAME</label>
                    <select name="brand-name" value={brandName}
                        onChange={({ target }) => setBrandName(target.value)}>
                        {brandList.map(item => <option key={item.brandId} value={item.bname}>{item.bname}</option>)}
                    </select>
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
                    <label htmlFor="volume">VOLUME</label>
                    <input type="text" name="volume"
                        onChange={({ target }) => setVolume(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="made-in">MADE IN</label>
                    <input type="text" name="made-in"
                        onChange={({ target }) => setMadeIn(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="skintype">SKIN TYPE</label>
                    <input type="text" name="skintype" 
                        onChange={({ target }) => setSkinType(target.value)}/>
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
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 
    const [pname, setPname] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [volume, setVolume] = useState("");
    const [madeIn, setMadeIn] = useState("");
    const [skinType, setSkinType] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);

    useEffect(() => {
        setPname(props.editProduct.pname);
        setCategoryName(props.editProduct.categoryName);
        setAmount(props.editProduct.amount);
        setPrice(props.editProduct.price);
        setBrandName(props.editProduct.brandName);
        setMadeIn(props.editProduct.madeIn);
        setSkinType(props.editProduct.skinType);
        setVolume(props.editProduct.volume);
        setDescription(props.editProduct.description);
    }, [props]);

    useEffect(() => {
        //get category list
        axios.get("http://localhost:8080/ecommerce-api/admin/category", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`}
        })
            .then(response => setCategoryList(response.data.data));
        //get brand list
        axios.get("http://localhost:8080/ecommerce-api/admin/brand", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Authorization": `${user.tokenType} ${user.accessToken}`}
        })
            .then(response => setBrandList(response.data.data));
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
                    productId: props.editProduct.productId, pname, brandName, categoryName, image: response.data.data.imageId, description, price, amount
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
            productId: props.editProduct.productId, pname, brandName, categoryName, image: null, description, price, amount
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
        <div className={`${props.isShowEdit ? "show" : ""} form-admin`}>
            <p>EDIT PRODUCT</p>
            <form className="admin-form">
                <div className="data">
                    <label htmlFor="product-name">PRODUCT NAME</label>
                    <input type="text" name="product-name" value={pname} required
                        onChange={({ target }) => setPname(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="category-name">CATEGORY NAME</label>
                    <select name="category-name" value={categoryName}
                        onChange={({ target }) => setCategoryName(target.value)}>
                        {categoryList.map(item => <option key={item.categoryId} value={item.cname}>{item.cname}</option>)}
                    </select>
                </div>
                <div className="data">
                    <label htmlFor="image">IMAGE</label>
                    <input type="file" name="image" 
                        onChange={({ target }) => setImage(target.files[0])}/>
                </div>
                <div className="data">
                    <label htmlFor="brand-name">BRAND NAME</label>
                    <select name="brand-name" value={brandName}
                        onChange={({ target }) => setBrandName(target.value)}>
                        {brandList.map(item => <option key={item.brandId} value={item.bname}>{item.bname}</option>)}
                    </select>
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
                    <label htmlFor="volume">VOLUME</label>
                    <input type="text" name="volume" value={volume}
                        onChange={({ target }) => setVolume(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="made-in">MADE IN</label>
                    <input type="text" name="made-in" value={madeIn}
                        onChange={({ target }) => setMadeIn(target.value)}/>
                </div>
                <div className="data">
                    <label htmlFor="skintype">SKIN TYPE</label>
                    <input type="text" name="skintype" value={skinType}
                        onChange={({ target }) => setSkinType(target.value)}/>
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
    const [editProduct, setEditProduct] = useState(0);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [search, setSearch] = useState(""); 
    const {confirm} = useConfirm();
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
    
    const handleDeleteProduct = async (e, item) => {
        e.preventDefault();
        const isConfirmed = await confirm(`Do you want to delete product ${item.pname}?`);
        if (isConfirmed) 
            DeleteProduct(item.productId);
    }

    const ProductList = (props) => {
        return (
            <tr key={props.data.productId} >
                <td>{props.data.productId}</td>
                <td>{props.data.pname}</td>
                <td>{props.data.categoryName}</td>
                <td>{props.data.brandName}</td>
                <td><a href={props.data.image}>{props.data.image}</a></td>
                <td>{props.data.amount}</td>
                <td>{props.data.sold}</td>
                <td>{props.data.price}</td>
                <td>{props.data.rating}</td>
                <td>{props.data.volume}</td>
                <td>{props.data.madeIn}</td>
                <td>{props.data.skinType}</td>
                <td>{props.data.description}</td>
                <td>{props.data.createdIn}</td>
                <td>{props.data.updatedIn}</td>
                <td>
                    <button className="delete-btn" onClick={(e) => handleDeleteProduct(e, props.data)}>X</button>
                    <button className="edit-btn" onClick={() => handleIsShowEdit(props.data)}>E</button>
                </td>
            </tr>
        )
    }

    const header = [
        "ID", "Product Name", "Category Name", "Brand Name", "Image URL", "Amount", "Sold", "Price", "Rating", 
        "Volume", "Made In", "Skin Type", "Description",
        "Created in", "Updated in", "BUTTON"
    ]

    const SearchProduct = (event) => {
        if (event.key === 'Enter') {
            if (search != null) {
                axios.get(`http://localhost:8080/ecommerce-api/admin/product/search=${search}`, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Authorization": `${user.tokenType} ${user.accessToken}`}
            })
                .then(response => setProductList(response.data.data));
            } else {
                axios.get(Url, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                        "Authorization": `${user.tokenType} ${user.accessToken}`}
                })
                    .then(response => setProductList(response.data.data));
            }
        } 
    }

    return (
        <div id="admin-product">
            <ConfirmModel/>
            <CreateNewProduct isShowCreate={isShowCreate}/>
            <EditProduct isShowEdit={isShowEdit} editProduct={editProduct}/>
            <div className="manage">
                <input type="text" className = "admin-search" placeholder="search product" 
                    onChange={({ target }) => setSearch(target.value)}
                    onKeyPress={event => SearchProduct(event)}/>
                <button className="create-btn" onClick={handleIsShowCreate}>CREATE NEW PRODUCT</button>
            </div>
            {productList.length > 0 ? (
                <>
                    <PaginationAdmin
                        header={header}
                        data={productList}
                        RenderComponent={ProductList}
                        pageLimit={5}
                        dataLimit={10}
                    />
                </>
                ) : (
                <h1>No Product to display</h1>
            )}
        </div>
    )
}