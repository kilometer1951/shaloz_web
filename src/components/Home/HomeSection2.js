import React, { Component } from "react";
import "styles/starter_component.css";

class HomeSection2 extends Component {
  render() {
    return (
      <div className="home-section-two-container">
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "poppins_regular", fontSize: 45 }}>
            What is Shaloz?
          </p>
          <p
            style={{
              fontFamily: "poppins_extra_light",
              textDecoration: "underline",
              cursor: "pointer",
            }}>
            Read our wonderfully weird story
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}>
          <div style={{ width: "27%", paddingRight: 30, textAlign: "center" }}>
            <div>
              <p style={{ fontFamily: "poppins_extra_light", fontSize: 30 }}>
                A one-of-a-kind community
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "poppins_light",
                  fontSize: 18,
                }}>
                Shaloz is an online marketplace, where people come together to
                sell, buy and collect unique items
              </p>
            </div>
          </div>
          <div style={{ width: "27%", paddingRight: 30, textAlign: "center" }}>
            <div>
              <p style={{ fontFamily: "poppins_extra_light", fontSize: 30 }}>
                Support independent sellers
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "poppins_light",
                  fontSize: 18,
                }}>
                Theres's no shaloz warehouse - just millions of people selling
                the things they love. We make the whole process easy, helping
                you connect directly with makers to find something extraordinary
              </p>
            </div>
          </div>
          <div style={{ width: "27%", textAlign: "center" }}>
            <div>
              <p style={{ fontFamily: "poppins_extra_light", fontSize: 30 }}>
                Pace of mind
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "poppins_light",
                  fontSize: 18,
                }}>
                Your privacy and security is the highest priority of our
                dedicated team. And if you ever need assistance, we are always
                ready to step in for support
              </p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop:"3%" }}>
          <p style={{fontFamily:"poppins_semibold", fontSize:20}}>Have a question? Well, we've got some answers.</p>
          <button className="send-us-a-message">Send us a message</button>
        </div>
      </div>
    );
  }
}

export default HomeSection2;
