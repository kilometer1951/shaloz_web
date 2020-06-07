import React, { useEffect, useState } from "react";
import "styles/product.css";
import { useSelector, useDispatch } from "react-redux";

const ProductHeader = (props) => {
  const fetchedProductsCategory = useSelector((state) => state.app.fetchedProductsCategory);

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
  let textToRender;

  if (props.category === "Jewelry") {
    textToRender = (
      <p style={{ fontFamily: "poppins_light", fontSize: 15 }}>
        A Moment of Precious Craft. Crafting your Curiosity
      </p>
    );
  }

  if (props.category === "Health & Beauty") {
    textToRender = (
      <p style={{ fontFamily: "poppins_light", fontSize: 15 }}>
        Beauty is power; a smile is its sword. Beauty is Whatever Brings Joy
      </p>
    );
  }

  if (props.category === "Home & Garden") {
    textToRender = (
      <p style={{ fontFamily: "poppins_light", fontSize: 15 }}>
        Be home. Items that make you feel a little happier
      </p>
    );
  }


  if (props.category === "Wedding, Party & Events") {
    textToRender = (
      <p style={{ fontFamily: "poppins_light", fontSize: 15 }}>
        To a lifetime of adventures together. Happily ever after begins here
      </p>
    );
  }

  if (props.category === "all") {
    textToRender = (
      <p style={{ fontFamily: "poppins_light", fontSize: 15 }}>
        Products that make you smile. Shop from the best!
      </p>
    );
  }


  const renderHeaderImage = fetchedProductsCategory.header_products != undefined && fetchedProductsCategory.header_products.slice(0, 6).map((result, index) => (
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
      <div className="product-bottom-header">
        <div>
          <p style={{ fontFamily: "poppins_regular", fontSize: 45 }}>
            {props.category === "all" ? "Shop from the best": props.category}
          </p>
          {textToRender}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
