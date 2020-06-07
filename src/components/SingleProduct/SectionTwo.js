import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import "styles/single_page.css";
import OptionsModal from "./OptionsModal";
import Moment from "moment";
import Colors from "constants/Colors";
import { Spinner } from "react-activity";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OutsideClickHandler from "react-outside-click-handler";

import { LinearProgress } from "@material-ui/core";
import Header from "components/Header";

const styles = {
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "0.5px solid #000",
    borderBottomColor: Colors.light_grey,
  },
  productOptions: {
    boxShadow: "0 0 2px rgba(0,0,0,0.4)",
    marginTop: 15,
    border: "1px solid #000",
    borderColor: Colors.light_grey,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    cursor: "pointer",
  },

  button: {
    backgroundColor: Colors.purple_darken,
    marginTop: 20,
    borderRadius: 50,
    textAlign: "center",
    padding: 10,
    cursor: "pointer",
  },
  buttonText: {
    fontFamily: "poppins_semibold",
    fontSize: 20,
    color: "#fff",
  },
  priceTag: {
    backgroundColor: Colors.green,
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 5,
  },
};

const SectionTwo = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { productData } = props;
  const reviewShopData = useSelector((state) => state.app.reviewShopData);
  const reviewProductData = useSelector((state) => state.app.reviewProductData);
  const [isLoading, setIsLoading] = useState(true);
  const isFav = useSelector((state) => state.app.isFav);
  const [variantsBorderColor, setVariantsBorderColor] = useState(false);
  const [selectedVariantContent, setSelectedVariantContent] = useState([]);
  const [qty, setQty] = useState("1");
  const [addingToCart, setAddingToCart] = useState(false);
  const [isAddedToCard, setIsAddedToCard] = useState(false);
  const cart_data = useSelector((state) => state.app.cart_data);
  const [customization_note, setCustomization_note] = useState("");
  const [optionModalView, setOptionModalView] = useState("");
  const [newQty, setNewQty] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [_price, setPrice] = useState("");

  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [variant, setVariant] = useState({});

  useEffect(() => {
    if (cart_data.length !== 0) {
      for (let i = 0; i < cart_data.length; i++) {
        const filter = cart_data[i].items.filter((value) => {
          if (value.product == productData.product._id) {
            setIsAddedToCard(true);
          }
        });
      }
    }
  }, []);

  const truncateString = (str, trunc_num) => {
    if (str.length > trunc_num) {
      return str.slice(0, trunc_num) + ". . .";
    } else {
      return str;
    }
  };

  const youSave = (product_price, discount) => {
    let price = parseFloat(product_price);
    let _discount = parseInt(discount);

    let total_d = _discount / 100;
    let total_p = (price * total_d).toFixed(2);

    return `You save $${total_p} (${discount}%)`;
  };

  const saleEnds = (sale_end_date) => {
    const date_is_same = Moment(
      new Date(sale_end_date.split(/\s+/).join(""))
    ).isSame(new Date(), "d");
    const new_date = Moment(
      new Date(sale_end_date.split(/\s+/).join(""))
    ).format("MMM DD, YYYY");

    if (date_is_same) {
      return "sale ends today";
    } else {
      return "sale ends " + new_date;
    }
  };

  useEffect(() => {
    const displayPrice = () => {
      if (productData.product.discount === "") {
        setPrice(productData.product.product_price);
      } else {
        let price = parseInt(productData.product.product_price);
        let _discount = parseInt(productData.product.discount);

        let total_d = _discount / 100;
        let total_p = price * total_d;
        let total = price - total_p;
        setPrice(total);
      }
    };
    displayPrice();
  }, []);
  const addFavProduct = () => {
    try {
      if (isFav) {
        dispatch(actions.removeFavProduct(user._id, productData.product._id));
        dispatch(actions.handleisFav(false));
      } else {
        dispatch(actions.addFavProduct(user._id, productData.product._id));
        dispatch(actions.handleisFav(true));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(actions.handleNetworkerror(true));
    }
  };

  const shareProduct = () => {};

  const renderDisplayOutOfStockMessage = () => {
    if (productData.product.inStock) {
      if (parseInt(productData.product.product_qty) <= 0) {
        return (
          <div onClick={() => alert("open shop")}>
            <p
              style={{
                fontFamily: "poppins_semibold",
                color: "red",
              }}>
              Out of stock: but you can still add to cart. For any questions,
              you can message the seller by visiting their shop
            </p>
          </div>
        );
      }
    } else {
      return (
        <div onClick={() => alert("open shop")}>
          <p
            style={{
              fontFamily: "poppins_semibold",
              color: "red",
            }}>
            Out of stock: For any questions, you can message the seller by
            visiting their shop. To avoid shipping delays, we do not advise
            buying items that are out of stock
          </p>
        </div>
      );
    }
  };

  const displaySelected = (variant, name) => {
    for (let i = 0; i < selectedVariantContent.length; i++) {
      if (name === selectedVariantContent[i].name) {
        return `${selectedVariantContent[i].content} (+$${selectedVariantContent[i].price})`;
      }
    }
  };

  const addToCart = async () => {
    try {
      if (!isAddedToCard) {
        if (productData.product.variants.length !== 0) {
          //this product has a variant
          if (selectedVariantContent.length === 0) {
            setOpenOptionModal(true);
            //select the first vairant
            setVariant(productData.product.variants[0]);
            setOptionModalView("variant");
            return;
          }
        }

        //check if the variant length and selected variant are the same
        if (
          productData.product.variants.length !== selectedVariantContent.length
        ) {
          // Alert.alert(
          //   'You missed some variants',
          //   ''[{text: 'Ok', onPress: () => console.log('Cancel Pressed!')}],
          //   {cancelable: false},
          // );

          dispatch(
            actions.handleAlertModal(true, "error", {message:"You missed some variants"})
          );

          setVariantsBorderColor(true);
          return;
        }
        // if (productData.product.product_can_be_customized) {
        //   if (customization_note === '') {
        //     Alert.alert(
        //       'Add personalization',
        //       ''[{text: 'Ok', onPress: () => console.log('Cancel Pressed!')}],
        //       {cancelable: false},
        //     );
        //     return;
        //   }
        // }

        //add to cart
        const data = {
          product: productData.product._id,
          seller: productData.product.user._id,
          user: user._id,
          price: _price,
          qty: qty,
          discount: productData.product.discount,
          selected_variant_value: selectedVariantContent,
          product_personalization_note: customization_note,
        };

        setIsAddedToCard(true);
        setAddingToCart(true);
        await dispatch(actions.addToCart(data));
        await dispatch(actions.fetchCartData(user._id, 1));
        setAddingToCart(false);
      } else {
       // dispatch(actions.fetchCartData(user._id, 1));
        window.location.href = "/cart";
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(actions.handleNetworkerror(true));
    }
  };

  const renderVariants = productData.product.variants.map((result, index) => {
    // Keyboard.dismiss()
    return (
      <div
        key={result._id}
        onClick={() => {
          setOpenOptionModal(true);
          setVariant(result);
          setOptionModalView("variant");
        }}>
        <div
          style={{
            ...styles.option,
            ...{ backgroundColor: variantsBorderColor ? "#fbe9e7" : "#fff" },
          }}>
          <div style={{ flexDirection: "row" }}>
            <p
              style={{
                fontFamily: "poppins_regular",
                marginRight: 5,
                color: Colors.grey_darken,
              }}>
              Select {result.name}*:
            </p>
            <p style={{ fontFamily: "poppins_regular" }}>
              {displaySelected(productData.product.variants, result.name)}
            </p>
          </div>
          <div>
            <i className="fas fa-caret-down"></i>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="right-top">
        <div
          onClick={() => {
            props.history.push("/shop/" + productData.product.user._id);
          }}>
          <p>{truncateString(productData.product.user.shop_name, 30)}</p>
        </div>
        <div>
          <p>
            <i className="fal fa-map-marker-alt" style={{ marginRight: 5 }}></i>
            {productData.product.user.shop_location_city +
              ", " +
              productData.product.user.shop_location_state}
          </p>
        </div>
      </div>
      <div className="right-top-2">
        <p style={{ fontFamily: "poppins_extra_light", fontSize: 45 }}>
          {productData.product.product_name}
        </p>
      </div>
      {renderDisplayOutOfStockMessage()}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p style={{ fontFamily: "poppins_regular", fontSize: 35 }}>
            ${_price}+
          </p>
          {productData.product.discount !== "" && (
            <p
              style={{
                fontFamily: "poppins_extra_light",
                fontSize: 20,
                marginLeft: 15,
                textDecoration: "line-through",
                marginTop: 10,
              }}>
              ${productData.product.product_price}+
            </p>
          )}
        </div>
        <div
          style={{ paddingRight: 20, display: "flex", flexDirection: "row" }}>
          <button
            onClick={shareProduct}
            style={{
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
              fontSize: 30,
              marginTop: 2,
              cursor: "pointer",
              marginRight: 20,
            }}>
            <i className="fal fa-share-alt"></i>
          </button>
          <button
            onClick={addFavProduct}
            style={{
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
              fontSize: 30,
              marginTop: 2,
              cursor: "pointer",
            }}>
            <i className={isFav ? "fas fa-heart" : "fal fa-heart"}></i>
          </button>
        </div>
      </div>
      {productData.product.discount !== "" && (
        <div>
          <p
            style={{
              fontFamily: "poppins_regular",
              color: Colors.green,
            }}>
            {youSave(
              productData.product.product_price,
              productData.product.discount
            )}
          </p>
          <div
            style={{
              backgroundColor: "#8bc34a",
              maxWidth: 210,
              borderRadius: 40,
              paddingLeft: 10,
            }}>
            <p
              style={{
                fontFamily: "poppins_regular",
              }}>
              {saleEnds(productData.product.discount_end_date)}
            </p>
          </div>
        </div>
      )}
      {productData.product.user.offers_free_shipping && (
        <div style={{ marginTop: 15 }}>
          <p
            style={{
              fontFamily: "poppins_semibold",
              fontSize: 25,
              color: Colors.green,
            }}>
            Free Shipping
          </p>
          <p style={{ fontFamily: "poppins_regular", fontSize: 20 }}>
            with ${productData.product.user.price_threshold} purchase from{" "}
            {productData.product.user.shop_name}
          </p>
        </div>
      )}
      <div style={styles.productOptions}>
        <div
          onClick={() => {
            setNewQty(productData.product.product_qty);
            setOpenOptionModal(true);
            setOptionModalView("qty");
          }}>
          <div
            style={{
              ...styles.option,
              ...{ borderBottomWidth: 1, borderColor: Colors.light_grey },
            }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  fontFamily: "poppins_regular",
                  marginRight: 5,
                  color: Colors.grey_darken,
                }}>
                Qty:
              </p>
              <p style={{ fontFamily: "poppins_regular" }}>{qty}</p>
            </div>
            <div>
              <i className="fas fa-caret-down"></i>
            </div>
          </div>
        </div>
        {renderVariants}
      </div>
      <div>
        {productData.product.product_can_be_customized && (
          <div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 15,
                }}>
                <i
                  className="fal fa-check-square"
                  style={{ colors: Colors.grey_darken, fontSize: 30 }}></i>
                <p
                  style={{
                    fontFamily: "poppins_regular",
                    fontSize: 20,
                    marginLeft: 10,
                  }}>
                  Add personalization
                </p>
              </div>
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
            </div>
          </div>
        )}
      </div>
      <div>
        {addingToCart ? (
          <div>
            <div
              style={{
                ...styles.button,
                ...{
                  display: "flex",
                  backgroundColor: Colors.blue,
                  flexDirection: "row",
                  justifyContent: "center",
                },
              }}>
              <div style={{ marginRight: 10 }}>
                <Spinner size={20} color="#000" />
              </div>
              <p style={styles.buttonText}>Adding to cart</p>
            </div>
          </div>
        ) : (
          <div className="add-to-cart-button" onClick={addToCart}>
            <div
              style={{
                ...styles.button,
                ...{
                  display: "flex",
                  backgroundColor: !isAddedToCard
                    ? Colors.purple_darken
                    : Colors.blue,
                  flexDirection: "row",
                  justifyContent: "center",
                },
              }}>
              {isAddedToCard && (
                <div style={{ marginRight: 10 }}>
                  <i
                    className="fal fa-check"
                    style={{ color: "#fff", fontSize: 30 }}></i>
                </div>
              )}
              <p style={styles.buttonText}>
                {!isAddedToCard ? "Add to cart" : "Go to cart"}
              </p>
            </div>
          </div>
        )}
      </div>
      <div>
        {productData.product.user.offers_discount_on_price_threshold && (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              //   props.navigation.push('Shops', {
              //     headerTile: 'Shop',
              //     backTitle: 'Back',
              //     seller_id: productData.product.user._id,
              //   })
            }}>
            <div style={{ padding: 10, marginTop: 15 }}>
              <p style={{ fontFamily: "poppins_semibold" }}>
                Unlock more discounts
              </p>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <div style={{ width: "10%", marginRight: 5 }}>
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
                </div>
                <div style={{ width: "90%" }}>
                  <p
                    style={{
                      fontFamily: "poppins_regular",
                    }}>
                    Buy {productData.product.user.max_items_to_get_discount}{" "}
                    item(s) from {productData.product.user.shop_name} and get{" "}
                    {productData.product.user.discount_amount_for_threshold}%
                    off your order
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "poppins_regular",
                  color: Colors.grey_darken,
                  marginTop: 4,
                }}>
                Discount shown at checkout. See item details for sale
              </p>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 10 }}>
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <p style={{ fontFamily: "poppins_regular" }}>Item details</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <p style={{ fontFamily: "poppins_light" }}>
                {productData.product.product_details}
              </p>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div style={{ marginTop: 10 }}>
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <p style={{ fontFamily: "poppins_regular" }}>Shipping & policies</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                  }}>
                  Shipping
                </p>

                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 17,
                  }}>
                  Processing time
                </p>
                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  The time I need to prepare an order for shipping varies.
                </p>
              </div>
              <div
                style={{
                  paddingHorizontal: 5,
                  marginTop: 15,
                  paddingTop: 10,
                }}>
                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 17,
                  }}>
                  Secure Payment
                </p>
                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  All payments are processed through Shaloz app using your debit
                  or credit card. Merchants on Shaloz never receive your credit
                  card information. For your security, all payments should be
                  processed through the app to avoid fraudulent activity.
                </p>
              </div>
              <div
                style={{
                  marginTop: 15,
                  paddingTop: 10,
                }}>
                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 10,
                  }}>
                  Returns and exchanges
                </p>

                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  All merchants on Shaloz gladly accept returns, exchanges, and
                  cancellations. Just contact the seller within 7 days of
                  delivery.
                </p>

                <p
                  style={{
                    marginLeft: 11,
                    fontFamily: "poppins_semibold",
                    marginTop: 17,
                  }}>
                  Conditions of return
                </p>

                <p
                  style={{
                    marginLeft: 10,
                    fontFamily: "poppins_regular",
                    fontSize: 15,
                  }}>
                  Buyers are responsible for return shipping costs. If the item
                  is not returned in its original condition, the buyer is
                  responsible for any loss in value
                </p>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setOpenOptionModal(false);
        }}>
        {openOptionModal && (
          <OptionsModal
            setOpenOptionModal={setOpenOptionModal}
            optionModalView={optionModalView}
            variant={variant}
            selectedVariantContent={selectedVariantContent}
            setSelectedVariantContent={setSelectedVariantContent}
            qty={qty}
            setQty={setQty}
            newQty={newQty}
            setVariantsBorderColor={setVariantsBorderColor}
            variants_length={productData.product.variants.length}
          />
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default SectionTwo;
