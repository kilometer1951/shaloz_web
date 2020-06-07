import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "styles/all_product.css";
import * as actions from "actions";
import { useSelector, useDispatch } from "react-redux";
import CategorySection from "components/AllProduct/CategorySection";
import RightSection from "components/AllProduct/RightSection";
import { Breadcrumbs, Link } from "@material-ui/core";
import RecentlyViewed from "components/SingleProduct/RecentlyViewed";
import ShopsInterestedIn from "components/Product/ShopsInterestedIn";
import Footer from "components/Footer";

const AllProducts = (props) => {
  const dispatch = useDispatch();
  const category_data = useSelector((state) => state.app.category_data);
  const query_string = props.location.search;
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const fetch_product_category_data = useSelector(
    (state) => state.app.fetch_product_category_data
  );
  //decodeURI

  const params = query_string.split("&&");

  const selected = decodeURI(params[0].split("?")[1]).slice(9);

  const [main_cat, setMain_cat] = useState(
    decodeURI(params[1].split("main_cat=")[1])
  );
  const [sub_cat_one, setSub_cat_one] = useState(
    decodeURI(params[2].split("sub_cat_one=")[1])
  );
  const [sub_cat_two, setSub_cat_two] = useState(
    decodeURI(params[3].split("sub_cat_two=")[1])
  );

  const onSaleSelected =
    decodeURI(params[4].split("on_sale=")[1]) == "false" ? false : true;

  const breadCrums_main_cat = decodeURI(params[1].split("main_cat=")[1]);

  const breadCrums_sub_cat_one = decodeURI(params[2].split("sub_cat_one=")[1]);
  const breadCrums_sub_cat_two = decodeURI(params[3].split("sub_cat_two=")[1]);

  //fetch
  useEffect(() => {
    const __fetchProductCategory = async () => {
      setIsLoading(true);
      if (!onSaleSelected) {
        if (selected === "all") {
          await dispatch(actions.fetchAllProductCategoryNotOnSale(user._id, 1));
        } else {
          await dispatch(
            actions.fetchProductCategoryNotOnSale(
              user._id,
              breadCrums_main_cat,
              breadCrums_sub_cat_one,
              breadCrums_sub_cat_two,
              1
            )
          );
        }
      } else {
        if (selected === "all") {
          await dispatch(actions.fetchAllProductCategoryOnSale(user._id, 1));
        } else {
          await dispatch(
            actions.fetchProductCategoryOnSale(
              user._id,
              breadCrums_main_cat,
              breadCrums_sub_cat_one,
              breadCrums_sub_cat_two,
              1
            )
          );
        }
      }
      setIsLoading(false);
    };
    __fetchProductCategory();
  }, []);
  //   <p style={{ fontFamily: "poppins_semibold" }}>

  //   {breadCrums_main_cat}
  //   {breadCrums_sub_cat_one}
  //   {breadCrums_sub_cat_two}
  // </p>
  return (
    <div>
      <Header history={props.history} />
      <div className="all-product-container">
        <div className="all-product-left-container">
          <div className="left-container-section-one">
            <Breadcrumbs aria-label="breadcrumb">
              <div style={{ cursor: "pointer" }}>
                <Link
                  color={
                    breadCrums_main_cat === "All categories"
                      ? "textPrimary"
                      : "inherit"
                  }
                  onClick={() => {
                    window.location.href = `/all_product?selected=${"all"}&&main_cat=${""}&&sub_cat_one=${""}&&sub_cat_two=${""}&&on_sale=${onSaleSelected}`;
                  }}>
                  All categories
                </Link>
              </div>
              <div style={{ cursor: "pointer" }}>
                <Link
                  color={
                    breadCrums_main_cat === selected ? "textPrimary" : "inherit"
                  }
                  onClick={() => {
                    window.location.href = `/all_product?selected=${breadCrums_main_cat}&&main_cat=${breadCrums_main_cat}&&sub_cat_one=${breadCrums_sub_cat_one}&&sub_cat_two=${breadCrums_sub_cat_two}&&on_sale=${false}`;
                  }}>
                  {breadCrums_main_cat}
                </Link>
              </div>
              {breadCrums_sub_cat_one && (
                <div style={{ cursor: "pointer" }}>
                  <Link
                    color={
                      breadCrums_sub_cat_one === selected
                        ? "textPrimary"
                        : "inherit"
                    }
                    onClick={() => {
                      window.location.href = `/all_product?selected=${breadCrums_sub_cat_one}&&main_cat=${breadCrums_main_cat}&&sub_cat_one=${breadCrums_sub_cat_one}&&sub_cat_two=${breadCrums_sub_cat_two}&&on_sale=${false}`;
                    }}>
                    {breadCrums_sub_cat_one}
                  </Link>
                </div>
              )}

              {breadCrums_sub_cat_two && (
                <div style={{ cursor: "pointer" }}>
                  <Link
                    color={
                      breadCrums_sub_cat_two === selected
                        ? "textPrimary"
                        : "inherit"
                    }
                    onClick={() => {
                      window.location.href = `/all_product?selected=${breadCrums_sub_cat_two}&&main_cat=${breadCrums_main_cat}&&sub_cat_one=${breadCrums_sub_cat_one}&&sub_cat_two=${breadCrums_sub_cat_two}&&on_sale=${false}`;
                    }}>
                    {breadCrums_sub_cat_two}
                  </Link>
                </div>
              )}
            </Breadcrumbs>

            <CategorySection
              main_cat={main_cat}
              sub_cat_one={sub_cat_one}
              sub_cat_two={sub_cat_two}
              category_data={category_data}
              setMain_cat={setMain_cat}
              setSub_cat_one={setSub_cat_one}
              setSub_cat_two={setSub_cat_two}
              onSaleSelected={onSaleSelected}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 30,
                cursor: "pointer",
              }}
              onClick={() => {
                if (onSaleSelected) {
                  window.location.href = `/all_product?selected=${selected}&&main_cat=${breadCrums_main_cat}&&sub_cat_one=${breadCrums_sub_cat_one}&&sub_cat_two=${breadCrums_sub_cat_two}&&on_sale=${false}`;
                } else {
                  window.location.href = `/all_product?selected=${selected}&&main_cat=${breadCrums_main_cat}&&sub_cat_one=${breadCrums_sub_cat_one}&&sub_cat_two=${breadCrums_sub_cat_two}&&on_sale=${true}`;
                }
              }}>
              {!onSaleSelected && <div className="on-sale-not-checked" />}

              <button className="on-sale-button">
                {onSaleSelected && (
                  <i
                    className="fas fa-check-square"
                    style={{ marginRight: 10 }}></i>
                )}
                On sale
              </button>
            </div>
          </div>
        </div>
        <div className="all-product-right-container">
          <RightSection
            main_cat={main_cat}
            sub_cat_one={sub_cat_one}
            sub_cat_two={sub_cat_two}
            category_data={category_data}
            onSaleSelected={onSaleSelected}
            selected={selected}
            breadCrums_main_cat={breadCrums_main_cat}
            breadCrums_sub_cat_one={breadCrums_sub_cat_one}
            breadCrums_sub_cat_two={breadCrums_sub_cat_two}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            history={props.history}
          />
        </div>
      </div>
      <div className="all-product-bottom-container">
        <RecentlyViewed
          recent_viewed={fetch_product_category_data.recent_viewed}
          history={props.history}
        />
      </div>

      <div className="all-product-bottom-container">
        <ShopsInterestedIn shopsData={fetch_product_category_data.shops} />
      </div>
      {!isLoading && <Footer />}
    </div>
  );
};

export default AllProducts;
