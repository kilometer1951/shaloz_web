import {
  TOGGLE_SEARCH_BAR,
  FETCH_HOME_DATA,
  URL,
  OPEN_AUTH_MODAL,
  USER_INFO,
  FETCH_PRODUCT,
  FETCH_SINGLE_PAGE_DATA,
  REVIEW_PRODUCT_DATA,
  REVIEW_SHOP_DATA,
  FETCH_FAV_PRODUCTS,
  HANDLE_IS_FAV,
  CART_DATA,
  HANDLE_ALERT_MODAL,
  HANDLE_NETWORK_ERROR,
  HANDLE_CART_COUNT,
  HANDLE_CATEGORY_DATA,
  HANDLE_FETCH_PRODUCT_CATEGORY_NOT_ON_SALE,
  HANDLE_CART_PAGE_COUNT,
  HANDLE_ISLOADING,
  HANDLE_UPDATE_PERSONALIZATION_CART_TEXT,
} from "./types";

// export const submit = async (comment,rateNumber,shop_id,user_id) => {
//   const response = await fetch(`${URL}/api/add/review_shop`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       comment,rateNumber,user_id,shop_id
//     }),
//   });
// };

// export const handleIsLoading = (value) => {
//   return (dispatch) => {
//     dispatch({
//       type:HANDLE_ISLOADING,
//       payload:value
//     })
//   }
// }


export const updateCartQty = async (user_id, qty, cart_id, item_id) => {
  const response = await fetch(`${URL}/api/update/update_cart_qty`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id,
      qty,
      cart_id,
      item_id,
    }),
  });

  const resData = await response.json();
  return resData;
};


export const removeCartItem = async (user_id, cart_id, item_id) => {
  const response = await fetch(`${URL}/api/delete/delete_cart_item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id,
      cart_id,
      item_id,
    }),
  });

  const resData = await response.json();
  return resData;
};

export const updatePersonalization = (user_id, cart_id, item_id, text) => {
  return (dispatch) => {
     fetch(
      `${URL}/api/update/update_cart_personilization_note`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          product_personalization_note:text,
          cart_id,
          item_id,
        }),
      },
    );
    dispatch({
      type: HANDLE_UPDATE_PERSONALIZATION_CART_TEXT,
      payload: {
        cart_id,
        item_id,
        text,
      },
    });
  };
};

export const removeCart = (user_id, cart_id) => {
  return async (dispatch) => {
    dispatch({
      type: HANDLE_ISLOADING,
      payload: true,
    });
    await fetch(`${URL}/api/delete/delete_cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        cart_id,
      }),
    });

    dispatch({
      type: HANDLE_ISLOADING,
      payload: false,
    });
  };
};

export const __fetchShopReviews = async (shop_id, page) => {
  const response = await fetch(
    `${URL}/api/view/fetch_shop_review/${shop_id}?page=${page}`
  );
  const resData = await response.json();
  return resData;
};

export const fetch_more_shop_product = async (shop_id, page) => {
  const response = await fetch(
    `${URL}/api/view/fetch_more_shop_product/${shop_id}?page=${page}`
  );
  const resData = await response.json();
  return resData;
};

export const fetch_more_shop_category_product = async (
  shop_id,
  page,
  selected
) => {
  const response = await fetch(
    `${URL}/api/view/fetch_more_shop_category_product/${shop_id}/${selected}?page=${page}`
  );
  const resData = await response.json();
  return resData;
};

export const fetchShopData = async (shop_id) => {
  const response = await fetch(`${URL}/api/view/fetch_shop_data/${shop_id}`);
  const resData = await response.json();
  return resData;
};

export const fetchAllProductCategoryOnSale = (user_id, page) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/api/view/query_all_products_on_sale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        page,
      }),
    });

    const resData = await response.json();
    dispatch({
      type: HANDLE_FETCH_PRODUCT_CATEGORY_NOT_ON_SALE,
      payload: {
        data: resData.data,
        otherProducts: resData.otherProducts,
        shops: resData.shops,
        pageCount: resData.pageCount,
        recent_viewed: resData.recent_viewed,
      },
    });
  };
};

export const fetchAllProductCategoryNotOnSale = (user_id, page) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/query_all_products_not_on_sale`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          page,
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: HANDLE_FETCH_PRODUCT_CATEGORY_NOT_ON_SALE,
      payload: {
        data: resData.data,
        otherProducts: resData.otherProducts,
        shops: resData.shops,
        pageCount: resData.pageCount,
        recent_viewed: resData.recent_viewed,
      },
    });
  };
};

export const fetchProductCategoryNotOnSale = (
  user_id,
  main_cat,
  sub_cat_one,
  sub_cat_two,
  page
) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/query_products_by_category_not_on_sale`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          main_cat,
          sub_cat_one,
          sub_cat_two,
          page,
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: HANDLE_FETCH_PRODUCT_CATEGORY_NOT_ON_SALE,
      payload: {
        data: resData.data,
        otherProducts: resData.otherProducts,
        shops: resData.shops,
        pageCount: resData.pageCount,
        recent_viewed: resData.recent_viewed,
      },
    });
  };
};

