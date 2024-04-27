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
import addressReducer from './addressReducer';
import reviewReducers from './reviewReducers';

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
	address: addressReducer,
	review: reviewReducers,
});

export default rootReducer;
