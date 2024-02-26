import { Product } from '@/models/productModels';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
interface ProductState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: Product[];
	productInfor: Product | null;
	productsRelative: Product[];
	productsSearch: Product[];
	isSearching: boolean;
	mainImage?: string;
	options?: string[];
}

const initialState: ProductState = {
	loading: false,
	status: 'pending',
	data: [],
	productInfor: null,
	productsRelative: [],
	productsSearch: [],
	isSearching: false,
	mainImage: '',
	options: ['', ''],
};

const ProductSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		gettingProduct: (state) => {
			state.status = 'pending';
			state.loading = true;
		},
		getProductsSuccess: (state, action: PayloadAction<Product[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getProductsFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},
		gettingProductInfo: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.productInfor = null;
		},
		getProductInfoSuccess: (state, action: PayloadAction<Product>) => {
			state.loading = false;
			state.productInfor = action.payload;
		},
		getProductInfoFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingProducstRelative: (state, action: PayloadAction<string>) => {
			state.loading = true;
			state.productsRelative = [];
		},
		getProductsRelativeSuccess: (state, action: PayloadAction<Product[]>) => {
			state.loading = false;
			state.productsRelative = action.payload;
		},
		getProductsRelativeFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		searchingProducts: (state, action: PayloadAction<string>) => {
			state.isSearching = true;
			state.productsSearch = [];
		},
		searchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
			state.isSearching = false;
			state.productsSearch = action.payload;
		},
		searchProductsFailed: (state, action: PayloadAction<string>) => {
			state.isSearching = false;
			action.payload && toast.error(action.payload);
		},

		changeMainImage: (state, action: PayloadAction<string>) => {
			state.mainImage = action.payload;
		},

		selectOption: (state, action: PayloadAction<{ index: number; option: string }>) => {
			state.options = state.options?.map((item, i) => {
				if (i === action.payload.index) {
					return action.payload.option;
				}
				return item;
			});
		},
	},
});
export const {
	gettingProduct,
	getProductsFailed,
	getProductsSuccess,
	getProductInfoFailed,
	getProductInfoSuccess,
	gettingProductInfo,
	getProductsRelativeFailed,
	getProductsRelativeSuccess,
	gettingProducstRelative,
	searchProductsFailed,
	searchProductsSuccess,
	searchingProducts,
	changeMainImage,
	selectOption,
} = ProductSlice.actions;
export default ProductSlice.reducer;
