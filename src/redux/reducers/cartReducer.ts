import { Product } from '@/models/productModels';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
interface CartState {
	items: Product[];
	status: string;
	loading: boolean;
}
const initialState: CartState = {
	items: [],
	loading: false,
	status: '',
};
const cartReducer = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		gettingCart: (state) => {
			state.loading = true;
			state.status = 'pending';
		},
		getCartSuccess: (state, action: PayloadAction<Product[]>) => {
			state.loading = false;
			state.items = action.payload;
			state.status = 'completed';
		},
		addingItemToCart: (state) => {
			state.loading = true;
			state.status = 'pending';
		},
		addItemToCartSuccess: (state, action: PayloadAction<Product>) => {
			if (state.items.includes(action.payload)) {
				state.items = state.items.map((item) => (item._id !== action.payload._id ? item : action.payload));
			} else {
				state.items.push(action.payload);
			}
			state.loading = false;
			state.status = 'completed';
			toast.success('Item added to cart successfully');
		},
		addItemToCartFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			toast.error(action.payload);
		},
		removingItemToCart: (state) => {
			state.loading = true;
			state.status = 'pending';
		},
		removeItemInCartSuccess: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item._id !== action.payload);
			state.loading = false;
			state.status = 'completed';
			toast.success('Item removed from cart successfully');
		},
		removeItemInCartFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			toast.error(action.payload);
		},
		updatingCart: (state) => {
			state.loading = true;
			state.status = 'pending';
		},
		// logic: update quantity call api save cart ?
		updateCartSuccess: (state, action: PayloadAction<Product>) => {
			const { _id, quantity } = action.payload;
			state.items = state.items.map((item) => (item._id === _id ? { ...item, quantity } : item));
			state.loading = false;
			state.status = 'completed';
			toast.success('Item updated in cart successfully');
		},
		clearingCart: (state) => {
			state.loading = true;
			state.status = 'pending';
		},
		clearCartSuccess: (state) => {
			state.items = [];
			state.loading = false;
			state.status = 'completed';
			toast.success('Cart cleared successfully');
		},
		clearCartFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			toast.error(action.payload);
		},
		// updatetotalPriceAndTotalItems: (state) => {
		// 	state.totalPrice = caculatorTotalPrice(state.items);
		// 	state.totalItems = state.items.reduce((accumulator, value) => {
		// 		return accumulator + value.quantity;
		// 	}, 0);
		// },
	},
});
export const {
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
} = cartReducer.actions;
export default cartReducer.reducer;
