import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Category from "./components/category/Category";
import User from "./components/user/User";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="root">
        <Navbar />

        <Switch>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/product">
            <Product/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/signin">
            <Signin/>
          </Route>
          <Route exact path="/category">
            <Category/>
          </Route>
          <Route exact path="/user">
            <User/>
          </Route>
        </Switch>           
      </div>
    </BrowserRouter>
  );
}

export default App;
