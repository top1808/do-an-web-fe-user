import { Category } from '@/models/categoryModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';
interface CategoryState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Category[];
}

const initialState: CategoryState = {
	loading: false,
	status: 'pending',
	data: [],
};

const categorySlice = createSlice({
	name: 'category',
	initialState: initialState,
	reducers: {
		gettingCategory: (state) => {
			state.status = 'pending';
			state.loading = true;
		},
		getCategorieSuccess: (state, action: PayloadAction<Category[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getCategoriesFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},
	},
});

export const { getCategoriesFailed, getCategorieSuccess, gettingCategory } = categorySlice.actions;
export default categorySlice.reducer;
export const categoryState = (state: RootState) => state.category;
