import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  } else if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  } else if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, isLoading: true };
  } else if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured = action.payload.filter(
      (product) => product.featured === true
    );
    return { ...state, isLoading: false, products: action.payload, featured };
  } else if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, isLoading: false, isError: true };
  } else if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, sp_isLoading: true, sp_isError: false };
  } else if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return { ...state, sp_isLoading: false, single_product: action.payload };
  } else if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, sp_isLoading: false, sp_isError: true };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
