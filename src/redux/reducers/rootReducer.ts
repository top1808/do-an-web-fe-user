import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import voucherReducer from './voucherReducer';
import modalReducer from './modalReducer';
import discountProgramReducer from './discountProgramReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
	product: productReducer,
	cart: cartReducer,
	order: orderReducer,
	voucher: voucherReducer,
	modal: modalReducer,
	discountProgram: discountProgramReducer,
	notification: notificationReducer,
});

export default rootReducer;
