// store.js
import { createStore } from 'redux';
import cartReducer from '../Store/reducer';

const store = createStore(cartReducer);

export default store;
