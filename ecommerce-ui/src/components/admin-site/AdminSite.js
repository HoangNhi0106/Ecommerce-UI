import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminSite.css';
import { AdminProduct } from './AdminProduct';
import { AdminCategory } from './AdminCategory';
import { AdminRating } from './AdminRating';
import { AdminAccount } from './AdminAccount';
import { AdminBrand } from './AdminBrand';

const AdminSite = () => {
    const checkUser = localStorage.getItem("user");
    const [user, setUser] = useState(JSON.parse(checkUser)); 

    if (user == null || !user.roles.includes("ROLE_ADMIN"))
        return (
            <h1>NOT ALLOWED</h1>
        )
    return (
        <div className="admin-site">
            <div className="sidebar">
                <Link to="/admin/account" className="sidebar-item">ACCOUNT</Link>
                <Link to="/admin/product" className="sidebar-item">PRODUCT</Link>
                <Link to="/admin/category" className="sidebar-item">CATEGORY</Link>
                <Link to="/admin/brand" className="sidebar-item">BRAND</Link>
                <Link to="/admin/rating" className="sidebar-item">RATING</Link>
            </div>
            <div className="admin-view">
                <Switch>
                    <Route path="/admin/account">
                        <AdminAccount />
                    </Route>
                    <Route path="/admin/product">
                        <AdminProduct />
                    </Route>
                    <Route path="/admin/category">
                        <AdminCategory />
                    </Route>
                    <Route path="/admin/brand">
                        <AdminBrand />
                    </Route>
                    <Route path="/admin/rating">
                        <AdminRating />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AdminSite;