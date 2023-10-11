import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { CategorySaga } from './categorySaga';
import { ProductSaga } from './productSaga';
import { CartSaga } from './cartSaga';

export function* rootSaga() {
	yield all([authSaga(), CategorySaga(), ProductSaga(), CartSaga()]);
}
