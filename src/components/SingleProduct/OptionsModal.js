import React, { useEffect, useState } from "react";
import "styles/single_page.css";
import { Spinner } from "react-activity";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import Colors from "constants/Colors";

const OptionsModal = (props) => {
  const {
    setOpenOptionModal,
    optionModalView,
    variant,
    setSelectedVariantContent,
    selectedVariantContent,
    qty,
    setQty,
    newQty,
    setVariantsBorderColor,
    variants_length,
  } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [networkError, setNetworkError] = useState(false);
  const [qtyArray, setQtyArray] = useState([]);

  const addVariant = (content, price, index) => {
    const deleteOld = selectedVariantContent.filter((value) => {
      return value.name != variant.name;
    });
    const newArray = [
      ...deleteOld,
      { name: variant.name, content: content, price: price },
    ];

    //console.log(newArray.length);

    if (variants_length === newArray.length) {
      setVariantsBorderColor(false);
    }

    setSelectedVariantContent(newArray);

    setOpenOptionModal(false);
  };

  useEffect(() => {
    const createQtyArray = () => {
      for (let i = 1; i <= parseInt(newQty); i++) {
        setQtyArray((prev) => [...prev, { i }]);
      }
    };
    createQtyArray();
  }, []);

  const addQty = (_qty, index) => {
    setQty(_qty);
    setOpenOptionModal(false);
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

  const renderVariants = () =>
    variant.variantContent.map((result, index) => {
      return (
        <div
          style={{
            padding: 10,
            borderBottom: `0.5px solid ${Colors.light_grey}`,
            cursor: "pointer",
          }}
          key={index}>
          <div
            onClick={addVariant.bind(
              this,
              result.content,
              result.price,
              index
            )}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                <p
                  style={{
                    fontSize: 17,
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                  }}>
                  {result.content}
                </p>
              </div>
              <p
                style={{
                  fontSize: 17,
                  marginLeft: 10,
                  fontFamily: "poppins_regular",
                }}>
                +${result.price}
              </p>
            </div>
          </div>
        </div>
      );
    });

  let view;
  if (optionModalView === "qty") {
    view = loopQty();
  } else {
    view = renderVariants();
  }

  let headerTile;
  if (optionModalView === "qty") {
    headerTile = "Qty";
  } else {
    headerTile = variant.name;
  }

  return (
    <div className="option-modal">
      <div className="option-modal-header">
        <p style={{ fontFamily: "poppins_regular" }}>{headerTile}</p>
        <button onClick={() => setOpenOptionModal(false)}>
          <i className="fal fa-times" style={{ fontSize: 20 }}></i>
        </button>
      </div>
      <div className="option-modal-body">{view}</div>
    </div>
  );
};

export default OptionsModal;
