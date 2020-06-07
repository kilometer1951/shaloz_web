import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import "styles/single_page.css";
import Moment from "moment";
import Colors from "constants/Colors";
import { Spinner } from "react-activity";
import Rating from "@material-ui/lab/Rating";

import { LinearProgress } from "@material-ui/core";
import { Lightbox } from "react-modal-image";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Pagination } from "@material-ui/lab";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#000",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontSize: 18,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: "poppins_regular",
    "&:hover": {
      color: "#000",
      opacity: 1,
    },
    "&$selected": {
      color: "#000",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#000",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const ReviewSection = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { productData } = props;
  const reviewShopData = useSelector((state) => state.app.reviewShopData);
  const reviewProductData = useSelector((state) => state.app.reviewProductData);
  const [isLoading, setIsloading] = useState(true);
  const [tab, setTab] = useState(0);
  const [comment, setComment] = useState("");
  const [rateNumber, setRateNumber] = useState("");
  const [isLoadingProductReview, setIsLaodingProductReview] = useState(false);
  const [isLaodingShopReview, setIsLaodingShopReview] = useState(false);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handlePagination = async (event, page_number) => {
    try {
      setIsLaodingProductReview(true);
      await dispatch(
        actions.fetchProductReviews(productData.product._id, page_number)
      );
      document.getElementById("product_review").scrollIntoView();
      setIsLaodingProductReview(false);
    } catch (e) {
      setIsLaodingProductReview(false);
      dispatch(actions.handleNetworkerror(true))

    }
  };

  const handlePaginationShop = async (event, page_number) => {
    try {
      setIsLaodingShopReview(true);
      await dispatch(
        actions.fetchShopReviews(productData.product.user._id, page_number)
      );
      document.getElementById("shop_review").scrollIntoView();
      setIsLaodingShopReview(false);
    } catch (e) {
      setIsLaodingShopReview(false);
      dispatch(actions.handleNetworkerror(true))

    }
  };

  let renderReviewData = reviewProductData.reviews.map((result, index) => {
    return (
      <div key={index} style={{ width: "50%", padding: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <p style={{ fontFamily: "poppins_light" }}>
            {result.user.first_name + " " + result.user.last_name}
          </p>
          <p style={{ fontFamily: "poppins_light" }}>
            {Moment(new Date(result.dateReviewed)).format("MMM DD, YYYY")}
          </p>
        </div>
        <Rating name="read-only" value={result.rateNumber} readOnly />
        <p style={{ fontFamily: "poppins_regular" }}>{result.comment}</p>
      </div>
    );
  });

  let renderShopReviewData = reviewShopData.shop_reviews.map(
    (result, index) => {
      return (
        <div key={index} style={{ width: "50%", padding: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <p style={{ fontFamily: "poppins_light" }}>
              {result.user.first_name + " " + result.user.last_name}
            </p>
            <p style={{ fontFamily: "poppins_light" }}>
              {Moment(new Date(result.dateReviewed)).format("MMM DD, YYYY")}
            </p>
          </div>
          <Rating name="read-only" value={result.rateNumber} readOnly />
          <p style={{ fontFamily: "poppins_regular" }}>{result.comment}</p>
        </div>
      );
    }
  );

  let product_view;
  if (reviewProductData.reviews.length !== 0) {
    product_view = (
      <div id="product_review">
        {isLoadingProductReview ? (
          <div style={{ marginLeft: 10 }}>
            <Spinner size={20} color="#000" />
          </div>
        ) : (
          renderReviewData
        )}

        {reviewProductData.number_of_product_review_pages > 1 && (
          <Pagination
            count={reviewProductData.number_of_product_review_pages}
            defaultPage={1}
            size="large"
            onChange={handlePagination}
          />
        )}
      </div>
    );
  }

  let shop_view;
  if (reviewShopData.shop_reviews.length !== 0) {
    shop_view = (
      <div id="shop_review">
        {isLaodingShopReview ? (
          <div style={{ marginLeft: 10 }}>
            <Spinner size={20} color="#000" />
          </div>
        ) : (
          renderShopReviewData
        )}

        {reviewShopData.number_of_shop_review_pages > 1 && (
          <Pagination
            count={reviewShopData.number_of_shop_review_pages}
            defaultPage={1}
            size="large"
            onChange={handlePaginationShop}
          />
        )}
      </div>
    );
  }

  let product_tab_view;
  if (reviewProductData.reviews.length !== 0) {
    product_tab_view = <div style={{ marginTop: 15 }}>{product_view}</div>;
  } else {
    product_tab_view = <div style={{ marginTop: 15 }}>{shop_view}</div>;
  }

  let shop_tab_view;

  if (reviewShopData.shop_reviews.length !== 0) {
    shop_tab_view = <div style={{ marginTop: 15 }}>{shop_view}</div>;
  } else {
    shop_tab_view = <div style={{ marginTop: 15 }}>{product_view}</div>;
  }
  return (
    <div>
      <AntTabs value={tab} onChange={handleChange} aria-label="ant example">
        {reviewProductData.reviews.length !== 0 && (
          <AntTab label="Product reviews" />
        )}
        {reviewShopData.shop_reviews.length !== 0 && (
          <AntTab label="Shop reviews" />
        )}
      </AntTabs>

      {tab === 0 ? product_tab_view : shop_tab_view}
    </div>
  );
};

export default ReviewSection;

// <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
// <input type="text" value={rateNumber} onChange={(e) => setRateNumber(e.target.value)}/>
// <button onClick={() => {
// actions.submit(comment,rateNumber, productData.product.user._id, user._id )
// }}>Submit</button>
