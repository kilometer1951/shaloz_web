import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import "styles/single_page.css";
import Moment from "moment";
import Colors from "constants/Colors";
import Footer from "components/Footer";

import { LinearProgress } from "@material-ui/core";
import Header from "components/Header";
import SectionOne from "components/SingleProduct/SectionOne";
import SectionTwo from "components/SingleProduct/SectionTwo";
import MoreFromThisShop from "components/SingleProduct/MoreFromThisShop";
import YouMayAlsoLike from "components/SingleProduct/YouMayAlsoLike";
import RecentlyViewed from "components/SingleProduct/RecentlyViewed";

const SingleProductPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const productData = useSelector((state) => state.app.productData);
  const reviewShopData = useSelector((state) => state.app.reviewShopData);
  const reviewProductData = useSelector((state) => state.app.reviewProductData);
  const product_id = props.match.params.product_id;
  const isFav = useSelector((state) => state.app.isFav);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      setIsloading(true);
      await dispatch(actions.fetchSingleProduct(product_id, user._id));
      setIsloading(false);
    };
    fetchSingleProduct();
  }, []);

  const renderMainCat =
    productData.main_cat !== undefined &&
    productData.main_cat.map((result, index) => {
      return (
        <div
          style={{
            padding: 10,
            backgroundColor: "#eeeeee",
            borderRadius: 50,
            margin: 5,
            cursor: "pointer",
          }}
          key={index}
          onClick={() => {
            window.location.href = `/all_product?selected=${
              result.name
            }&&main_cat=${
              result.name
            }&&sub_cat_one=${""}&&sub_cat_two=${""}&&on_sale=${false}`;
          }}>
          <p style={{ fontFamily: "poppins_regular" }}>{result.name}</p>
        </div>
      );
    });


   

  return (
    <div>
      <Header history={props.history} />
      {!isloading && (
        <div>
          <div className="single-page-container">
            <div className="single-page-left-container">
              <SectionOne productData={productData} history={props.history}/>
            </div>
            <div className="single-page-right-container">
              <SectionTwo productData={productData}  history={props.history}/>
            </div>
          </div>
          <MoreFromThisShop productData={productData} history={props.history}  history={props.history}/>
          <YouMayAlsoLike productData={productData} history={props.history}  history={props.history}/>
          <div style={{ marginTop: "10%" }}>
          <RecentlyViewed recent_viewed={productData.recent_viewed} history={props.history} />

            </div>
          <div style={{ padding: 20 }}>
            <p
              style={{
                fontFamily: "poppins_regular",
                fontSize: 20,
                marginBottom: 10,
              }}>
              Explore more options
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}>
              {renderMainCat}
            </div>
          </div>
        </div>
      )}

      {!isloading && <Footer />}
    </div>
  );
};

export default SingleProductPage;
