import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { createUserAPI,checkUserAPI } from "./authAPI";

const initialState={
    users:null,
    status:'idle',
    error:null
}

export const createUserAsync=createAsyncThunk(
    'users/createUser',
    async(userData)=>{
        const response=await createUserAPI(userData)
        return response.data
    }
)
export const checkUserAsync=createAsyncThunk(
    'users/checkUser',
    async(userInfo)=>{
        const response=await checkUserAPI(userInfo)
        return response.data
    }
)

export const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status='pending'
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status='idle',
            state.users=action.payload
        })
        .addCase(checkUserAsync.pending,(state)=>{
            state.status='pending'
        })
        .addCase(checkUserAsync.fulfilled,(state,action)=>{
            state.status='idle',
            state.users=action.payload
        })
        .addCase(checkUserAsync.rejected,(state,action)=>{
            state.status='rejected',
            state.error=action.error
        })
    }
})

export const selectUsers=(state)=>state.users.users
export const selectError=(state)=>state.users.error

export default usersSlice.reducer