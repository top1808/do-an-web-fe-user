import { fork, put, call, takeLatest } from 'redux-saga/effects';
import {
	addItemToCartFail,
	addItemToCartSuccess,
	addingItemToCart,
	clearCartFail,
	clearCartSuccess,
	clearingCart,
	getCartSuccess,
	gettingCart,
	removeItemInCartFail,
	removeItemInCartSuccess,
	removingItemToCart,
} from '../reducers/cartReducer';
import { Product } from '@/models/productModels';
import { CreateAction, DeleteAction } from '@/models/actionModel';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import cartApi from '@/api/cartApi';
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
		// remove item to cart databse
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
		// cleart cart databse
		yield call(cartApi.clearCart);
		yield put(clearCartSuccess());
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(clearCartFail(error.response.data.message));
	}
}
function* onGetCart(action: CreateAction<string>) {
	try {
		const _id = action.payload as string;
		// get cart in databse
		const response: AxiosResponse = yield call(cartApi.getCart, _id);
		yield put(getCartSuccess(response.data.cart));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		toast.error(error.response.data.message);
	}
}
function* watchAddCartFlow() {
	yield takeLatest(addingItemToCart.type, onAddItemToCart);
}
function* watchRemoveItemInCartFlow() {
	yield takeLatest(removingItemToCart.type, onRemoveItemInCart);
}
function* watchClearCartFlow() {
	yield takeLatest(clearingCart.type, onClearCart);
}
function* watchGetCartFlow() {
	yield takeLatest(gettingCart.type, onGetCart);
}
export function* CartSaga() {
	yield fork(watchAddCartFlow);
	yield fork(watchRemoveItemInCartFlow);
	yield fork(watchClearCartFlow);
	yield fork(watchGetCartFlow);
}
