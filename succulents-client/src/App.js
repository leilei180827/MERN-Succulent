import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import AppNavbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import ProductDetailInfo from "./components/ProductDetailInfo";
import CategoryProducts from "./components/CategoryProducts";
import AllProducts from "./components/AllProducts";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import SearchProducts from "./components/SearchProducts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <AppNavbar />
          <Switch>
            <Route
              path="/collections/:category/:name"
              component={ProductDetailInfo}
            />
            <Route path="/collections/:category" component={CategoryProducts} />
            <Route path="/collections" component={AllProducts} />
            <Route path="/cart" component={Cart} />
            <Route path="/search" component={SearchProducts} />
            <Route path="/" exact component={MainPage} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
