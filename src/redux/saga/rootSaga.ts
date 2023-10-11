import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { CategorySaga } from './categorySaga';
import { ProductSaga } from './productSaga';

export function* rootSaga() {
	yield all([authSaga(), CategorySaga(), ProductSaga()]);
}
