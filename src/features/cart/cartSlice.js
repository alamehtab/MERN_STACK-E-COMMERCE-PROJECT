import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCartAPI, deleteCartItemsAPI, fetchCartItemsByUserIdAPI, updateCartItemsAPI } from "./cartAPI"

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item, { rejectWithValue }) => {
        try {
            const response = await addToCartAPI(item)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const fetchCartItemsAsync = createAsyncThunk(
    'cart/fetchCartItems',
    async (userId, { rejectWithValue }) => {
        console.log("👉 fetchCartItems thunk called with userId:", userId); // ✅ Step 1
        try {
            const response = await fetchCartItemsByUserIdAPI(userId);
            console.log("✅ API response from fetchCartItems:", response.data); // ✅ Step 2
            return response.data;
        } catch (error) {
            console.log("❌ Error in fetchCartItems:", error); // ✅ Step 3
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);
export const updateCartItemsAsync = createAsyncThunk(
    'cart/updateCartItems',
    async (update, { rejectWithValue }) => {
        try {
            const response = await updateCartItemsAPI(update);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);
export const deleteCartItemsAsync = createAsyncThunk(
    'cart/deleteCartItem',
    async (itemId, { rejectWithValue }) => {
        try {
            const response = await deleteCartItemsAPI(itemId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Unknown error");
        }
    }
);

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
            .addCase(fetchCartItemsAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
                state.status = 'idle',
                    state.items = action.payload
            })
            .addCase(fetchCartItemsAsync.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.error
            })
            .addCase(updateCartItemsAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(updateCartItemsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items[index] = action.payload
            })
            .addCase(updateCartItemsAsync.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.error
            })
            .addCase(deleteCartItemsAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteCartItemsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                const index = state.items.findIndex(item => item.id === action.payload)
                state.items.splice(index,1)
            })
            .addCase(deleteCartItemsAsync.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.error
            })
    }
})

export const selectItems = (state) => state.cart.items

export default cartSlice.reducer