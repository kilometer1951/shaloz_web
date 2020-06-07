import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import * as actions from "actions";
import { useSpring, animated } from "react-spring";
import AuthModal from "./AuthModal";
import AlertModal from "./AlertModal";
import NetworkError from "./NetworkError";

export default ({ children }) => {
  const dispatch = useDispatch();
  const toggle_search_bar = useSelector((state) => state.app.toggle_search_bar);
  const open_auth_modal = useSelector((state) => state.app.open_auth_modal);
  const user = useSelector((state) => state.auth.user);
  const openAlertModal = useSelector((state) => state.app.openAlertModal);
  const openNetworkError = useSelector((state) => state.app.openNetworkError);

  return (
    <div>
      {children}
      {toggle_search_bar && (
        <OutsideClickHandler
          onOutsideClick={() => {
            document.getElementById("searchButton").style.backgroundColor =
              "#f5f5f5";
            document.getElementById("searchIcon").style.color = "#000";
            dispatch(actions.toggleSearchBar(false));
          }}>
          <animated.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              position: "absolute",
              width: Object.entries(user).length === 0 ? "66%" : "45%",
              zIndex: 1,
              left: 0,
              right: Object.entries(user).length === 0 ? 0 : "22%",
              top: "10%",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              flexGrow: 1,
            }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                <p style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
                  Products
                </p>
              </div>
              <div style={{ width: "50%" }}>
                <p style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
                  Shops
                </p>
              </div>
            </div>
          </animated.div>
        </OutsideClickHandler>
      )}
      <AuthModal />
      {openAlertModal.value && <AlertModal />}
      {openNetworkError && <NetworkError />}
    </div>
  );
};
