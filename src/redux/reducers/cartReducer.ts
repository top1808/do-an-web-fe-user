import { DataPayment, Order, ReponsePaySuccess } from '@/models/paymentModels';
import { CartProduct, Product } from '@/models/productModels';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
interface CartState {
	items: CartProduct[];
	status: string;
	loading: boolean;
	statusUpdate: 'pending' | 'loading' | 'completed';
	orderInfo: Order | null;
	payingStatus: 'pending' | 'completed' | 'failed';
}
const initialState: CartState = {
	items: [],
	loading: false,
	status: '',
	statusUpdate: 'pending',
	orderInfo: null,
	payingStatus: 'pending',
};
const cartReducer = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		gettingCart: (state) => {
			state.loading = true;
			state.status = 'loading';
			state.statusUpdate = 'pending';
			state.payingStatus = 'pending';
		},
		getCartSuccess: (state, action: PayloadAction<CartProduct[]>) => {
			state.loading = false;
			state.items = action.payload;
			state.status = 'completed';
		},

		getCartFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.error(action.payload);
		},

		addingItemToCart: (state, action: PayloadAction<Product>) => {
			state.statusUpdate = 'loading';
		},
		addItemToCartSuccess: (state, action: PayloadAction<Product>) => {
			state.statusUpdate = 'completed';
			toast.success('Item add to cart successfully');
		},
		addItemToCartFail: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'completed';
			action.payload && toast.error(action.payload);
		},

		removingItemToCart: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'loading';
		},
		removeItemInCartSuccess: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'completed';
			toast.success('Item removed from cart successfully');
		},
		removeItemInCartFail: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'completed';
			action.payload && toast.error(action.payload);
		},

		updatingCart: (state, action: PayloadAction<Product>) => {
			state.statusUpdate = 'loading';
		},
		updateCartSuccess: (state, action: PayloadAction<Product>) => {
			state.statusUpdate = 'completed';
		},
		updateCartFailed: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'completed';
			action.payload && toast.error(action.payload);
		},

		clearingCart: (state) => {
			state.statusUpdate = 'loading';
		},
		clearCartSuccess: (state) => {
			state.statusUpdate = 'completed';
			toast.success('Cart cleared successfully');
		},
		clearCartFail: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'completed';
			action.payload && toast.error(action.payload);
		},

		paying: (state, action: PayloadAction<DataPayment>) => {
			state.loading = true;
			state.payingStatus = 'pending';
		},
		paySuccess: (state, action: PayloadAction<ReponsePaySuccess>) => {
			state.loading = false;
			state.orderInfo = action.payload.order;
			state.payingStatus = 'completed';
		},
		payFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.payingStatus = 'failed';
		},
	},
});
export const {
	payFailed,
	paySuccess,
	paying,
	addItemToCartSuccess,
	addItemToCartFail,
	clearCartFail,
	removeItemInCartFail,
	removeItemInCartSuccess,
	addingItemToCart,
	clearCartSuccess,
	clearingCart,
	removingItemToCart,
	updateCartSuccess,
	updatingCart,
	getCartSuccess,
	gettingCart,
	getCartFailed,
	updateCartFailed,
} = cartReducer.actions;
export default cartReducer.reducer;
