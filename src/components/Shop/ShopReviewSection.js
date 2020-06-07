import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import "styles/single_page.css";
import Moment from "moment";
import Colors from "constants/Colors";
import { Spinner } from "react-activity";
//import Rating from "@material-ui/lab/Rating";
import Rating from "react-rating";
import { Pagination } from "@material-ui/lab";

const ReviewSection = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { shop_reviews, shopReviewPageCount, setShop_reviews, shop_id } = props;

  const [isLoading, setIsloading] = useState(false);
  const [tab, setTab] = useState(0);
  const [comment, setComment] = useState("");
  const [rateNumber, setRateNumber] = useState("");
  const [isLoadingProductReview, setIsLaodingProductReview] = useState(false);
  const [page, setPage] = useState(1);

  const seeMore = (str, index, truncNum) => {
    let html;
    html = `
      <p style="font-family:'poppins_regular'">
      ${str}
     
    </p>
      `;

    document.getElementById("review_id" + index).innerHTML = html;
  };

  const truncateString = (str, truncNum, index) => {
    if (str.length > truncNum) {
      return (
        <div id={"review_id" + index}>
          <p style={{ fontFamily: "poppins_regular" }}>
            {str.slice(0, truncNum)}
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "blue",
                cursor: "pointer",
                marginLeft: 10,
                textDecoration: "underline",
              }}
              onClick={seeMore.bind(this, str, index, truncNum)}>
              See more
            </button>
          </p>
        </div>
      );
    } else {
      return str;
    }
  };

  const handlePaginationShop = async (event, page_number) => {
    setIsloading(true);

    const response = await actions.__fetchShopReviews(shop_id, page_number);

    setShop_reviews(response.data);
    document.getElementById("shop_review").scrollIntoView();
    setIsloading(false);
  };

  let renderShopReviewData = shop_reviews.map((result, index) => {
    return (
      <div key={index} style={{ width: "80%", padding: 20 }}>
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
        <Rating
          readonly={true}
          initialRating={result.rateNumber}
          fullSymbol="fa fa-star"
          emptySymbol="fa fa-star-o "
        />
        <div style={{ marginTop: 5 }}>
          {truncateString(result.comment, 400, index)}
        </div>
      </div>
    );
  });

  return (
    <div id="shop_review">
      {isLoading ? (
        <div style={{ marginLeft: 20, marginBottom: 20 }}>
          <Spinner size={40} color="#000" />
        </div>
      ) : (
        renderShopReviewData
      )}

      {shopReviewPageCount > 1 && (
        <Pagination
          count={shopReviewPageCount}
          defaultPage={page}
          size="large"
          onChange={handlePaginationShop}
        />
      )}
    </div>
  );
};

export default ReviewSection;

// <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
// <input type="text" value={rateNumber} onChange={(e) => setRateNumber(e.target.value)}/>
// <button onClick={() => {
// actions.submit(comment,rateNumber, productData.product.user._id, user._id )
// }}>Submit</button>
