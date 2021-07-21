import React from "react";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Product from "./product/Product";
import { BrowserRouter, Switch, Route } from "react-router-dom";
class App extends React.Component {
  render() {
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
            </Switch>           
          </div>
        </BrowserRouter>
      );
  }
}

export default App;