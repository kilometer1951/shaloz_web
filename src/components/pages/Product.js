import React, { useEffect, useState } from "react";
import Header from "components/Header";
import ProductHeader from "components/Product/ProductHeader";
import ProductSectionOne from "components/Product/ProductSectionOne";
import ProductSectionTwo from "components/Product/ProductSectionTwo";
import ProductSectionThree from "components/Product/ProductSectionThree";
import Footer from "components/Footer";
import { LinearProgress } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";

const Product = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(true);
  const [page, setPage] = useState(2);
  const user = useSelector((state) => state.auth.user);
  const category = props.match.params.product_category;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsloading(true);
        await dispatch(actions.fetchProducts(user._id, category, 1));
         setIsloading(false);
      } catch (e) {
        setIsloading(false)
        dispatch(actions.handleNetworkerror(true))
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Header history={props.history}/>
      {isLoading ? (
          <LinearProgress variant="query"/>
      ) : (
        <div>
          <ProductHeader category={category} history= {props.history}/>
          <ProductSectionOne history= {props.history}/>
          <ProductSectionTwo  category={category} history= {props.history}/>
          <ProductSectionThree history= {props.history}/>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Product;
