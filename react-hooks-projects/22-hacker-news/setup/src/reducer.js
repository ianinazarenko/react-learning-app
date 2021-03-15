import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };

    case REMOVE_STORY:
      const id = action.payload;
      const newHits = state.hits.filter((hit) => hit.objectID !== id);
      return { ...state, hits: newHits };

    case HANDLE_SEARCH:
      return { ...state, query: action.payload.query, page: 0 };

    case HANDLE_PAGE:
      if (action.payload === 'dec') {
        if (state.page > 1) {
          return { ...state, page: state.page - 1 };
        } else {
          return { ...state, page: state.nbPages - 1 };
        }
      } else if (action.payload === 'inc') {
        if (state.page + 1 !== state.nbPages) {
          return { ...state, page: state.page + 1 };
        } else {
          return { ...state, page: 0 };
        }
      }

    default:
      throw new Error(`No matching for ${action.type} action type`);
  }
};
export default reducer;
