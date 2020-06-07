import React, { useState } from "react";
import "styles/shop.css";
import * as actions from "actions";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default (props) => {
  const {
    categories,
    selected,
    setSelected,
    setProductPageCount,
    setIsLoadingMore,
    setProductData,
    setPage,
    shop_id,
  } = props;
  const [value, setValue] = useState(0);

  const handleTabEvent = async (newSelected) => {
    if (selected !== newSelected) {
      setPage(1);
      setSelected(newSelected);
      document.getElementById("category-list").style.borderRight = "none";
      if (newSelected === "all") {
        setIsLoadingMore(true);
        const response = await actions.fetch_more_shop_product(shop_id, 1);
        setIsLoadingMore(false);
        setProductData(response.data);
        setProductPageCount(response.productPageCount);
        document.getElementById("items_container").scrollIntoView();
      } else {
        setIsLoadingMore(true);
        const response = await actions.fetch_more_shop_category_product(
          shop_id,
          1,
          newSelected
        );
        setIsLoadingMore(false);
        setProductData(response.data);
        setProductPageCount(response.productPageCount);
        document.getElementById("items_container").scrollIntoView();
      }
    }
  };

  const renderCat = categories.map((result, index) => {
    return (
      <div
        onClick={handleTabEvent.bind(this, result._id)}
        key={index}
        className="category-list"
        id={"category-list" + index}
        style={{
          borderRight: selected === result._id ? "1px solid #000" : "none",
          cursor: selected === result._id ? "default" : "pointer",
        }}
        onMouseEnter={() => {
          document.getElementById("category-list" + index).style.borderRight =
            "1px solid #000";
        }}
        onMouseLeave={() => {
          if (selected === result._id) {
            document.getElementById("category-list" + index).style.borderRight =
              "1px solid #000";
          } else {
            document.getElementById("category-list" + index).style.borderRight =
              "none";
          }
        }}>
        <p style={{ fontSize: 18 }}>{result._id}</p>
        <p style={{ fontSize: 18 }}>{result.count}</p>
      </div>
    );
  });

  const displayCount = () => {
    let total = 0;
    for (let i = 0; i < categories.length; i++) {
      const count = categories[i].count;
      total = total + count;
    }
    return total;
  };

  return (
    <div>
      <div className="shop-category-container">
        <div
          className="category-list"
          id="category-list"
          style={{
            borderRight: selected === "all" ? "1px solid #000" : "none",
            cursor: selected === "all" ? "default" : "pointer",
          }}
          onClick={handleTabEvent.bind(this, "all")}
          onMouseEnter={() => {
            document.getElementById("category-list").style.borderRight =
              "1px solid #000";
          }}
          onMouseLeave={() => {
            if (selected !== "all") {
              document.getElementById("category-list").style.borderRight =
                "none";
            }
          }}>
          <p style={{ fontSize: 18 }}>All</p>
          <p style={{ fontSize: 18 }}>{displayCount()}</p>
        </div>
        {renderCat}
      </div>
      <div style={{ marginTop: 10 }}>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <p style={{ fontFamily: "poppins_regular" }}>Shipping & policies</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                  }}>
                  Shipping
                </p>

                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 17,
                  }}>
                  Processing time
                </p>
                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  The time I need to prepare an order for shipping varies.
                </p>
              </div>
              <div
                style={{
                  paddingHorizontal: 5,
                  marginTop: 15,
                  paddingTop: 10,
                }}>
                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 17,
                  }}>
                  Secure Payment
                </p>
                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  All payments are processed through Shaloz app using your debit
                  or credit card. Merchants on Shaloz never receive your credit
                  card information. For your security, all payments should be
                  processed through the app to avoid fraudulent activity.
                </p>
              </div>
              <div
                style={{
                  marginTop: 15,
                  paddingTop: 10,
                }}>
                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 10,
                  }}>
                  Returns and exchanges
                </p>

                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  All merchants on Shaloz gladly accept returns, exchanges, and
                  cancellations. Just contact the seller within 7 days of
                  delivery.
                </p>

                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 17,
                  }}>
                  Conditions of return
                </p>

                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  Buyers are responsible for return shipping costs. If the item
                  is not returned in its original condition, the buyer is
                  responsible for any loss in value
                </p>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};
