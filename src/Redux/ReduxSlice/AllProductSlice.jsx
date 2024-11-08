import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getDogProducts = createAsyncThunk(
    'product/getDogProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://localhost:7199/api/Product/GetByCategoryName?Catogory_name=Dogs', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const DeleteProduct = createAsyncThunk(
    'product/DeleteProduct',
    async (productId, { rejectWithValue ,dispatch}) => {
       
        try {
            const res = await axios.delete(`https://localhost:7199/api/Product/Delete?id=${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(getCatProducts());
            dispatch(getDogProducts());
            toast.success("product is deleted");

            return res.data;
        } catch (error) {
            console.error("Error deleting product:", error);
            return rejectWithValue(error.response ? error.response.data : "Unknown error");
        }
    }
);


export const DetailsOfProduct = createAsyncThunk(
    'product/DetailsOfProduct',
    async (productId, { rejectWithValue }) => {
       
        try {
            const res = await axios.get(`https://localhost:7199/api/Product/GetByProductId?id=${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
           
            
            return res.data;
        } catch (error) {
            console.error("Error deleting product:", error);
            return rejectWithValue(error.response ? error.response.data : "Unknown error");
        }
    }
);



export const getCatProducts = createAsyncThunk(
    'product/getCatProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://localhost:7199/api/Product/GetByCategoryName?Catogory_name=Cats', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const getProductSlice = createSlice({
    name: 'product',
    initialState: {
        Dogproducts: [], 
        CatProducts:[],
        error: null,
        loading: false,
        status: "idle",
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDogProducts.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getDogProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getDogProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "item fetched";
                state.Dogproducts = action.payload; 
            })
            .addCase(getCatProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCatProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCatProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "item fetched";
                state.CatProducts = action.payload; 
            });
    }
});

export default getProductSlice.reducer;
