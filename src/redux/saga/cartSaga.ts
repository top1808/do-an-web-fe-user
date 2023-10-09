import { fork, put, call, takeLatest } from 'redux-saga/effects';
import {
	addItemToCartFail,
	addItemToCartSuccess,
	addingItemToCart,
	clearCartFail,
	clearCartSuccess,
	clearingCart,
	removeItemInCartFail,
	removeItemInCartSuccess,
	removingItemToCart,
} from '../reducers/cartReducer';
import { Product } from '@/models/productModels';
import { CreateAction, DeleteAction } from '@/models/actionModel';
function* onAddItemToCart(action: CreateAction<Product>) {
	try {
		const itemProduct = action.payload as Product;
		// add item to cart databse
		// const response: AxiosResponse = yield call(CategoryApi.getCategories);
		yield put(addItemToCartSuccess(itemProduct));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(addItemToCartFail(error.response.data.message));
	}
}
function* onRemoveItemInCart(action: DeleteAction) {
	try {
		const id = action.payload as string;
		// remove item to cart databse
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
		yield put(clearCartSuccess());
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(clearCartFail(error.response.data.message));
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
export function* CartSaga() {
	yield fork(watchAddCartFlow);
	yield fork(watchRemoveItemInCartFlow);
	yield fork(watchClearCartFlow);
}
