// src/redux/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://localhost:7199/api/Product/AllProduct ');
      
      return response.data;
    
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    catProducts: [],
    dogProducts: [],
    status: 'idle', 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.catProducts = action.payload.filter((product) => product.category === 5);
        state.dogProducts = action.payload.filter((product) => product.category === 6);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
