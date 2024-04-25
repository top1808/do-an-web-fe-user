import { fork, put, call, takeEvery } from 'redux-saga/effects';
import productApi from '@/api/productApi';
import { AxiosResponse } from 'axios';
import {
	getProductInfoFailed,
	getProductInfoSuccess,
	getProductPurcharedFailed,
	getProductPurcharedSuccess,
	getProductsFailed,
	getProductsRelativeFailed,
	getProductsRelativeSuccess,
	getProductsSuccess,
	gettingProducstRelative,
	gettingProduct,
	gettingProductInfo,
	gettingProductPurchared,
	searchProductsFailed,
	searchProductsSuccess,
	searchingProducts,
} from '../reducers/productReducer';
import { CreateAction } from '@/models/actionModel';
import { PayloadAction } from '@reduxjs/toolkit';
import reviewApi from '@/api/reviewApi';
import { ProductSKU } from '@/models/productModels';
import { toast } from 'react-toastify';

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
function* onGetProductsRelative(action: PayloadAction<string>) {
	try {
		const response: AxiosResponse = yield call(productApi.getProductsRelative, action.payload);

		yield put(getProductsRelativeSuccess(response.data.products));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getProductsRelativeFailed(error.response.data.message));
	}
}
function* onSearchProducts(action: PayloadAction<string>) {
	try {
		const response: AxiosResponse = yield call(productApi.searchProducts, action.payload);

		yield put(searchProductsSuccess(response.data.products));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(searchProductsFailed(error.response.data.message));
	}
}
function* onGetProductPurchased() {
	try {
		const response: AxiosResponse = yield call(reviewApi.getProductReview);
		console.log(response.data);

		yield put(getProductPurcharedSuccess(response.data.products as ProductSKU[]));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(getProductPurcharedFailed(error.response.data.message));
	}
}
function* watchSearchProductsFlow() {
	const type: string = searchingProducts.type;
	yield takeEvery(type, onSearchProducts);
}
function* watchGetProductsRelativeFlow() {
	const type: string = gettingProducstRelative.type;
	yield takeEvery(type, onGetProductsRelative);
}
function* watchGetProductInfoFlow() {
	const type: string = gettingProductInfo.type;
	yield takeEvery(type, onGetProductInfo);
}
function* watchGetProductFlow() {
	yield takeEvery(gettingProduct.type, onGetProducts);
}
function* watchGetProductPurchasedFlow() {
	yield takeEvery(gettingProductPurchared.type, onGetProductPurchased);
}
export function* ProductSaga() {
	yield fork(watchGetProductFlow);
	yield fork(watchGetProductInfoFlow);
	yield fork(watchGetProductsRelativeFlow);
	yield fork(watchSearchProductsFlow);
	yield fork(watchGetProductPurchasedFlow);
}
