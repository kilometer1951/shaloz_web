import React, { useState } from "react";
import Colors from "constants/Colors";
import OutsideClickHandler from "react-outside-click-handler";
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";


const styles = {
  
  previousPrice: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginLeft: 5,
    fontFamily: "poppins_regular",
  },
  productContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
  },
};

const ShopsInterestedIn = (props) => {
const {shopsData} = props
  const dispatch = useDispatch();
  const fetchedProductsCategory = useSelector(
    (state) => state.app.fetchedProductsCategory
  );

  const user = useSelector((state) => state.auth.user);

  const truncateString = (str, truncNum) => {
    if (str.length > truncNum) {
      return str.slice(0, truncNum) + " . . .";
    } else {
      return str;
    }
}

  const renderBottom =
  shopsData != undefined &&
  shopsData.map((result, index) => (
      <div className="product-2" key={index}>
        <div onClick={() => alert("")}>
          <img src={result.shop_logo} />
          <p style={{ fontFamily: "poppins_regular" }}>{truncateString(result.shop_name, 20)}</p>
          {result.offers_free_shipping && (
            <div
              style={{
                backgroundColor: "#a5d6a7",
                width: 140,
                borderRadius: 25,
                paddingLeft: 5,
                paddingRight: 5,
              }}>
              <p style={{ fontFamily: "poppins_regular", fontSize: 13, }}>
                OFFERS FREE shipping
              </p>
            </div>
          )}
        </div>
      </div>
    ));

  return (
    <div>
      <div className="bottom-section-three">
        <p style={{ fontFamily: "poppins_regular", fontSize: 30 }}>
          Stores you might be interested in
        </p>
      </div>
      <div className="product-header-container-2">
        <div className="inner-product-container-2">{renderBottom}</div>
      </div>
    </div>
  );
};

export default ShopsInterestedIn;

// object-fit: cover;
// /*object-fit: contain;
// object-fit: scale-down;
// object-position: -10% 0;
// object-fit: none;
// object-fit: fill;*/
