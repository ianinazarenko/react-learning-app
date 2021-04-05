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
  // UPDATE_FILTERS
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }
  // FILTER_PRODUCTS
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const {
      text,
      company,
      category,
      color,
      max_price,
      price,
      shipping,
    } = state.filters;
    let tempProducts = [...all_products];
    if (text) {
      tempProducts = tempProducts.filter((item) => item.name.includes(text));
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter((item) => item.category === category);
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter((item) => item.company === company);
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((item) => item.colors.includes(color));
    }
    if (price !== max_price) {
      tempProducts = tempProducts.filter((item) => item.price <= price);
    }
    if (shipping) {
      tempProducts = tempProducts.filter((item) => item.shipping);
    }
    return { ...state, filtered_products: tempProducts };
  }
  // CLEAR_FILTERS
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  // NO MATCH
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
