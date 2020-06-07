import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "styles/all_product.css";
import * as actions from "actions";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { Spinner } from "react-activity";

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
  productContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop:50
    //paddingLeft: 10,
  },
};

const RightSection = (props) => {
  const dispatch = useDispatch();
  const fetch_product_category_data = useSelector(
    (state) => state.app.fetch_product_category_data
  );

  const {
    selected,
    main_cat,
    sub_cat_one,
    sub_cat_two,
    category_data,
    onSaleSelected,
    breadCrums_main_cat,
    breadCrums_sub_cat_one,
    breadCrums_sub_cat_two,
    setIsLoading,
    isLoading,
  } = props;

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

  const renderItems =
    fetch_product_category_data.data != undefined &&
    fetch_product_category_data.data.map((result, index) => {
      //console.log(result.seller[0].shop_name);

      return (
        <div
          style={{
            width: "23%",
            cursor: "pointer",
            paddingRight:18,
            marginBottom:20
          }}
          key={index}
          onClick={() =>
            props.history.push("/single_product_page/" + result._id)
          }>
          <div style={{ height: 200 }} className="products">
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
                height: 190,
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
      setIsLoading(true);
      if (!onSaleSelected) {
        await dispatch(
          actions.fetchProductCategoryNotOnSale(
            user._id,
            breadCrums_main_cat,
            breadCrums_sub_cat_one,
            breadCrums_sub_cat_two,
            page_number
          )
        );
      } else {
        await dispatch(
          actions.fetchProductCategoryOnSale(
            user._id,
            breadCrums_main_cat,
            breadCrums_sub_cat_one,
            breadCrums_sub_cat_two,
            page_number
          )
        );
      }
      setIsLoading(false);
    
  };

  return (
    <div>
      {onSaleSelected && (
        <div className="on-sale-right-container">
          <div style={{ marginLeft: 20, marginTop: 10 }}>
            <p>On sale products</p>
          </div>
          <button
            onClick={() => {
              window.location.href = `/all_product?selected=${selected}&&main_cat=${breadCrums_main_cat}&&sub_cat_one=${breadCrums_sub_cat_one}&&sub_cat_two=${breadCrums_sub_cat_two}&&on_sale=${false}`;
            }}>
            <i
              className="fas fa-times"
              style={{ color: "#9e9e9e", fontSize: 17 }}></i>
          </button>
        </div>
      )}
      <div id="product_section_two">
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
          {fetch_product_category_data.pageCount > 1 && (
            <Pagination
              count={fetch_product_category_data.pageCount}
              defaultPage={1}
              size="large"
              onChange={handlePagination}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
