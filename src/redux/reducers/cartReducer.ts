import { Product } from '@/models/productModels';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
interface CartState {
	items: Product[];
	loading: boolean;
}
const initialState: CartState = {
	items: [],
	loading: false,
};
const cartReducer = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		addingItemToCart: (state) => {
			state.loading = true;
		},
		addItemToCartSuccess: (state, action: PayloadAction<Product>) => {
			if (state.items.includes(action.payload)) {
				state.items = state.items.map((item) => (item._id !== action.payload._id ? item : action.payload));
			} else {
				state.items.push(action.payload);
			}
			state.loading = false;
			toast.success('Item added to cart successfully');
		},
		addItemToCartFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			toast.error(action.payload);
		},
		removingItemToCart: (state) => {
			state.loading = true;
		},
		removeItemInCartSuccess: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item._id !== action.payload);
			state.loading = false;
			toast.success('Item removed from cart successfully');
		},
		removeItemInCartFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
			toast.error(action.payload);
		},
		updatingCart: (state) => {
			state.loading = true;
		},
		updateCartSuccess: (state, action: PayloadAction<Product>) => {
			const { _id, quantity } = action.payload;
			state.items = state.items.map((item) => (item._id === _id ? { ...item, quantity } : item));
			state.loading = false;
			toast.success('Item updated in cart successfully');
		},
		clearingCart: (state) => {
			state.loading = true;
		},
		clearCartSuccess: (state) => {
			state.items = [];
			state.loading = false;
			toast.success('Cart cleared successfully');
		},
		clearCartFail: (state, action: PayloadAction<string>) => {
			state.loading = false;
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
} = cartReducer.actions;
export default cartReducer.reducer;
