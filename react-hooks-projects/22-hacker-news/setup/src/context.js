import React, { useContext, useEffect, useReducer } from 'react';

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Remove story
  const handleRemoveStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  // Search
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  // Page toggle
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  // useEffect
  useEffect(() => {
    const url = `${API_ENDPOINT}query=${state.query}&page=${state.page}`;
    const fetchData = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          dispatch({
            type: SET_STORIES,
            payload: { hits: data.hits, nbPages: data.nbPages },
          });
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, handleRemoveStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
