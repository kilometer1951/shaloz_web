import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import "styles/single_page.css";
import Moment from "moment";
import Colors from "constants/Colors";

import { LinearProgress } from "@material-ui/core";
import { Lightbox } from "react-modal-image";

import ReviewSection from "./ReviewSection";

const SectionOne = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { productData } = props;
  const reviewShopData = useSelector((state) => state.app.reviewShopData);
  const reviewProductData = useSelector((state) => state.app.reviewProductData);
  const [isLoading, setIsloading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const images = [{ source: selectedImage }];

  return (
    <div>
      <div className="single-page-inner-container">
        {modalIsOpen && (
          <Lightbox
            medium={selectedImage}
            large={selectedImage}
            alt={productData.product.product_name}
            onClose={() => setModalIsOpen(false)}
            hideDownload={true}
          />
        )}
        <div>
          <div
            onClick={() =>
              (document.getElementById("main_image").src =
                productData.product.main_image)
            }>
            <img src={productData.product.main_image} />
          </div>
          {productData.product.sub_image_1 && (
            <div
              onClick={() =>
                (document.getElementById("main_image").src =
                  productData.product.sub_image_1)
              }>
              <img src={productData.product.sub_image_1} />
            </div>
          )}

          {productData.product.sub_image_2 && (
            <div
              onClick={() =>
                (document.getElementById("main_image").src =
                  productData.product.sub_image_2)
              }>
              <img src={productData.product.sub_image_2} />
            </div>
          )}
          {productData.product.sub_image_3 && (
            <div
              onClick={() =>
                (document.getElementById("main_image").src =
                  productData.product.sub_image_3)
              }>
              <img src={productData.product.sub_image_3} />
            </div>
          )}
        </div>
        <div
          onClick={() => {
            setModalIsOpen(true);
            setSelectedImage(document.getElementById("main_image").src);
          }}>
          <img src={productData.product.main_image} id="main_image" />
        </div>
      </div>
      <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
        <div>
          <img
            src={productData.product.user.shop_logo}
            style={{
              objectFit: "cover",
              width: 120,
              height: 100,
              borderRadius: 5,
            }}
          />
        </div>
        <div style={{ marginLeft: 10 }}>
          <p style={{ fontFamily: "poppins_regular", fontSize: 20 }}>
            {productData.product.user.shop_name}
          </p>
          <p style={{ fontFamily: "poppins_light", fontSize: 20 }}>
            Shop owner {productData.product.user.first_name}
          </p>
          <button
            style={{
              backgroundColor: "transparent",
              padding: 10,
              fontSize: 20,
              border: "1px solid #000",
              borderRadius: 50,
              marginTop: 5,
              cursor: "pointer",
            }}>
            Message Seller
          </button>
        </div>
      </div>
      <ReviewSection productData={productData} />
    </div>
  );
};

export default SectionOne;
