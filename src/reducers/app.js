import {
  TOGGLE_SEARCH_BAR,
  FETCH_HOME_DATA,
  OPEN_AUTH_MODAL,
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
} from "../actions/types";

const INITIAL_STATE = {
  toggle_search_bar: false,
  open_auth_modal: false,
  fetched_home_data: [],
  fetchedProductsCategory: {},
  productData: {},
  reviewProductData: [],
  reviewShopData: [],
  fav_products_data: [],
  isFav: false,
  cart_data: [],
  openAlertModal: false,
  openNetworkError: false,
  cart_count: 0,
  category_data: {},
  fetch_product_category_data: {},
  cartPageCount: 0,
  isLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HANDLE_UPDATE_PERSONALIZATION_CART_TEXT:
      const filter_cart = state.cart_data.filter(
        (result) => result._id == action.payload.cart_id
      );

      filter_cart[0].items.map((result) => {
        if (result._id == action.payload.item_id) {
          result.product_personalization_note = action.payload.text;
        }
      });
      return {
        ...state,
      };
    case HANDLE_ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case HANDLE_CART_PAGE_COUNT:
      return {
        ...state,
        cartPageCount: action.payload,
      };
    case HANDLE_FETCH_PRODUCT_CATEGORY_NOT_ON_SALE:
      return {
        ...state,
        fetch_product_category_data: action.payload,
      };
    case HANDLE_CATEGORY_DATA:
      return {
        ...state,
        category_data: action.payload,
      };
    case HANDLE_CART_COUNT:
      return {
        ...state,
        cart_count: action.payload,
      };
    case HANDLE_NETWORK_ERROR:
      return {
        ...state,
        openNetworkError: action.payload,
      };
    case HANDLE_ALERT_MODAL:
      return {
        ...state,
        openAlertModal: action.payload,
      };
    case CART_DATA:
      return {
        ...state,
        cart_data: action.payload,
      };
    case HANDLE_IS_FAV:
      return {
        ...state,
        isFav: action.payload,
      };
    case FETCH_FAV_PRODUCTS:
      return {
        ...state,
        fav_products_data: action.payload,
      };
    case REVIEW_SHOP_DATA:
      return {
        ...state,
        reviewShopData: action.payload,
      };
    case REVIEW_PRODUCT_DATA:
      return {
        ...state,
        reviewProductData: action.payload,
      };
    case FETCH_SINGLE_PAGE_DATA:
      return {
        ...state,
        productData: action.payload,
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        fetchedProductsCategory: action.payload,
      };
    case TOGGLE_SEARCH_BAR:
      return {
        ...state,
        toggle_search_bar: action.payload,
      };
    case OPEN_AUTH_MODAL:
      return {
        ...state,
        open_auth_modal: action.payload,
      };
    case FETCH_HOME_DATA:
      return {
        ...state,
        fetched_home_data: action.payload,
      };

    default:
      return state;
  }
};
