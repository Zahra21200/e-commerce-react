import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './action';

const initialState = {
  items: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const existingFavoriteIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingFavoriteIndex === -1) {
        // If the item doesn't exist in favorites, add it
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      return state; // If the item already exists in favorites, do nothing
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