import { Order, OrderParams } from '@/models/paymentModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

interface OrderState {
	isCancelingOrder?: boolean;
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Order[];
	orderDetails: Order | null;
}

const initialState: OrderState = {
	isCancelingOrder: false,
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

		cancelingOrder: (state, action: PayloadAction<string>) => {
			state.isCancelingOrder = true;
		},
		cancelOrderSuccess: (state, action: PayloadAction<string>) => {
			state.isCancelingOrder = false;
			action.payload && toast.success('Hủy đơn hàng thành công');
		},
		cancelOrderFailed: (state, action: PayloadAction<string>) => {
			state.isCancelingOrder = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const { getOrderInfoFailed, getOrderInfoSuccess, getOrdersFailed, getOrdersSuccess, gettingOrderInfo, gettingOrders, cancelOrderFailed, cancelOrderSuccess, cancelingOrder } = orderSlice.actions;
export default orderSlice.reducer;
