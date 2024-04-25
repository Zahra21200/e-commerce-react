import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './action';

const initialState = {
  items: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const existingFavoriteIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingFavoriteIndex === -1) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      return state;
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default favoritesReducer;