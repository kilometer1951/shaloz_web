import React, { useEffect, useState } from "react";
import Header from "components/Header";
import * as actions from "actions";
import "styles/single_page.css";
import Moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import ShopHeader from "components/Shop/ShopHeader";
import ShopCategories from "components/Shop/ShopCategories";
import { Pagination } from "@material-ui/lab";
import { Spinner } from "react-activity";
import ShopReviewSection from "components/Shop/ShopReviewSection";
import Footer from "components/Footer";

const styles = {
  discountContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    marginTop: 5,
    marginLeft: 5,
    padding: 2,
    borderRadius: 5,
    opacity: 0.7,
  },
  previousPrice: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginLeft: 5,
    fontFamily: "poppins_regular",
  },
  productContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    //paddingLeft: 10,
  },
};

const Shop = (props) => {
  const dispatch = useDispatch();
  const shop_id = props.match.params.shop_id;
  const [isLoading, setIsLoading] = useState(true);

  const [productData, setProductData] = useState([]);
  const [productPageCount, setProductPageCount] = useState(0);
  const [seller_info, setSeller_info] = useState({});

  const [shopReviewPageCount, setShopReviewPageCount] = useState(0);
  const [shop_reviews, setShop_reviews] = useState([]);

  const [shop_header_products, setShop_header_products] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("all");
  const [page, setPage] = useState(1);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      setIsLoading(true);
      setIsLoadingMore(true);
      const response = await actions.fetchShopData(shop_id);
      setIsLoading(false);
      setProductData(response.products);
      setProductPageCount(response.productPageCount);
      setSeller_info(response.seller_info);
      setShopReviewPageCount(response.shopReviewPageCount);
      setShop_reviews(response.shop_reviews);
      setShop_header_products(response.shop_header_products);
      setCategories(response.categories);
      setIsLoadingMore(false);
    };
    fetchShopData();
  }, []);

  const truncateString = (str) => {
    if (str.length > 50) {
      return str.slice(0, 50) + ". . .";
    } else {
      return str;
    }
  };

  const displayPrice = (product_price, discount) => {
    if (discount === "") {
      return product_price;
    } else {
      let price = parseInt(product_price);
      let _discount = parseInt(discount);

      let total_d = _discount / 100;
      let total_p = price * total_d;
      let total = price - total_p;

      return total;
    }
  };

  const handlePagination = async (event, page_number) => {
    setPage(page_number);
    if (selected === "all") {
      setIsLoadingMore(true);
      const response = await actions.fetch_more_shop_product(
        shop_id,
        page_number
      );
      setIsLoadingMore(false);
      setProductData(response.data);
      setProductPageCount(response.productPageCount);
      document.getElementById("items_container").scrollIntoView();
    } else {
      setIsLoadingMore(true);
      const response = await actions.fetch_more_shop_category_product(
        shop_id,
        page_number,
        selected
      );
      setIsLoadingMore(false);
      setProductData(response.data);
      setProductPageCount(response.productPageCount);
      document.getElementById("items_container").scrollIntoView();
    }
  };

  const renderItems = productData.map((result, index) => {
    return (
      <div
        style={{
          width: "23%",
          cursor: "pointer",
          paddingLeft: 18,
          marginBottom: 20,
        }}
        key={index}
        onClick={() =>
          props.history.push("/single_product_page/" + result._id)
        }>
        <div style={{ height: 200 }} className="products">
          {result.discount !== "" && (
            <div style={styles.discountContainer}>
              <p style={{ fontFamily: "poppins_regular" }}>
                {result.discount}% OFF
              </p>
            </div>
          )}
          <img
            src={result.main_image}
            style={{
              width: "100%",
              height: 190,
              objectFit: "cover",
              borderRadius: 3,
            }}
          />
        </div>
        <div>
          <p style={{ fontFamily: "poppins_light" }}>
            {truncateString(result.product_name)}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <p style={{ fontFamily: "poppins_regular" }}>
              ${displayPrice(result.product_price, result.discount)}
            </p>
            {result.discount !== "" && (
              <p style={styles.previousPrice}>${result.product_price}</p>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Header history={props.history} />
      {!isLoading && (
        <div>
          <ShopHeader
            history={props.history}
            shop_header_products={shop_header_products}
          />
          <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
            <div
              style={{ display: "flex", flexDirection: "row", width: "50%" }}>
              <div>
                <img
                  src={seller_info.shop_logo}
                  style={{
                    width: 170,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                />
              </div>
              <div style={{ marginLeft: 20 }}>
                <p style={{ fontFamily: "poppins_regular", fontSize: 25 }}>
                  {seller_info.shop_name}
                </p>
                <p style={{ fontFamily: "poppins_light", fontSize: 18 }}>
                  {seller_info.shop_slogan}
                </p>
                <p style={{ fontFamily: "poppins_light" }}>
                  {seller_info.first_name + " " + seller_info.last_name}
                </p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      borderRight: "1px solid #bdbdbd",
                      paddingRight: 20,
                    }}>
                    <p
                      style={{
                        fontFamily: "poppins_light",
                        fontSize: 16,
                        color: "#757575",
                      }}>
                      <i
                        className="fas fa-map-marker-alt"
                        style={{ marginRight: 5 }}></i>
                      {seller_info.shop_location_city +
                        ", " +
                        seller_info.shop_location_state}
                    </p>
                  </div>
                  <div style={{ marginLeft: 20 }}>
                    <p
                      style={{
                        fontFamily: "poppins_light",
                        fontSize: 16,
                        color: "#757575",
                      }}>
                      On Shaloz since {Moment(seller_info.date_joined).year()}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    border: "1px solid #bdbdbd",
                    padding: 10,
                    width: 140,
                    textAlign: "center",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}>
                  <p style={{ fontFamily: "poppins_light" }}>
                    <i className="far fa-heart" style={{ marginRight: 10 }}></i>
                    Favorite shop
                  </p>
                </div>
              </div>
            </div>
            <div style={{ width: "50%", display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  width: 500,
                }}>
                <div style={{ marginRight: 20, marginTop: 14 }}>
                  <p style={{ fontSize: 20 }}>
                    <i className="fas fa-heart-circle"></i>
                  </p>
                </div>
                <p>
                  <span style={{ fontFamily: "poppins_regular" }}>
                    Buyers keep coming back!
                  </span>
                  <span style={{ fontFamily: "poppins_light" }}>
                    Multiple buyers came back to this shop for an additional
                    purchase.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: 20 }} id="items_container">
            <p style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
              Items
            </p>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
              <div style={{ width: "30%" }}>
                <ShopCategories
                  categories={categories}
                  selected={selected}
                  setSelected={setSelected}
                  setProductPageCount={setProductPageCount}
                  setIsLoadingMore={setIsLoadingMore}
                  setProductData={setProductData}
                  setPage={setPage}
                  shop_id={shop_id}
                />
              </div>
              <div style={{ width: "70%" }}>
                <div id="product_section_two">
                  {isLoadingMore ? (
                    <div
                      style={{
                        display: "flex",
                        margin: "auto",
                        width: "50%",
                        justifyContent: "center",
                        marginTop: 20,
                        marginBottom: 20,
                      }}>
                      <Spinner size={40} color="#000" />
                    </div>
                  ) : (
                    <div style={styles.productContainer}>{renderItems}</div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      margin: "auto",
                      width: "50%",
                      textAlign: "center",
                      justifyContent: "center",
                    }}>
                    {productPageCount > 1 && (
                      <Pagination
                        count={productPageCount}
                        defaultPage={page}
                        size="large"
                        onChange={handlePagination}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {shop_reviews.length !== 0 && (
            <div className="shop-reviews">
              <div style={{ borderTop: "2px solid #e0e0e0", padding: 30 }}>
                <p style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
                  Reviews
                </p>
                <ShopReviewSection
                  shopReviewPageCount={shopReviewPageCount}
                  shop_reviews={shop_reviews}
                  setShop_reviews={setShop_reviews}
                  shop_id={shop_id}
                />
              </div>
            </div>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Shop;
