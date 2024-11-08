
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProductDetails = createAsyncThunk(
    'product/fetchProductDetails',
    async (id,{rejectWithValue}) => {
        // console.log(id)
        try{
            const response = await axios.get(`https://localhost:7199/api/Product/GetByProductId?id=${id}`);
            // console.log(response)
            return response.data;

        }catch(error){
            return rejectWithValue(error.response.data);
        }
       
    }
);

const productDetailsSlice = createSlice({
    name: 'product',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // console.log(state.data)
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productDetailsSlice .reducer;
