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

const ProductSectionTwo = (props) => {
  const dispatch = useDispatch();
  const fetchedProductsCategory = useSelector(
    (state) => state.app.fetchedProductsCategory
  );

  const [product_id, setProductId] = useState("");
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

  const renderItems =
    fetchedProductsCategory.products != undefined &&
    fetchedProductsCategory.products.map((result, index) => {
      //console.log(result.seller[0].shop_name);

      return (
        <div
          style={{
            width: "23%",
            padding: 10,
            cursor: "pointer",
          }}
          key={index} onClick={() => props.history.push("/single_product_page/"+result._id)}>
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

  const handlePagination = async (event, page_number) => {
    try {
      setIsLaoding(true);
      await dispatch(
        actions.fetchProducts(user._id, props.category, page_number)
      );
      document.getElementById('product_section_two').scrollIntoView();

      setIsLaoding(false);
    } catch (e) {
      setIsLaoding(false);
      console.log(e);
    }
  };


  return (
    <div id="product_section_two">
      <p
        style={{
          fontFamily: "poppins_regular",
          textAlign: "center",
          fontSize: 40,
        }}>
        Ready to ship
      </p>
      <p style={{ fontFamily: "poppins_regular", textAlign: "center" }}>
        One-of-a-kind delivered right to your doorstep
      </p>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            margin: "auto",
            width: "50%",
            justifyContent: "center",
            marginTop: 20,
          }}>
          <Spinner size={40} color="#000" />
        </div>
      ) : (
        <div style={styles.productContainer}>{renderItems}</div>
      )}
      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "50%",
          marginTop: 20,
          textAlign: "center",
          justifyContent: "center",
        }}>
        {fetchedProductsCategory.pageCount > 1 && (
          <Pagination
            count={fetchedProductsCategory.pageCount}
            defaultPage={1}
            size="large"
            onChange={handlePagination}
           
          />
        )}
      </div>
    </div>
  );
};



export default ProductSectionTwo;

// object-fit: cover;
// /*object-fit: contain;
// object-fit: scale-down;
// object-position: -10% 0;
// object-fit: none;
// object-fit: fill;*/
