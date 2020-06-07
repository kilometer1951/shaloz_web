import React from "react";
import "styles/app.css";
import Colors from "constants/Colors";

export default () => {
  return (
    <div className="footer-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              fontFamily: "poppins_bold",
              color: Colors.pink,
              fontSize: 20,
            }}>
            Shaloz
          </p>
          <p
            style={{
              fontFamily: "poppins_light",
              fontSize: 14,
              marginLeft:10,
              marginTop:5
            }}>
            - We make it easy to find your thing
          </p>
        </div>
        <div style={{fontFamily:"poppins_light", display:'flex', flexDirection:"row"}}>
          <p style={{marginRight:15}}>© 2020 Shaloz</p>
          <p style={{marginRight:15, cursor:"pointer",textDecoration:"underline"}}>Sell on Shaloz</p>
          <p style={{marginRight:15, cursor:"pointer",textDecoration:"underline"}}>Download the Shaloz app</p>
          <p style={{marginRight:15,cursor:"pointer", textDecoration:"underline"}}>Terms of use</p>
          <p style={{marginRight:15,cursor:"pointer",textDecoration:"underline"}}>Privacy</p>
        </div>
      </div>
    </div>
  );
};
