import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Spinner } from "react-activity";
import Colors from "constants/Colors";
import { Dialog } from "@material-ui/core";
import * as actions from "actions";
import { useSelector, useDispatch } from "react-redux";

export default (props) => {
  const {
    optionModalView,
    setOpenOptionModal,
    qty,
    openOptionModal,
    cart_id,
    item_id,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const [qtyArray, setQtyArray] = useState([]);

  useEffect(() => {
    const createQtyArray = () => {
      for (let i = 1; i <= parseInt(qty); i++) {
        setQtyArray((prev) => [...prev, { i }]);
      }
    };
    createQtyArray();
  }, []);

  console.log(qty);

  const addQty = async (qty, index) => {
    setIsLoading(true);
    await actions.updateCartQty(user._id, qty, cart_id, item_id);
    setIsLoading(false);
    window.location.reload();
  };

  const loopQty = () => {
    return qtyArray.map((result, index) => {
      return (
        <div
          key={index}
          style={{
            padding: 10,
            borderBottom: `0.5px solid ${Colors.light_grey}`,
            cursor: "pointer",
          }}>
          <div onClick={addQty.bind(this, result.i, index)}>
            <p
              style={{
                marginLeft: 10,
                fontFamily: "poppins_regular",
              }}>
              {result.i}
            </p>
          </div>
        </div>
      );
    });
  };

  let view;
  if (optionModalView === "qty") {
    view = loopQty();
  } else {
    view = <div>variant</div>;
  }

  let headerTile;
  if (optionModalView === "qty") {
    headerTile = "Qty";
  } else {
    headerTile = "Product options";
  }

  return (
    <Dialog
      onClose={() => {
        !isLoading && setOpenOptionModal(false);
      }}
      aria-labelledby="simple-dialog-title"
      open={openOptionModal}>
      <div className="option-modal-cart">
        <div className="option-modal-header-cart">
          <p style={{ fontFamily: "poppins_regular" }}>{headerTile}</p>
          <button onClick={() => !isLoading && setOpenOptionModal(false)}>
            <i className="fal fa-times" style={{ fontSize: 20 }}></i>
          </button>
        </div>
        <div className="option-modal-body-cart">{view}</div>
      </div>
    </Dialog>
  );
};
