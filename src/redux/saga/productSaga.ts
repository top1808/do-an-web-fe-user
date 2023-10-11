import { fork, put, call, take, takeLatest } from 'redux-saga/effects';
import productApi from '@/api/productApi';
import { AxiosResponse } from 'axios';
import { getProductsFailed, getProductsSuccess, gettingProduct } from '../reducers/productReducer';

function* onGetProducts() {
	try {
		const response: AxiosResponse = yield call(productApi.getProducts);
		yield put(getProductsSuccess(response.data.products));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getProductsFailed(error.response.data.message));
	}
}
function* watchGetProductFlow() {
	yield takeLatest(gettingProduct.type, onGetProducts);
}
export function* ProductSaga() {
	yield fork(watchGetProductFlow);
}
