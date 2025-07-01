import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchBrandsAPI, fetchCategoriesAPI, fetchProductDetailsByIdAPI, fetchProductsAPI, fetchProductsByFilterAPI } from "./productsAPI"

const initialState = {
    products: [],
    status: 'idle',
    totalItems: 0,
    categories: [],
    brands: [],
    productId: null
}

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProduct',
    async () => {
        const response = await fetchProductsAPI()
        return response.data
    }
)
export const fetchCategoriesAsync = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const response = await fetchCategoriesAPI()
        return response.data
    }
)
export const fetchBrandsAsync = createAsyncThunk(
    'products/fetchBrands',
    async () => {
        const response = await fetchBrandsAPI()
        return response.data
    }
)
export const fetchProductDetailsByIdAsync = createAsyncThunk(
    'products/fetchProductDetailsById',
    async (id) => {
        const response = await fetchProductDetailsByIdAPI(id)
        return response.data
    }
)
export const fetchProductsByFilterAsync = createAsyncThunk(
    'products/fetchProductByFilter',
    async ({ filter, sortOption, pagination }) => {
        try {
            const response = await fetchProductsByFilterAPI(filter, sortOption, pagination);
            return response.data;
        } catch (error) {
            // return thunkAPI.rejectWithValue(error.message);
            return error
        }
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.products = action.payload
            })
            .addCase(fetchProductsByFilterAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.products = action.payload.products
                state.totalItems = action.payload.totalItems
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.categories = action.payload
            })
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.brands = action.payload
            })
            .addCase(fetchProductDetailsByIdAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductDetailsByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.productId = action.payload
            })
    }
})

// export const {  }=productsSlice.actions

export const selectProduct = (state) => state.products.products
export const selectTotalItems = (state) => state.products.totalItems
export const selectCategories = (state) => state.products.categories
export const selectBrands = (state) => state.products.brands
export const selectProductId = (state) => state.products.productId


export default productsSlice.reducer