import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
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

const initialState = {
  isSidebarOpen: false,
  products: [],
  isLoading: false,
  isError: false,
  featured: [],
  single_product: {},
  sp_isLoading: false,
  sp_isError: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function openSidebar() {
    dispatch({ type: SIDEBAR_OPEN });
  }

  function closeSidebar() {
    dispatch({ type: SIDEBAR_CLOSE });
  }

  async function fetchSingleProduct(url) {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
      const response = await axios(url);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      dispatch({ type: GET_PRODUCTS_BEGIN });
      const response = await axios(url).catch((err) =>
        dispatch({ type: GET_PRODUCTS_ERROR, payload: err })
      );
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    }

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
