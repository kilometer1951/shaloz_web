import React, { useEffect, useState } from "react";
import "styles/product.css";
import { useSelector, useDispatch } from "react-redux";

const ShopHeader = (props) => {
  const {shop_header_products} = props

  const displayPrice = (product_price, discount) => {
    if (discount === "") {
      return product_price;
    } else {
      let price = parseInt(product_price);
      let _discount = parseInt(discount);

      let total_d = _discount / 100;
      let total_p = price * total_d;
      let total = price - total_p;

      return total;
    }
  };


  const renderHeaderImage = shop_header_products.map((result, index) => (
    <div className="product" key={index}>
      <div onClick={() => props.history.push("/single_product_page/"+result._id)}>
        <div className="product-discount">
          <p>${displayPrice(result.product_price, result.discount)}</p>
        </div>
        <img src={result.main_image} />
      </div>
    </div>
  ));

  

  return (
    <div className="product-header-container">
      <div className="inner-product-container">{renderHeaderImage}</div>
     
    </div>
  );
};

export default ShopHeader;
