import { DataPayment, Order, ReponsePaySuccess } from '@/models/paymentModels';
import { CartProduct, Product } from '@/models/productModels';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
interface CartState {
	items: CartProduct[];
	status: string;
	loading: boolean;
	statusUpdate: 'pending' | 'loading' | 'completed' | 'failed';
	orderInfo: Order | null;
	payingStatus: 'pending' | 'completed' | 'failed';
	ipCustomer: string | null;
}
const initialState: CartState = {
	items: [],
	loading: false,
	status: '',
	statusUpdate: 'pending',
	orderInfo: null,
	payingStatus: 'pending',
	ipCustomer: null,
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
			state.statusUpdate = 'pending';
		},
		addItemToCartSuccess: (state, action: PayloadAction<Product>) => {
			state.statusUpdate = 'completed';
			toast.success('Item add to cart successfully');
		},
		addItemToCartFail: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'failed';
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
			state.statusUpdate = 'failed';
			action.payload && toast.error(action.payload);
		},

		updatingCart: (state, action: PayloadAction<Product>) => {
			state.statusUpdate = 'loading';
		},
		updateCartSuccess: (state, action: PayloadAction<Product>) => {
			state.statusUpdate = 'completed';
		},
		updateCartFailed: (state, action: PayloadAction<any>) => {
			const temp = state.items.map((item) => {
				if (item._id === action.payload.cartItem._id) {
					return action.payload.cartItem;
				}
				return item;
			});
			state.items = temp;
			state.statusUpdate = 'failed';
			action.payload && toast.error(action.payload.message);
		},

		clearingCart: (state) => {
			state.statusUpdate = 'loading';
		},
		clearCartSuccess: (state) => {
			state.statusUpdate = 'completed';
			toast.success('Cart cleared successfully');
		},
		clearCartFail: (state, action: PayloadAction<string>) => {
			state.statusUpdate = 'failed';
			action.payload && toast.error(action.payload);
		},

		paying: (state, action: PayloadAction<DataPayment>) => {
			state.payingStatus = 'pending';
		},
		paySuccess: (state, action: PayloadAction<ReponsePaySuccess>) => {
			state.orderInfo = action.payload.order;
			state.payingStatus = 'completed';
		},
		payFailed: (state, action: PayloadAction<string>) => {
			state.payingStatus = 'failed';
			action.payload && toast.error(action.payload);
		},
		setIPCustomer: (state, action: PayloadAction<string>) => {
			state.ipCustomer = action.payload;
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
	setIPCustomer,
} = cartReducer.actions;
export default cartReducer.reducer;
export const getCartState = (state: RootState) => state.cart as CartState;
