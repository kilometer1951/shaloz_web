import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";

const CategoryContainer = (props) => {
  const {
    setIsOnDiv,
    isOnDiv,
    setOpenDiv,
    main_cat_name,
    subcat_one_data,
  } = props;
  const [sub_cat_all_name, setSub_cat_all_name] = useState("");
  const [sub_cat_two_name, setSub_cat_two_name] = useState("");
  const [openRightView, setOpenRightView] = useState(false);
  const [subcat_two_data, setSubcat_two_data] = useState([]);
  const category_data = useSelector((state) => state.app.category_data);

  const renderSubCatOne = subcat_one_data.slice(0, 8).map((result, index) => {
    return (
      <div
        key={index}
        className="sub-cat-one-container"
        onMouseEnter={() => {
          setSub_cat_all_name(result.name);
          const sub_cat_one = category_data.subcat_two_data.filter(
            (value) => value.subCategoryOne == result._id
          );
          setSubcat_two_data(sub_cat_one);
          setOpenRightView(true);
        }}
        onClick={() => {
          window.location.href = `/all_product?selected=${result.name}&&main_cat=${main_cat_name}&&sub_cat_one=${sub_cat_all_name}&&sub_cat_two=${sub_cat_two_name}&&on_sale=${false}`;
        }}>
        <div style={{ marginTop: 12 }}>
          <p>{result.name}</p>
        </div>
        <div style={{ marginTop: 12 }}>
          <i className="far fa-chevron-right"></i>
        </div>
      </div>
    );
  });

  const renderSubCatTwo = subcat_two_data.map((result, index) => {
    return (
      <div
        style={{ marginBottom: 15, marginRight: 30, cursor: "pointer" }}
        key={index}
        className="sub-two"
        onMouseEnter={() => {
          setSub_cat_two_name(result.name);
        }}
        onClick={() => {
          window.location.href = `/all_product?selected=${result.name}&&main_cat=${main_cat_name}&&sub_cat_one=${sub_cat_all_name}&&sub_cat_two=${sub_cat_two_name}&&on_sale=${false}`;
          // "/all_product?"+
          // "selected=" +
          // result.name +
          // "&main_cat=" +
          // main_cat_name +
          // "&sub_cat_one=" +
          // sub_cat_all_name +
          // "&sub_cat_two=" +
          // sub_cat_two_name;
        }}>
        <p style={{ fontFamily: "poppins_light" }}> {result.name} -></p>
      </div>
    );
  });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsOnDiv(false);
        setOpenDiv(false);
        setOpenRightView(false);
      }}>
      <div
        className="category-container"
        onMouseLeave={() => {
          setIsOnDiv(false);
          setOpenDiv(false);
          setOpenRightView(false);
          setSub_cat_two_name("");
          setSub_cat_all_name("");
        }}>
        <div className="category-inner">
          <div className="category-inner-left">
            <button
              style={{ marginLeft: 20 }}
              onClick={() => {
                window.location.href = `/all_product?selected=${main_cat_name}&&main_cat=${main_cat_name}&&sub_cat_one=${sub_cat_all_name}&&sub_cat_two=${sub_cat_two_name}&&on_sale=${false}`;

                // window.location.href =
                //   "/all_product?"+
                //   "selected=" +
                //   main_cat_name +
                //   "&main_cat=" +
                //   main_cat_name +
                //   "&sub_cat_one" +
                //   sub_cat_all_name +
                //   "&sub_cat_two=" +
                //   sub_cat_two_name;
              }}>
              All {main_cat_name}
              <i className="far fa-arrow-right" style={{ marginLeft: 8 }}></i>
            </button>
            {renderSubCatOne}
          </div>
          <div className="category-inner-right">
            {openRightView && (
              <div>
                <div className="sub-cat-two-container">{renderSubCatTwo}</div>
                <div
                  onClick={() => {
                    window.location.href = `/all_product?selected=${sub_cat_all_name}&&main_cat=${main_cat_name}&&sub_cat_one=${sub_cat_all_name}&&sub_cat_two=${sub_cat_two_name}&&on_sale=${false}`;
                  }}>
                  <button>
                    All {sub_cat_all_name}
                    <i
                      className="far fa-arrow-right"
                      style={{ marginLeft: 8 }}></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default CategoryContainer;
