import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { useTransition, animated } from "react-spring";
import jwtDecode from "jwt-decode";

import Home from "components/pages/Home";
import Product from "components/pages/Product";
import SingleProductPage from "components/pages/SingleProductPage";
import AllProducts from "components/pages/AllProducts";
import Shop from "components/pages/Shop";
import Cart from "components/pages/Cart";

import App from "./components/App";


//const decode = 

const store = createStore(
  reducers,
  {
    auth: {
      user: localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token")).sub
        : {}
    },
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" component={Home} exact />
        <Route path="/product/:product_category" component={Product} />
        <Route path="/single_product_page/:product_id" component={SingleProductPage} />
        <Route path="/all_product" component={AllProducts} />
        <Route path="/shop/:shop_id" component={Shop} />
        <Route path="/cart" component={Cart} />
      </App>
    </BrowserRouter>
  </Provider>,

  document.querySelector("#root")
);
