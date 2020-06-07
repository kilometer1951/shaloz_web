import React, { useEffect, useState } from "react";
import "../styles/header.css";
import Colors from "../constants/Colors";
import { Icon } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";

import { Dialog } from "@material-ui/core";
import Signup from "components/Auth/Signup";
import Login from "components/Auth/Login";

const AuthModal = (props) => {
  const dispatch = useDispatch();
  const open_auth_modal = useSelector((state) => state.app.open_auth_modal);
  const [viewToRender, setViewToRender] = useState("login");

  const handleClose = () => {
    dispatch(actions.openAuthModal(false));
  };

  let view;
  switch (viewToRender) {
    case "login":
      view = <Login />;
      break;
    case "signup":
      view = <Login />;
      break;
    default:
      break;
  }

  return (
    <Dialog
      open={open_auth_modal}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <div className="auth-dialog-container">
        <div className="auth-modal-header">
          <p>Sign in</p>
          <button>Register</button>
        </div>
        {view}
      </div>
    </Dialog>
  );
};

export default AuthModal;
