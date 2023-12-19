import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import voucherReducer from './voucherReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
	product: productReducer,
	cart: cartReducer,
	order: orderReducer,
	voucher: voucherReducer,
	modal: modalReducer,
});

export default rootReducer;
