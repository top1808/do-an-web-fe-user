import { Product } from '@/models/productModels';
import { caculatorTotalPrice } from '@/utils/FuntionHelpers';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface CartState {
	items: Product[];
	totalItems: number;
	totalPrice: number;
}
const initialState: CartState = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
};
const cartReducer = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Product>) => {
			if (state.items.includes(action.payload)) {
				state.items = state.items.map((item) => (item._id !== action.payload._id ? item : action.payload));
				state.totalItems = state.totalItems + 1;
			} else {
				state.items.push(action.payload);
				state.totalItems = state.totalItems + 1;
			}
		},
		removeItemInCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item._id !== action.payload);
			state.totalItems = state.totalItems - 1;
		},
		updateTotalPrice: (state) => {
			state.totalPrice = caculatorTotalPrice(state.items);
		},
	},
});
export const { addToCart, removeItemInCart, updateTotalPrice } = cartReducer.actions;
export default cartReducer.reducer;
