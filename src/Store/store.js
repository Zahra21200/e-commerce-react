import { createStore, combineReducers } from 'redux';
import cartReducer from '../Store/reducer';
import favoritesReducer from '../Store/favoriteReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
});

const store = createStore(rootReducer);

export default store;
