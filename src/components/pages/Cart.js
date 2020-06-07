import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Colors from "constants/Colors";
import * as actions from "actions";
import CartOptionModal from "components/Cart/CartOptionModal";

import visa from "payment-icons/min/flat/visa.svg";
import mastercard from "payment-icons/min/flat/mastercard.svg";
import discover from "payment-icons/min/flat/discover.svg";
import maestro from "payment-icons/min/flat/maestro.svg";
import jcb from "payment-icons/min/flat/jcb.svg";
import unionpay from "payment-icons/min/flat/unionpay.svg";
import diners from "payment-icons/min/flat/diners.svg";
import amex from "payment-icons/min/flat/amex.svg";
import Footer from "components/Footer";
import { Pagination } from "@material-ui/lab";
import { Spinner } from "react-activity";
const styles = {
  priceTag: {
    backgroundColor: Colors.green,
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5,
  },
  previousPrice: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontFamily: "poppins_regular",
    color: "#9e9e9e",
  },
};

export default (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cart_count = useSelector((state) => state.app.cart_count);
  const cart_data = useSelector((state) => state.app.cart_data);
  const cartPageCount = useSelector((state) => state.app.cartPageCount);
  const isLoading = useSelector((state) => state.app.isLoading);
  const [customization_note, setCustomization_note] = useState("");
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [optionModalView, setOptionModalView] = useState("");
  const [qty, setQty] = useState(0);

  const [cart_id, setCart_id] = useState();
  const [item_id, setItem_id] = useState(0);

  const handlePagination = async (event, page_number) => {
    await dispatch(actions.fetchCartData(user._id, page_number));
  };

  const displayPrice = (product_price, discount) => {
    if (discount === "") {
      return parseFloat(product_price);
    } else {
      let price = parseInt(product_price);
      let _discount = parseInt(discount);

      let total_d = _discount / 100;
      let total_p = price * total_d;
      let total = price - total_p;

      return total;
    }
  };

  const calculateDicount_with_discount = (item) => {
    let count_sub_total = 0;
    let variantsTotal = 0;
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < item[i].selected_variant_value.length; j++) {
        let pricePerVariant = parseFloat(
          item[i].selected_variant_value[j].price
        );
        variantsTotal += parseFloat(pricePerVariant);
      }
      let pricePerItem = 0;
      const product_price_total =
        parseFloat(item[i].product.product_price) + variantsTotal;

      if (item[i].product.discount !== "") {
        const discount =
          (product_price_total * parseFloat(item[i].product.discount)) / 100;

        const newTotal = product_price_total - discount;

        pricePerItem = newTotal * parseInt(item[i].qty);
      } else {
        pricePerItem = product_price_total * parseInt(item[i].qty);
      }

      count_sub_total += parseFloat(pricePerItem);
    }

    //console.log(count_sub_total);

    return count_sub_total.toFixed(2);
  };

  const getItemTotal = (item) => {
    let count_sub_total = 0;
    let variantsTotal = 0;
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < item[i].selected_variant_value.length; j++) {
        let pricePerVariant = parseFloat(
          item[i].selected_variant_value[j].price
        );
        variantsTotal += parseFloat(pricePerVariant);
      }
      let pricePerItem;
      const product_price_total = parseFloat(item[i].product.product_price);

      pricePerItem = product_price_total * parseInt(item[i].qty);

      count_sub_total += parseFloat(pricePerItem);
    }

    return (variantsTotal + count_sub_total).toFixed(2);
  };

  const getTotalProgress = (item) => {
    let count_sub_total = 0;
    let variantsTotal = 0;
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < item[i].selected_variant_value.length; j++) {
        let pricePerVariant = parseFloat(
          item[i].selected_variant_value[j].price
        );
        variantsTotal += parseFloat(pricePerVariant);
      }
      let pricePerItem;
      const product_price_total =
        parseFloat(item[i].product.product_price) + variantsTotal;

      // if (item[i].product.discount !== "") {

      const discount =
        (product_price_total *
          parseFloat(
            item[i].product.discount === "" ? 0 : item[i].product.discount
          )) /
        100;

      const newTotal = product_price_total - parseFloat(discount);

      pricePerItem = parseFloat(newTotal) * parseInt(item[i].qty);

      count_sub_total += parseFloat(pricePerItem);
    }

    return count_sub_total.toFixed(2);
  };

  const calculate_discount_total = (item) => {
    let count = 0;
    for (let i = 0; i < item.length; i++) {
      let discount = 0;
      if (item[i].product.discount !== "") {
        discount =
          parseFloat(item[i].product.product_price) *
          (parseFloat(item[i].product.discount) / 100);
      }
      count += discount;
    }
    return count.toFixed(2);
  };

  const getTotalDiscountApplied = (result) => {
    let total = 0;

    if (result.seller.offers_discount_on_price_threshold) {
      const totalItems =
        parseInt(result.seller.max_items_to_get_discount) - result.items.length;

      if (totalItems <= 0) {
        const discount =
          parseFloat(result.seller.discount_amount_for_threshold) / 100;
        const new_discount = parseFloat(getItemTotal(result.items)) * discount;

        return (total = (
          parseFloat(calculate_discount_total(result.items)) +
          parseFloat(new_discount)
        ).toFixed(2));
      }
    }

    // console.log(getItemTotal(result.items));

    return calculate_discount_total(result.items);
  };

  const getSubTotal = (result) => {
    return (
      parseFloat(getItemTotal(result.items)) -
      parseFloat(getTotalDiscountApplied(result))
    ).toFixed(2);
  };

  const renderShippingMessage = (result) => {
    const totalItems = (
      parseFloat(result.seller.price_threshold) -
      parseFloat(calculateDicount_with_discount(result.items))
    ).toFixed(2);

    if (parseFloat(totalItems) <= 0) {
      return (
        <p
          style={{ fontFamily: "poppins_light", fontSize: 20, color: "green" }}>
          FREE
        </p>
      );
    } else {
      return (
        <p style={{ fontFamily: "poppins_light", fontSize: 15, marginTop: 5 }}>
          Calculated on checkout
        </p>
      );
    }
  };

  const renderFreeShipping = (result) => {
    const totalItems = (
      parseFloat(result.seller.price_threshold) -
      parseFloat(getTotalProgress(result.items))
    ).toFixed(2);

    const bar_length = parseFloat(
      100 / parseFloat(result.seller.price_threshold)
    );

    const progress_loader =
      bar_length * parseFloat(getTotalProgress(result.items));

    //console.log(progress_loader);

    //console.log(getTotalProgress(result.items));

    if (parseFloat(totalItems) <= 0) {
      return (
        <div className="discount-progress-section" style={{ marginTop: 30 }}>
          <div style={{ marginBottom: 5 }}>
            <p style={{ color: "green" }}>
              <span style={{ fontFamily: "poppins_regular" }}>
                You unlocked
              </span>
              <span style={{ fontFamily: "poppins_semibold" }}> free</span>
              <span style={{ fontFamily: "poppins_regular" }}>
                {" "}
                shipping from this shop
              </span>
            </p>
          </div>
          <LinearProgress variant="determinate" value={100} color="primary" />
        </div>
      );
    } else {
      return (
        <div
          className="discount-progress-section"
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.history.push("/shop/" + result.seller._id);
          }}>
          <div style={{ marginBottom: 5, marginTop: 30 }}>
            <p>
              <span style={{ fontFamily: "poppins_regular" }}>You're</span>
              <span style={{ fontFamily: "poppins_semibold" }}>
                {" "}
                ${totalItems}
              </span>
              <span style={{ fontFamily: "poppins_regular" }}>
                {" "}
                away from getting free shipping on item(s) from this shop. Visit
                shop
              </span>
            </p>
          </div>
          <LinearProgress
            variant="determinate"
            value={progress_loader}
            color="primary"
          />
        </div>
      );
    }
  };

  const storeDiscount = (result) => {
    const totalItems =
      parseInt(result.seller.max_items_to_get_discount) - result.items.length;

    const bar_length = parseFloat(
      (100 / result.seller.max_items_to_get_discount).toFixed(2)
    );

    const progress_loader = bar_length * result.items.length;

    if (totalItems <= 0) {
      return (
        <div className="discount-progress-section">
          <div style={{ marginBottom: 5 }}>
            <p style={{ color: "green" }}>
              <span style={{ fontFamily: "poppins_regular" }}>A</span>
              <span style={{ fontFamily: "poppins_semibold" }}>
                {" "}
                {result.seller.discount_amount_for_threshold}%
              </span>
              <span style={{ fontFamily: "poppins_regular" }}>
                {" "}
                discount has been added to your total
              </span>
            </p>
          </div>
          <LinearProgress variant="determinate" value={100} color="primary" />
        </div>
      );
    } else {
      return (
        <div
          className="discount-progress-section"
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.history.push("/shop/" + result.seller._id);
          }}>
          <div style={{ marginBottom: 5 }}>
            <p>
              <span style={{ fontFamily: "poppins_regular" }}>You're</span>
              <span style={{ fontFamily: "poppins_semibold" }}>
                {" "}
                {totalItems} item(s)
              </span>
              <span style={{ fontFamily: "poppins_regular" }}>
                {" "}
                away from getting a{" "}
                {result.seller.discount_amount_for_threshold}% discount on your
                total. Visit shop
              </span>
            </p>
          </div>
          <LinearProgress
            variant="determinate"
            value={progress_loader}
            color="primary"
          />
        </div>
      );
    }
  };

  const renderSelectedVariant = (selected_varaiant) => {
    return selected_varaiant.map((result, index) => {
      return (
        <p
          style={{
            fontFamily: "poppins_regular",
            color: "#757575",
            fontSize: 14,
          }}
          key={index}>
          {result.name}: {result.content} (+${result.price})
        </p>
      );
    });
  };

  const renderProduct = (data) => {
    return data.items.map((result, index) => {
      return (
        <div className="cart-product-container" key={index}>
          <div className="cart-product-container-left">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <img
                  src={result.product.main_image}
                  style={{
                    width: 150,
                    height: 130,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </div>
              <div style={{ marginLeft: 13 }}>
                <p style={{ fontFamily: "poppins_light", marginBottom: 5 }}>
                  {result.product.product_name}
                </p>
                <div>
                  {renderSelectedVariant(result.selected_variant_value)}
                  {result.selected_variant_value.length !== 0 && (
                    <button
                      className="cart-header-button"
                      style={{ marginTop: 5 }}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
            {result.product.product_can_be_customized &&
              result.product_personalization_note && (
                <div style={{ marginTop: 10 }}>
                  <p>
                    <span style={{ fontFamily: "poppins_regular" }}>
                      Personalization:{" "}
                    </span>
                    <span style={{ fontFamily: "poppins_light" }}>
                      {result.product_personalization_note}
                    </span>
                  </p>

                  <button
                    id={"edit_personalization" + result._id}
                    className="cart-header-button"
                    style={{ marginTop: 5 }}
                    onClick={() => {
                      setSelectedIndex(result._id);
                      setCustomization_note(
                        result.product_personalization_note
                      );
                    }}>
                    Edit
                  </button>
                  {selectedIndex !== "" && selectedIndex == result._id && (
                    <div>
                      <textarea
                        style={{
                          fontSize: 20,
                          fontFamily: "poppins_regular",
                          padding: 10,
                          borderColor: Colors.light_grey,
                          borderRadius: 5,
                          maxHeight: 200,
                          outline: "none",
                          resize: "none",
                          width: 400,
                        }}
                        value={customization_note}
                        onChange={(e) =>
                          setCustomization_note(e.target.value)
                        }></textarea>
                      <div>
                        <button
                          className="update-item-button"
                          onClick={() => {
                            //dispatch new update
                            dispatch(
                              actions.updatePersonalization(
                                user._id,
                                data._id,
                                result._id,
                                customization_note
                              )
                            );
                            setSelectedIndex("");
                            //   document.querySelector(".cart-header-button").style.visibility="visible"
                            document.getElementById(
                              "edit_personalization" + result._id
                            ).style.visibility = "visible";
                          }}>
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIndex("");
                            //   document.querySelector(".cart-header-button").style.visibility="visible"
                            document.getElementById(
                              "edit_personalization" + result._id
                            ).style.visibility = "visible";
                          }}
                          className="cancel-update-item-button">
                          cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
          <div className="cart-product-container-middle">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "50%",
                boxShadow: " 0 0 2px rgba(0, 0, 0, 0.5)",
                padding: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                setCart_id(data._id);
                setItem_id(result._id);
                setQty(result.product.product_qty);
                setOpenOptionModal(true);
                setOptionModalView("qty");
              }}>
              <p style={{ fontFamily: "poppins_regular" }}>{result.qty}</p>
              <i
                className="fas fa-caret-down"
                style={{ marginTop: 3, color: "#9e9e9e" }}></i>
            </div>
            {result.product.discount && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={styles.priceTag}>
                    <i
                      className="fad fa-tags"
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        marginTop: 8,
                        marginLeft: 5,
                      }}></i>
                  </div>
                  <div style={{ marginTop: 10, marginLeft: 5 }}>
                    <p>
                      <span style={{ fontFamily: "poppins_semibold" }}>
                        Sale:
                      </span>{" "}
                      <span style={{ fontFamily: "poppins_light" }}>
                        {result.product.discount}% off
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cart-product-container-right">
            <p style={{ fontFamily: "poppins_regular" }}>
              $
              {displayPrice(
                result.product.product_price,
                result.product.discount
              ).toFixed(2)}
            </p>

            {result.discount && (
              <p style={styles.previousPrice}>
                ${parseFloat(result.product.product_price).toFixed(2)}
              </p>
            )}
            <button
              className="cart-header-button"
              onClick={() => {
                dispatch(
                  actions.handleAlertModal(true, "delete_product_data", {
                    cart_id: data._id,
                    item_id: result._id,
                  })
                );
              }}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  const renderCart = cart_data.map((result, index) => {
    // console.log(result.items);

    return (
      <div className="cart-container" key={result._id}>
        <div className="cart-data-container">
          <div className="cart-data">
            <div className="cart-data-left">
              <div className="cart-data-left-header-container">
                <div className="cart-data-left-header-left">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <img
                        src={result.seller.shop_logo}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          marginLeft: 10,
                          fontFamily: "poppins_regular",
                          marginTop: 4,
                        }}>
                        {result.seller.shop_name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cart-data-left-header-right">
                  <div style={{ marginTop: 5 }}>
                    <button
                      className="cart-header-button"
                      style={{ marginRight: 20 }}
                      onClick={() => {
                        props.history.push("/shop/" + result.seller._id);
                      }}>
                      Visit shop
                    </button>
                    <button
                      className="cart-header-button"
                      onClick={() => {
                        dispatch(
                          actions.handleAlertModal(true, "delete_cart_data", {
                            cart_id: result._id,
                          })
                        );
                      }}>
                      Delete cart
                    </button>
                  </div>
                </div>
              </div>
              {result.seller.offers_discount_on_price_threshold &&
                storeDiscount(result)}

              {result.seller.offers_free_shipping && renderFreeShipping(result)}

              {renderProduct(result)}
            </div>
            <div className="cart-data-right">
              <div className="payment-container">
                <p style={{ fontFamily: "poppins_semibold", fontSize: 25 }}>
                  How you'll pay
                </p>
                <p
                  style={{
                    fontFamily: "poppins_regular",
                    color: "#757575",
                    fontSize: 14,
                  }}>
                  This shop accepts debit and credit cards{" "}
                </p>
                <div>
                  <img src={visa} style={{ width: 40, height: 40 }} />
                  <img
                    src={mastercard}
                    style={{ width: 40, height: 40, marginLeft: 5 }}
                  />
                  <img
                    src={discover}
                    style={{ width: 40, height: 40, marginLeft: 5 }}
                  />
                  <img
                    src={maestro}
                    style={{ width: 40, height: 40, marginLeft: 5 }}
                  />
                  <img
                    src={jcb}
                    style={{ width: 40, height: 40, marginLeft: 5 }}
                  />
                  <img
                    src={unionpay}
                    style={{ width: 40, height: 40, marginLeft: 5 }}
                  />
                  <img
                    src={diners}
                    style={{ width: 40, height: 40, marginRight: 5 }}
                  />
                  <img
                    src={amex}
                    style={{ width: 40, height: 40, marginLeft: 5 }}
                  />
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    paddingBottom: 15,
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}>
                    <p style={{ fontFamily: "poppins_light", fontSize: 20 }}>
                      Item(s) total
                    </p>
                    <p style={{ fontFamily: "poppins_light", fontSize: 20 }}>
                      ${getItemTotal(result.items)}
                    </p>
                  </div>
                  {getTotalDiscountApplied(result) !== "0.00" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}>
                      <p style={{ fontFamily: "poppins_light", fontSize: 20 }}>
                        Discount
                      </p>
                      <p style={{ fontFamily: "poppins_light", fontSize: 20 }}>
                        -${getTotalDiscountApplied(result)}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #e0e0e0",
                    paddingBottom: 15,
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}>
                    <p
                      style={{
                        fontFamily: "poppins_regular",
                        fontSize: 20,
                        fontWeight: 600,
                      }}>
                      Subtotal
                    </p>
                    <p style={{ fontFamily: "poppins_light", fontSize: 20 }}>
                      ${getSubTotal(result)}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}>
                    <p style={{ fontFamily: "poppins_light", fontSize: 20 }}>
                      Shipping
                    </p>

                    {result.seller.offers_free_shipping ? (
                      renderShippingMessage(result)
                    ) : (
                      <p
                        style={{
                          fontFamily: "poppins_light",
                          fontSize: 15,
                          marginTop: 5,
                        }}>
                        Calculated on checkout
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}>
                  <p
                    style={{
                      fontFamily: "poppins_regular",
                      fontSize: 20,
                      fontWeight: 600,
                    }}>
                    Total({result.items.length} item
                    {result.items.length > 1 && "s"})
                  </p>
                  <p
                    style={{
                      fontFamily: "poppins_regular",
                      fontSize: 20,
                      fontWeight: 600,
                    }}>
                    ${getSubTotal(result)}
                  </p>
                </div>
                <div style={{ marginTop: 10 }}>
                  <button className="checkout-button">
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header history={props.history} />
      <div style={{ backgroundColor: "#ede7f6", height: "100%" }}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              margin: "auto",
              width: "50%",
              height: "100vh",
              justifyContent: "center",
              paddingTop: "20%",
            }}>
            <Spinner size={40} color="#000" />
          </div>
        ) : (
          <div>
            <div>
              <div className="cart-container-header">
                <div>
                  <p>{cart_count} items in your cart</p>
                </div>
                <div>
                  <button>keep shopping</button>
                </div>
              </div>
              {renderCart}
              <div
                style={{
                  display: "flex",
                  margin: "auto",
                  width: "50%",
                  marginTop: 20,
                  textAlign: "center",
                  justifyContent: "center",
                }}>
                {cartPageCount > 1 && (
                  <Pagination
                    count={cartPageCount}
                    defaultPage={1}
                    size="large"
                    onChange={handlePagination}
                  />
                )}
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
      {openOptionModal && (
        <CartOptionModal
          openOptionModal={openOptionModal}
          setOpenOptionModal={setOpenOptionModal}
          optionModalView={optionModalView}
          setQty={setQty}
          qty={qty}
          cart_id={cart_id}
          item_id={item_id}
        />
      )}
    </div>
  );
};
