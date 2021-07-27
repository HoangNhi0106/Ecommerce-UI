import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Category from "./components/category/Category";
import User from "./components/user/User";
import AdminSite from "./components/admin-site/AdminSite";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  const [isShowSignin, setIsShowSignin] = useState(false);
  const [isShowSignup, setIsShowSignup] = useState(false);

  const handleSigninClick = () => {
    setIsShowSignup(false);
    setIsShowSignin((isShowSignin) => !isShowSignin);
  }

  const handleSignupClick = () => {
    setIsShowSignin(false);
    setIsShowSignup((isShowSignup) => !isShowSignup);
  }

  return (
    <BrowserRouter>
      <div className="root">
        <Navbar handleSigninClick={handleSigninClick} handleSignupClick={handleSignupClick}/>
        <Signin isShowSignin={isShowSignin} handleSigninClick={handleSigninClick}/>
        <Signup isShowSignup={isShowSignup} handleSignupClick={handleSignupClick}/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/product">
            <Product/>
          </Route>
          <Route path="/category">
            <Category/>
          </Route>
          <Route path="/user">
            <User/>
          </Route>
          <Route path="/admin">
            <AdminSite/>
          </Route>
        </Switch>           
      </div>
    </BrowserRouter>
  );
}

export default App;
