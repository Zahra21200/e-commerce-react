import { createStore, combineReducers } from 'redux';
import cartReducer from '../Store/reducer';
import favoritesReducer from '../Store/favoriteReducer';

// Combine reducers for cart and favorites
const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
});

// Create the Redux store with the combined reducers
const store = createStore(rootReducer);

export default store;
