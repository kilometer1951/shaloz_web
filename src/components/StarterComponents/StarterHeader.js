import React from "react";
import { Fade } from "react-slideshow-image";
import "styles/starter_header.css";
import Colors from "constants/Colors";
import { useTrail, animated } from "react-spring";

const fadeImages = [
  "https://www.travelfashiongirl.com/wp-content/uploads/2018/07/amazon-prime-day-deals.jpg",
  "../assets/toys.jpg",
  "https://www.ecnmy.org/wp-content/uploads/2019/05/pets-3715733_960_720.jpg",
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  },
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "5%",
  },

  leftContainer: {
    width: "60%",
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
    height: 450,
    borderRadius: 3,
    zIndex:-1
  },
  rightContainer: {
    width: "30%",
    flexGrow: 1,
    height: 450,
    marginLeft: 20,
    marginRight: 20,
    zIndex:-1

  },
  slideSide: {
    backgroundColor: "#e0f2f1",
    width: "25%",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    padding: 10,
    textAlign: "center",
  },
  rightContainerInnerTop: {
    height: "80%",
    borderRadius: 3,
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    position: "relative",
  },
  rightContainerInnerBottom: {
    backgroundColor: "#e8f5e9",
    marginTop: 20,
    height: "7%",
    borderRadius: 3,
    padding: 20,
    textAlign: "center",
    cursor: "pointer",
  },
  button_: {
    border: "none",
    backgroundColor: "transparent",
    fontFamily: "poppins_regular",
    fontSize: 17,
    marginTop: 10,
    outline: "none",
    cursor: "pointer",
  },

  bottomContainer: {
    width: "30%",
    flexGrow: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    paddingRight: 20,
  },
};

const items = [
  "Find things you love. Support independent sellers. Only on Shaloz",
];
const config = { mass: 5, tension: 2000, friction: 200 };

export default () => {
  const toggle = true;
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  const buttonComponent = (
    <button style={styles.button_}>
      See more
      <i
        className="fal fa-arrow-right"
        style={{ fontSize: 16, marginLeft: 10 }}></i>
    </button>
  );

  return (
    <div>
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={items[index]}
          className="trails-text"
          style={{
            ...rest,
            transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
          }}>
          <animated.div style={{ height }}>
            <p
              style={{
                fontFamily: "poppins_extra_light",
                fontSize: 30,
                textAlign: "center",
                marginTop: 20,
              }}>
              {items[index]}
            </p>
          </animated.div>
        </animated.div>
      ))}

      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <Fade arrows={false}>
            <div className="each-fade">
              <div style={styles.slideSide} className="slide-side">
                <h2>Fashion</h2>
                <p>Everyday living. Be unique, be brave, be divine</p>
                <button>
                  See more
                  <i
                    className="fal fa-arrow-right"
                    style={{ fontSize: 16, marginLeft: 10 }}></i>
                </button>
              </div>
              <div className="image-container">
                <img src={fadeImages[0]} />
              </div>
            </div>
            <div className="each-fade">
              <div style={styles.slideSide} className="slide-side">
                <h2>Toys</h2>
                <p>A life full of Games. Feel the wonder of toys</p>
                <button>
                  See more
                  <i
                    className="fal fa-arrow-right"
                    style={{ fontSize: 16, marginLeft: 10 }}></i>
                </button>
              </div>
              <div className="image-container">
                <img src={fadeImages[1]} />
              </div>
            </div>
            <div className="each-fade">
              <div style={styles.slideSide} className="slide-side">
                <h2>Pet Supplies</h2>
                <p>Stores full of suprises. Making your pet happier.</p>
                <button>
                  See more
                  <i
                    className="fal fa-arrow-right"
                    style={{ fontSize: 16, marginLeft: 10 }}></i>
                </button>
              </div>
              <div className="image-container">
                <img src={fadeImages[2]} />
              </div>
            </div>
          </Fade>
        </div>
        <div style={styles.rightContainer}>
          <div style={styles.rightContainerInnerTop}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/518/916/non_2x/vector-tropical-leaves-green-and-pink-pastel-colors-paper-cut-style-on-background-with-empty-space-for-advertising-text.jpg"
              style={{ width: "100%", height: "100%", borderRadius: 3 }}
            />
            <div
              style={{
                position: "absolute",
                padding: 12,
                zIndex: 1,
                top: "63%",
                left: "50%",
                width: 300,
                transform: "translate(-50%, -50%)",
              }}>
              <p style={{ fontFamily: "poppins_regular", fontSize: 20 }}>
                Everyday Deals. Get things,
                <br /> you need while supporting <br /> small businesses
              </p>
              {buttonComponent}
            </div>
          </div>
          <div style={styles.rightContainerInnerBottom}>
            <p style={{ fontFamily: "poppins_regular", fontSize: 20 }}>
              Custom Wears and more
              <i
                className="fal fa-arrow-right"
                style={{ fontSize: 16, marginLeft: 10 }}></i>
            </p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "3%" }}>
        <div style={styles.bottomContainer}>
          <p className="textFonts" style={{ fontSize: 20 }}>
            <i
              className="fal fa-check"
              style={{
                fontSize: 20,
                marginRight: 10,
                color: Colors.purple_darken,
              }}></i>
            Unique everything
          </p>
          <div
            style={{ textAlign: "center", paddingLeft: "15%", marginTop: 5 }}>
            <p className="textFonts" style={{ fontSize: 17 }}>
              We have millions of one-of-a-kind items, so you can find whatever
              you need
            </p>
          </div>
        </div>
        <div style={styles.bottomContainer}>
          <p className="textFonts" style={{ fontSize: 20 }}>
            <i
              className="fal fa-check"
              style={{
                fontSize: 20,
                marginRight: 10,
                color: Colors.purple_darken,
              }}></i>
            Independent sellers
          </p>
          <div style={{ textAlign: "center", marginTop: 5 }}>
            <p className="textFonts" style={{ fontSize: 17 }}>
              Buy directly from someone who put their heart and soul into making
              something special
            </p>
          </div>
        </div>
        <div style={styles.bottomContainer}>
          <p className="textFonts" style={{ fontSize: 20 }}>
            <i
              className="fal fa-check"
              style={{
                fontSize: 20,
                marginRight: 10,
                color: Colors.purple_darken,
              }}></i>
            Secure shopping
          </p>
          <div style={{ textAlign: "center", marginTop: 5 }}>
            <p className="textFonts" style={{ fontSize: 17 }}>
              We use best-in-class technology to protect your transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// <div style={{ display: "flex", flexDirection: "row" }}>
// <div style={{ width: "30%", backgroundColor: "yellow", padding:20 }}>
//   <p style={{ fontFamily: "poppins_extra_light", textAlign:'center', fontSize:30 }}>
//     All sorts of deals tailored for you
//   </p>
// </div>
// <div style={{ width: "70%", backgroundColor: "orange" }}>image</div>
// </div>
