// reducer.js
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './action';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity++;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      case UPDATE_QUANTITY:
      const { productId, newQuantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;