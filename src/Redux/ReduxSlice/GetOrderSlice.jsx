import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const GetOrders = createAsyncThunk('users/GetOrders', async () => {
  const response = await axios.get('https://localhost:7199/api/Order/AdminView',{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
  
});


const orderSlice = createSlice({
    name: 'users',
    initialState: {
     
      loading: false,
      error: null,
     
      order:[],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(GetOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(GetOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload;
        })
        .addCase(GetOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
       
    },
  });
  
  export default orderSlice.reducer;