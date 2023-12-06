import { Order, OrderParams } from '@/models/paymentModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

interface OrderState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Order[];
	orderDetails: Order | null;
}

const initialState: OrderState = {
	loading: false,
	status: 'pending',
	data: [],
	orderDetails: null,
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		gettingOrders: (state, action: PayloadAction<OrderParams>) => {
			state.loading = true;
			state.status = 'pending';
		},
		getOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getOrdersFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		gettingOrderInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.orderDetails = null;
		},
		getOrderInfoSuccess: (state, action: PayloadAction<Order>) => {
			state.loading = false;
			state.orderDetails = action.payload;
		},
		getOrderInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const { getOrderInfoFailed, getOrderInfoSuccess, getOrdersFailed, getOrdersSuccess, gettingOrderInfo, gettingOrders } = orderSlice.actions;
export default orderSlice.reducer;
