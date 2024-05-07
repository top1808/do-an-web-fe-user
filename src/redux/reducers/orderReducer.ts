import { Order, OrderParams } from '@/models/paymentModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { RootState } from '../store';

interface OrderState {
	isChangeStatusOrder?: boolean;
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Order[];
	orderDetails: Order | null;
}

const initialState: OrderState = {
	isChangeStatusOrder: false,
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

		cancelingOrder: (state, action: PayloadAction<{ id?: string; reason?: string; receivedDate?: string }>) => {
			state.isChangeStatusOrder = true;
		},
		cancelOrderSuccess: (state, action: PayloadAction<string>) => {
			state.isChangeStatusOrder = false;
			action.payload && toast.success('Hủy đơn hàng thành công');
		},
		cancelOrderFailed: (state, action: PayloadAction<string>) => {
			state.isChangeStatusOrder = false;
			action.payload && toast.error(action.payload);
		},

		confirmingOrder: (state, action: PayloadAction<string>) => {
			state.isChangeStatusOrder = true;
		},
		confirmOrderSuccess: (state, action: PayloadAction<string>) => {
			state.isChangeStatusOrder = false;
			action.payload && toast.success('Xác nhận đã nhận hàng thành công');
		},
		confirmOrderFailed: (state, action: PayloadAction<string>) => {
			state.isChangeStatusOrder = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	confirmOrderFailed,
	confirmOrderSuccess,
	confirmingOrder,
	getOrderInfoFailed,
	getOrderInfoSuccess,
	getOrdersFailed,
	getOrdersSuccess,
	gettingOrderInfo,
	gettingOrders,
	cancelOrderFailed,
	cancelOrderSuccess,
	cancelingOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
export const getOrderState = (state: RootState) => state.order as OrderState;
