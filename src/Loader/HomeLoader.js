import React from "react";
import ReactPlaceholder from "react-placeholder";
import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape,
} from "react-placeholder/lib/placeholders";

import "react-placeholder/lib/reactPlaceholder.css";

const HomeLoader = (props) => {
  const dataN = [
    { n1: 1 },
    { n2: 2 },
    { n3: 3 },
    { n4: 4 },
    { n5: 5 },
    { n6: 6 },
  ];

  const awesomePlaceholder = (
    <div className="my-awesome-placeholder">
      <RectShape
        color="#eeeeee"
        style={{ width: 200, height: 200, borderRadius: 3 }}
      />
      <TextBlock
        color="#eeeeee"
        style={{ width: 205, marginTop: 10, borderRadius: 3 }}
      />
      <TextBlock
        color="#eeeeee"
        style={{ width: 170, marginTop: 10, borderRadius: 3 }}
      />
    </div>
  );

  const placeholder = dataN.map((value, index) => {
    return (
      <div key={index} style={{ paddingRight: 20 }}>
        <ReactPlaceholder
          type="media"
          ready={false}
          showLoadingAnimation
          customPlaceholder={awesomePlaceholder}
        />
      </div>
    );
  });

  return (
    <div style={{ marginTop: 50 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              fontFamily: "poppins_semibold",
              fontSize: 20,
              marginBottom: 20,
            }}>
            Health & Beauty
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {placeholder}
        </div>
      </div>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              fontFamily: "poppins_semibold",
              fontSize: 20,
              marginBottom: 20,
            }}>
            Jewelry & Hand made items for you
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {placeholder}
        </div>
      </div>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              fontFamily: "poppins_semibold",
              fontSize: 20,
              marginBottom: 20,
            }}>
            Recommend for you
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {placeholder}
        </div>
      </div>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              fontFamily: "poppins_semibold",
              fontSize: 20,
              marginBottom: 20,
            }}>
            Shop from the best
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {placeholder}
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;
