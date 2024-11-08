
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchProducts } from "./ProductSlice";
import { useEffect } from "react";


export const WishlistControl = createAsyncThunk(
    'product/WishlistControl',
    async (productId, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(
                `https://localhost:7199/api/Wishlist/addToWishlist?product_id=${productId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }

            );
          
           dispatch(fetchProducts());
           dispatch(WishlistGet()); 
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const WishlistGet = createAsyncThunk(
    'product/WishlistGet',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://localhost:7199/api/Wishlist/GetWishlistItems", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const wishListSlice = createSlice({
    name: 'product',
    initialState: {
        wishlistItem: [],
        
        message: null,
        error: null,
        loading: false,
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(WishlistControl.pending, (state) => {
            //     state.error = null;
            //     state.loading = true;
            // })
            .addCase(WishlistControl.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(WishlistGet.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItem = action.payload;
            })
            ;
    }
});

export default wishListSlice.reducer;
