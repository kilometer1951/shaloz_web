import React, { useState } from "react";
import Colors from "constants/Colors";
import OutsideClickHandler from "react-outside-click-handler";
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";

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
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    padding:50
    
  }
};

const ProductSectionOne = (props) => {
  const dispatch = useDispatch();
  const fetchedProductsCategory = useSelector((state) => state.app.fetchedProductsCategory);

  const [product_id, setProductId] = useState("");
  const user = useSelector((state) => state.auth.user);

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

 

  const renderItems = fetchedProductsCategory.header_products != undefined && fetchedProductsCategory.header_products.slice(0, 3).map((result, index) => {
    //console.log(result.seller[0].shop_name);

    return (
      <div
        style={{
          width: "33%",
          paddingRight: 20,
          cursor: "pointer",
        }}
        key={index} onClick={() => props.history.push("/single_product_page/"+result._id)}>
        <div style={{ height: 354 }} className="products">
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
              height: 350,
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
   
      <div style={styles.productContainer}>{renderItems}</div>
    </div>
  );
};

export default ProductSectionOne;

// object-fit: cover;
// /*object-fit: contain;
// object-fit: scale-down;
// object-position: -10% 0;
// object-fit: none;
// object-fit: fill;*/
