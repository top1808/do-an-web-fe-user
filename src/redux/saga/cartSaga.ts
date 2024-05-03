import { fork, put, call, takeEvery } from 'redux-saga/effects';
import {
	addItemToCartFail,
	addItemToCartSuccess,
	addingItemToCart,
	clearCartFail,
	clearCartSuccess,
	clearingCart,
	getCartFailed,
	getCartSuccess,
	gettingCart,
	payFailed,
	paySuccess,
	paying,
	removeItemInCartFail,
	removeItemInCartSuccess,
	removingItemToCart,
	updateCartFailed,
	updateCartSuccess,
	updatingCart,
} from '../reducers/cartReducer';
import { CartProduct, Product } from '@/models/productModels';
import { CreateAction, DeleteAction } from '@/models/actionModel';
import { AxiosResponse } from 'axios';
import cartApi from '@/api/cartApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { DataPayment } from '@/models/paymentModels';
function* onAddItemToCart(action: CreateAction<Product>) {
	try {
		const body: Product = action.payload as Product;
		// add item to cart databse
		yield call(cartApi.addItem, body);
		yield put(addItemToCartSuccess(body));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 404) yield put(addItemToCartFail('Add to Cart failed !'));
		yield put(addItemToCartFail(error.response.data.message));
	}
}
function* onRemoveItemInCart(action: DeleteAction) {
	try {
		const id = action.payload as string;

		yield call(cartApi.removeItem, id);
		yield put(removeItemInCartSuccess(id));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(removeItemInCartFail(error.response.data.message));
	}
}
function* onClearCart() {
	try {
		yield call(cartApi.clearCart);
		yield put(clearCartSuccess());
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(clearCartFail(error.response.data.message));
	}
}
function* onUpdateCart(action: PayloadAction<CartProduct>) {
	try {
		const response: AxiosResponse = yield call(cartApi.editItem, action.payload);
		yield put(updateCartSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(updateCartFailed(error.response.data));
	}
}

function* onGetCart() {
	try {
		const response: AxiosResponse = yield call(cartApi.getCart);

		yield put(getCartSuccess(response.data.carts));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(getCartFailed(error.response?.data?.message));
	}
}

function* onPayCart(action: PayloadAction<DataPayment>) {
	try {
		const response: AxiosResponse = yield call(cartApi.pay, action.payload);
		yield put(paySuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(payFailed(error.response?.data?.message));
	}
}

function* watchAddCartFlow() {
	yield takeEvery(addingItemToCart.type, onAddItemToCart);
}
function* watchRemoveItemInCartFlow() {
	yield takeEvery(removingItemToCart.type, onRemoveItemInCart);
}
function* watchClearCartFlow() {
	yield takeEvery(clearingCart.type, onClearCart);
}
function* watchGetCartFlow() {
	yield takeEvery(gettingCart.type, onGetCart);
}
function* watchUpdateCartFlow() {
	yield takeEvery(updatingCart.type, onUpdateCart);
}
function* watchPayCartFlow() {
	yield takeEvery(paying.type, onPayCart);
}
export function* CartSaga() {
	yield fork(watchAddCartFlow);
	yield fork(watchRemoveItemInCartFlow);
	yield fork(watchClearCartFlow);
	yield fork(watchGetCartFlow);
	yield fork(watchUpdateCartFlow);
	yield fork(watchPayCartFlow);
}