export const fetchProductCategoryOnSale = (
  user_id,
  main_cat,
  sub_cat_one,
  sub_cat_two,
  page
) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/query_products_by_category_on_sale`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          main_cat,
          sub_cat_one,
          sub_cat_two,
          page,
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: HANDLE_FETCH_PRODUCT_CATEGORY_NOT_ON_SALE,
      payload: {
        data: resData.data,
        otherProducts: resData.otherProducts,
        shops: resData.shops,
        pageCount: resData.pageCount,
        recent_viewed: resData.recent_viewed,
      },
    });
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/api/fetch_cats`);
    const resData = await response.json();
    dispatch({
      type: HANDLE_CATEGORY_DATA,
      payload: {
        main_cat: resData.main_cat,
        subcat_one_data: resData.subcat_one_data,
        subcat_two_data: resData.subcat_two_data,
      },
    });
  };
};

export const handleNetworkerror = (value) => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_NETWORK_ERROR,
      payload: value,
    });
  };
};

export const handleAlertModal = (value, action, data) => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_ALERT_MODAL,
      payload: { value, action, data },
    });
  };
};

export const fetchCartData = (user_id, page) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/cart/${user_id}?page=${page}`
    );
    const resData = await response.json();
    if (!resData.status) {
      throw new Error(false);
    }
    dispatch({
      type: CART_DATA,
      payload: resData.cartData,
    });

    dispatch({
      type: HANDLE_CART_COUNT,
      payload: resData.cart_count,
    });

    dispatch({
      type: HANDLE_CART_PAGE_COUNT,
      payload: resData.cartPageCount,
    });
    dispatch({
      type: HANDLE_ISLOADING,
      payload: false,
    });
  };
};

export const addToCart = (data) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/api/add/to_cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    const resData = await response.json();

    dispatch({
      type: CART_DATA,
      payload: resData.cartData,
    });

    dispatch({
      type: HANDLE_CART_COUNT,
      payload: resData.cart_count,
    });
  };
};

export const addFavProduct = (user_id, product_id) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/api/add/fav_product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        product_id,
      }),
    });

    const resData = await response.json();
    dispatch({
      type: FETCH_FAV_PRODUCTS,
      payload: resData.data,
    });
  };
};

export const handleisFav = (value) => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_IS_FAV,
      payload: value,
    });
  };
};

export const removeFavProduct = (user_id, product_id) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/api/remove/fav_product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        product_id,
      }),
    });

    const resData = await response.json();
    dispatch({
      type: FETCH_FAV_PRODUCTS,
      payload: resData.data,
    });
  };
};

export const fetchShopReviews = (shop_id, page) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/fetch_shop_review/${shop_id}?page=${page}`
    );
    const resData = await response.json();
    dispatch({
      type: REVIEW_SHOP_DATA,
      payload: {
        number_of_shop_review_pages: resData.number_of_shop_review_pages,
        shop_reviews: resData.data,
      },
    });
  };
};

export const fetchProductReviews = (product_id, page) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/fetch_product_review/${product_id}?page=${page}`
    );
    const resData = await response.json();
    dispatch({
      type: REVIEW_PRODUCT_DATA,
      payload: {
        number_of_product_review_pages: resData.number_of_product_review_pages,
        reviews: resData.data,
      },
    });
  };
};

export const fetchSingleProduct = (product_id, user_id) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/fetch_single_product/${product_id}/${user_id}`
    );
    const resData = await response.json();
    dispatch({
      type: FETCH_SINGLE_PAGE_DATA,
      payload: {
        product: resData.product,
        recent_viewed: resData.recent_viewed,
        otherProducts: resData.otherProducts,
        moreItemsFromShop: resData.moreItemsFromShop,
        otherProducts_website: resData.otherProducts_website,
        moreItemsFromShop_website: resData.moreItemsFromShop_website,
        main_cat: resData.main_cat,
      },
    });
    dispatch({
      type: REVIEW_PRODUCT_DATA,
      payload: {
        number_of_product_review_pages: resData.number_of_product_review_pages,
        reviews: resData.reviews,
      },
    });

    dispatch({
      type: REVIEW_SHOP_DATA,
      payload: {
        number_of_shop_review_pages: resData.number_of_shop_review_pages,
        shop_reviews: resData.shop_reviews,
      },
    });

    dispatch({
      type: HANDLE_IS_FAV,
      payload: resData.fav_products,
    });

    dispatch({
      type: CART_DATA,
      payload: resData.cart_data,
    });

    dispatch({
      type: HANDLE_CART_COUNT,
      payload: resData.cart_data.length,
    });
  };
};

export const fetchProducts = (user_id, main_cat, page) => {
  return async (dispatch) => {
    const response = await fetch(
      `${URL}/api/view/web_site_query_products/${user_id}/${main_cat}?page=${page}`
    );
    const resData = await response.json();
    //const data =

    dispatch({
      type: FETCH_PRODUCT,
      payload: {
        products: resData.products,
        shops: resData.shops,
        otherProducts: resData.otherProducts,
        pageCount: resData.pageCount,
        header_products: resData.header_products,
      },
    });
  };
};

export const loginUser = async (email, password, callback) => {
  const response = await fetch(`${URL}/api/login_users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const resData = await response.json();
  callback(resData);
};

export const dispatchUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: USER_INFO,
      user: user,
    });
  };
};

export const toggleSearchBar = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SEARCH_BAR,
      payload: value,
    });
  };
};

export const openAuthModal = (value) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_AUTH_MODAL,
      payload: value,
    });
  };
};

export const fetchHomeProducts = (user_id) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/api/view/home_products/${user_id}`);
    const resData = await response.json();

    if (!resData.status) {
      throw new Error(false);
    }

    dispatch({
      type: FETCH_HOME_DATA,
      payload: resData.data,
    });
  };
};
