import React, { useState } from "react";
import Colors from "constants/Colors";
import OutsideClickHandler from "react-outside-click-handler";
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import { Pagination } from "@material-ui/lab";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";

const styles = {
  discountContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#fff",
    marginTop: 5,
    marginLeft: 5,
    padding: 2,
    borderRadius: 5,
    opacity: 0.7,
  },
  previousPrice: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginLeft: 5,
    fontFamily: "poppins_regular",
  },
};

const RecentlyViewed = (props) => {
  const dispatch = useDispatch();
  const { recent_viewed } = props;

  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLaoding] = useState(false);

  const truncateString = (str) => {
    if (str.length > 50) {
      return str.slice(0, 50) + ". . .";
    } else {
      return str;
    }
  };

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

  const renderHeaderImage =  recent_viewed !== undefined && recent_viewed.map((result, index) => (
    <div className="product" key={index}>
      <div
        onClick={() =>
          (window.location.href = "/single_product_page/" + result.product._id)
        }>
        <div className="product-discount">
          <p>
            $
            {displayPrice(
              result.product.product_price,
              result.product.discount
            )}
          </p>
        </div>
        <img src={result.product.main_image} />
      </div>
    </div>
  ));

  return (
    <div >
      <div style={{ paddingLeft: 20, display: "flex", flexDirection: "row", marginBottom:15 }}>
        <p
          style={{
            fontFamily: "poppins_regular",
            fontSize: 30,
          }}>
          Recently viewed
        </p>
        <button
          style={{
            marginLeft: 20,
            backgroundColor: "transparent",
            border: "none",
            fontSize: 18,
            outline: "none",
            cursor: "pointer",
            marginTop: 6,
            fontFamily:"poppins_light",
            textDecoration:"underline"
          }}
          onClick={() => {
            alert("recently viewed page")
          }}>
          See more
        </button>
      </div>
      <div className="product-header-container">
        <div className="inner-product-container">{renderHeaderImage}</div>
      </div>
    </div>
  );
};

export default RecentlyViewed;

// object-fit: cover;
// /*object-fit: contain;
// object-fit: scale-down;
// object-position: -10% 0;
// object-fit: none;
// object-fit: fill;*/
