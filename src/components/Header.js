import React, { useEffect, useState } from "react";
import "../styles/header.css";
import Colors from "../constants/Colors";
import { Icon } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import OutsideClickHandler from "react-outside-click-handler";
import CategoryContainer from "components/Header/CategoryContainer";
import { LinearProgress } from "@material-ui/core";

const Header = (props) => {
  const dispatch = useDispatch();
  const toggle_search_bar = useSelector((state) => state.app.toggle_search_bar);
  const cart_count = useSelector((state) => state.app.cart_count);
  const user = useSelector((state) => state.auth.user);
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false);
  const [isOnDiv, setIsOnDiv] = useState(false);
  const [openDiv, setOpenDiv] = useState(false);
  const category_data = useSelector((state) => state.app.category_data);
  const isLoading = useSelector((state) => state.app.isLoading);
  const [main_cat_name, setMainCatName] = useState("");


  const [subcat_one_data, setSubcat_one_data] = useState([]);

  const openAuthModal = () => {
    dispatch(actions.openAuthModal(true));
  };

  const handleFocus = () => {
    document.getElementById("searchButton").style.cssText =
      "background-color:#000;transition:background-color .5s linear";
    document.getElementById("searchIcon").style.color = "#fff";

    //open search bar
    dispatch(actions.toggleSearchBar(true));
  };

  useEffect(() => {
    const fetchData = async () => {
      
      if (Object.entries(user).length !== 0) {
        await dispatch(actions.fetchCartData(user._id, 1));
      }
      dispatch(actions.fetchCategories());
    
    };
    fetchData();
  }, []);

  const renderHeaderMenu =
    category_data.main_cat &&
    category_data.main_cat.slice(0, 6).map((result, index) => {
      return (
        <div
          onMouseEnter={() => {
            setOpenDiv(true);
            setMainCatName(result.name);
            const sub_cat_one = category_data.subcat_one_data.filter(
              (value) => value.mainCategory == result._id
            );
            setSubcat_one_data(sub_cat_one);

            //filter sub cat one
          }}
          key={index}
          onClick={() => {
            setOpenDiv(true);
          }}
          onMouseLeave={() => {
            if (openDiv) {
              setIsOnDiv(true);
              if (!isOnDiv) {
                setOpenDiv(false);
              }
            }
          }}>
          <p>{result.name}</p>
        </div>
      );
    });

  return (
    <div>
      <div className="header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:
              Object.entries(user).length !== 0
                ? "flex-start"
                : "space-between",
            flexWrap: "wrap",
            paddingBottom: 20,
          }}>
          <div
            style={{ width: "10%", flexGrow: 1, cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}>
            <p
              style={{
                fontFamily: "poppins_regular",
                fontSize: 40,
                color: Colors.purple_darken,
              }}>
              Shaloz
            </p>
          </div>
          <div
            style={{
              width: Object.entries(user).length !== 0 ? "53%" : "75%",
              flexGrow: 1,
            }}>
            <div style={{ display: "flex", paddingLeft: 10 }}>
              <input
                className="search-bar"
                placeholder="Search for items or shops"
                onFocus={handleFocus}
              />
              <button className="search-button" id="searchButton">
                <i
                  className="fal fa-search"
                  style={{ fontSize: 20 }}
                  id="searchIcon"></i>
              </button>
            </div>
          </div>
          <div
            style={{
              width: Object.entries(user).length !== 0 ? "37%" : "15%",
              flexGrow: 1,
            }}>
            {Object.entries(user).length !== 0 ? (
              <div style={{ display: "flex", paddingLeft: 40 }}>
                <div className="header-menu">
                  <div onClick={() => alert("jj")}>
                    <i
                      className="fal fa-shopping-bag"
                      style={{ fontSize: 27 }}></i>
                    <p>Sell on Shaloz</p>
                  </div>
                </div>
                <div className="header-menu">
                  <div onClick={() => alert("jj")}>
                    <i className="fal fa-bell" style={{ fontSize: 27 }}></i>
                    <p>Updates</p>
                  </div>
                </div>
                <div className="header-menu">
                  <div onClick={() => alert("jj")}>
                    <i className="fal fa-heart" style={{ fontSize: 27 }}></i>
                    <p>Favorites</p>
                  </div>
                </div>
                <div className="header-menu">
                  <div
                    onClick={() => {
                      if (!openHeaderMenu) {
                        setOpenHeaderMenu(true);
                      } else {
                        setOpenHeaderMenu(false);
                      }
                    }}>
                    <i className="fal fa-user" style={{ fontSize: 27 }}></i>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}>
                      <p>You</p>
                      <i
                        className="fas fa-caret-down"
                        style={{
                          marginTop: 5,
                          marginLeft: 5,
                          color: "#bdbdbd",
                        }}></i>
                    </div>
                  </div>
                  {openHeaderMenu && (
                    <div
                      className="popover"
                      onMouseLeave={() => setOpenHeaderMenu(false)}>
                      <div>
                        <i
                          class="fas fa-star"
                          style={{
                            fontSize: 23,
                            marginRight: 10,
                            marginTop: 1,
                          }}></i>
                        <p>Purchases & Reviews</p>
                      </div>
                      <div>
                        <i
                          class="fas fa-truck-couch"
                          style={{
                            fontSize: 23,
                            marginRight: 10,
                            marginTop: 1,
                          }}></i>

                        <p>Track your packages</p>
                      </div>
                      <div>
                        <i
                          class="fas fa-question-circle"
                          style={{
                            fontSize: 23,
                            marginRight: 10,
                            marginTop: 1,
                          }}></i>

                        <p>Help & Support</p>
                      </div>
                      <div>
                        <i
                          class="fas fa-book"
                          style={{
                            fontSize: 23,
                            marginRight: 10,
                            marginTop: 1,
                          }}></i>

                        <p>Sipping polices & Terms</p>
                      </div>
                      <div
                        onClick={() => {
                          localStorage.removeItem("token");
                          window.location.href = "/";
                        }}>
                        <i
                          class="fal fa-sign-out-alt"
                          style={{
                            fontSize: 23,
                            marginRight: 10,
                            marginTop: 1,
                          }}></i>

                        <p>Logout</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="header-menu-cart">
                  <div onClick={() => props.history.push("/cart")}>
                    <i
                      className="fal fa-shopping-cart"
                      style={{ fontSize: 27 }}></i>
                    <p>
                      Cart(
                      <span style={{ color: Colors.purple_darken }}>
                        {cart_count}
                      </span>
                      )
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10,
                  //  paddingLeft:60
                }}>
                <div style={{ width: "40%", paddingLeft: 20 }}>
                  <button
                    className="header-buttons"
                    style={{ marginTop: 6 }}
                    onClick={openAuthModal}>
                    Sign in
                  </button>
                </div>
                <div style={{ width: "40%", paddingLeft: 30 }}>
                  <button className="header-buttons" style={{ marginTop: 2 }}>
                    <i
                      className="far fa-shopping-basket"
                      style={{ fontSize: 30 }}></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {!isLoading && (
          <div className="header-bottom">
            {renderHeaderMenu}
            {category_data.main_cat && (
              <div
                onMouseEnter={() => {
                  setIsOnDiv(false);
                }}
                onClick={() => {
                  window.location.href = `/all_product?selected=${"all"}&&main_cat=${""}&&sub_cat_one=${""}&&sub_cat_two=${""}&&on_sale=${false}`;
                }}>
                <p>All categories</p>
              </div>
            )}
          </div>
        )}

        {openDiv && (
          <CategoryContainer
            isOnDiv={isOnDiv}
            setIsOnDiv={setIsOnDiv}
            setOpenDiv={setOpenDiv}
            main_cat_name={main_cat_name}
            subcat_one_data={subcat_one_data}
          />
        )}
      </div>
      {isLoading && <LinearProgress variant="query" />}
    </div>
  );
};

export default Header;
