import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
	product: productReducer,
	cart: cartReducer,
});

export default rootReducer;
