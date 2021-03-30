import { GiStaticWaves } from 'react-icons/gi';
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  // LOAD_PRODUCTS
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  // SET_GRIDVIEW
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  // SET_LISTVIEW
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  // UPDATE_SORT
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  // SORT_PRODUCTS
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    const tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (sort === 'name-z') {
      tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  // NO MATCH
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
