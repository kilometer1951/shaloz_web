import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Dialog } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fff",
    border: "none",
    boxShadow: theme.shadows[5],
    padding: 10,
  },
}));

const AlertModal = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const openAlertModal = useSelector((state) => state.app.openAlertModal);

  const handleOpen = () => {
    dispatch(actions.handleAlertModal(true));
  };

  const handleClose = () => {
    dispatch(actions.handleAlertModal(false));
  };

  let view;
  if (openAlertModal.action === "error") {
    view = (
      <div style={{ padding: 30 }}>
        <p style={{ fontFamily: "poppins_regular" }}>
          {openAlertModal.data.message}
        </p>
      </div>
    );
  }

  if (openAlertModal.action === "delete_cart_data") {
    view = (
      <div style={{ padding: 30 }}>
        <p style={{ fontFamily: "poppins_regular" }}>
          Are you sure you want to delete this cart
        </p>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}>
          <Button color="secondary" onClick={async () => {
                await dispatch(actions.removeCart(user._id, openAlertModal.data.cart_id));
                window.location.reload()
          }}>Delete</Button>
          <Button onClick={() => { 
             dispatch(actions.handleAlertModal(false));
          }} color="primary">Continue, shopping</Button>
        </div>
      </div>
    );
  }


  if (openAlertModal.action === "delete_product_data") {
    view = (
      <div style={{ padding: 30 }}>
        <p style={{ fontFamily: "poppins_regular" }}>
          Are you sure you want to delete this cart
        </p>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}>
          <Button color="secondary" onClick={async () => {
                await actions.removeCartItem(user._id, openAlertModal.data.cart_id, openAlertModal.data.item_id)
                window.location.reload()
          }}>Delete</Button>
          <Button onClick={() => { 
             dispatch(actions.handleAlertModal(false));
          }} color="primary">Continue, shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openAlertModal.value}>
      {view}
    </Dialog>
  );
};

export default AlertModal;
