import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCartAPI } from "./cartAPI"

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item,{rejectWithValue}) => {
        try {
            const response = await addToCartAPI(item)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle',
                    state.items.push(action.payload)
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.error
            })
    }
})

export const selectItems = (state) => state.cart.items

export default cartSlice.reducer