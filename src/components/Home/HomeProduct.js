import React, { useState } from "react";
import "styles/starter_component.css";
import Colors from "constants/Colors";
import OutsideClickHandler from "react-outside-click-handler";
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";

const styles = {
  discountContainer: {
    position: "absolute",
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

const StarterProduct = (props) => {
  const dispatch = useDispatch();

  const [popover, setPopover] = useState();
  const [product_id, setProductId] = useState("");
  const user = useSelector((state) => state.auth.user);

  const truncateString = (str) => {
    if (str.length > 20) {
      return str.slice(0, 22) + ". . .";
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

  const renderItems = props.data.slice(0, 6).map((result, index) => {
    //console.log(result.seller[0].shop_name);

    return (
      <div
        style={{
          width: "20%",
          paddingRight: 20,
          cursor: "pointer",
          flexGrow: 1,
        }}
        key={index}
        onClick={() => {
          if (Object.entries(user).length === 0) {
            dispatch(actions.openAuthModal(true));
            return;
          }
          props.history.push("/single_product_page/" + result._id);
        }}>
        <div style={{ height: 180 }} className="products">
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
              height: 200,
              objectFit: "cover",
              borderRadius: 3,
            }}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <p style={{ fontFamily: "poppins_light" }}>
            {truncateString(result.product_name)}
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: "poppins_light",
              fontSize: 14,
              color: "#9e9e9e",
            }}>
            {truncateString(result.seller[0].shop_name)}
          </p>
        </div>
        {result.seller[0].offers_free_shipping && (
          <div
            style={{
              backgroundColor: "#a5d6a7",
              width: 140,
              borderRadius: 25,
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <p style={{ fontFamily: "poppins_regular", fontSize: 13 }}>
              OFFERS FREE shipping
            </p>
          </div>
        )}
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
  });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
          {props.title}
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
          }}
          onClick={props.handleSeeMore}>
          See more
        </button>
      </div>
      <div className="product-container">{renderItems}</div>
    </div>
  );
};

export default StarterProduct;

// object-fit: cover;
// /*object-fit: contain;
// object-fit: scale-down;
// object-position: -10% 0;
// object-fit: none;
// object-fit: fill;*/
