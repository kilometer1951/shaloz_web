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
  productContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
  },
};

const YouMayAlsoLike = (props) => {
  const dispatch = useDispatch();
  const { productData } = props;

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

  const renderItems =  productData.otherProducts_website !== undefined && productData.otherProducts_website.map(
    (result, index) => {
      return (
        <div
          style={{
            width: "23%",
            padding: 10,
            cursor: "pointer",
          }}
          key={index}
          onClick={() =>
            (window.location.href = "/single_product_page/" + result._id)
          }>
          <div style={{ height: 304 }} className="products">
            {result.discount !== "" && (
              <div style={styles.discountContainer}>
                <p style={{ fontFamily: "poppins_regular" }}>
                  {result.discount}% OFF
                </p>
              </div>
            )}
            <img
              src={result.main_image}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 3,
              }}
            />
          </div>
          <div>
            <p style={{ fontFamily: "poppins_light" }}>
              {truncateString(result.product_name)}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <p style={{ fontFamily: "poppins_regular" }}>
                ${displayPrice(result.product_price, result.discount)}
              </p>
              {result.discount !== "" && (
                <p style={styles.previousPrice}>${result.product_price}</p>
              )}
            </div>
          </div>
        </div>
      );
    }
  );

  return (
    <div style={{marginTop:"10%", }}>
      <div style={{ paddingLeft: 20, display: "flex", flexDirection: "row",marginBottom:15  }}>
        <p
          style={{
            fontFamily: "poppins_regular",
            fontSize: 30,
          }}>
          You may also like
        </p>
        <button
          style={{
            marginLeft: 20,
            backgroundColor: "transparent",
            border: "none",
            fontSize: 18,
            color: "#0d47a1",
            outline: "none",
            cursor: "pointer",
            marginTop:6
          }}
          onClick={() => props.history.push("/product/all")}>
          See more
        </button>
      </div>

      <div style={styles.productContainer}>{renderItems}</div>
    </div>
  );
};

export default YouMayAlsoLike;

// object-fit: cover;
// /*object-fit: contain;
// object-fit: scale-down;
// object-position: -10% 0;
// object-fit: none;
// object-fit: fill;*/
