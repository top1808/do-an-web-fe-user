import { fork, put, call, take, takeLatest, takeEvery } from 'redux-saga/effects';
import productApi from '@/api/productApi';
import { AxiosResponse } from 'axios';
import { getProductInfoFailed, getProductInfoSuccess, getProductsFailed, getProductsSuccess, gettingProduct, gettingProductInfo } from '../reducers/productReducer';
import { CreateAction } from '@/models/actionModel';

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
function* onGetProductInfo(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(productApi.getProductInfo, id);

		yield put(getProductInfoSuccess(response.data.product));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getProductInfoFailed(error.response.data.message));
	}
}
function* watchGetProductInfoFlow() {
	const type: string = gettingProductInfo.type;
	yield takeEvery(type, onGetProductInfo);
}
function* watchGetProductFlow() {
	yield takeLatest(gettingProduct.type, onGetProducts);
}
export function* ProductSaga() {
	yield fork(watchGetProductFlow);
	yield fork(watchGetProductInfoFlow);
}
