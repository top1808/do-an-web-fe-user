import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { CategorySaga } from './categorySaga';
import { ProductSaga } from './productSaga';
import { CartSaga } from './cartSaga';
import { orderSaga } from './orderSaga';
import { VoucherSaga } from './voucherSaga';
import { DiscountProgramSaga } from './discountProgramSaga';

export function* rootSaga() {
	yield all([authSaga(), CategorySaga(), ProductSaga(), CartSaga(), orderSaga(), VoucherSaga(), DiscountProgramSaga()]);
}
