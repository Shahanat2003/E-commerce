import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getCatProducts, getDogProducts } from "./AllProductSlice";

export const FetchEditProduct = createAsyncThunk(
    'product/FetchEditProduct',
    async ({ id }, { rejectWithValue }) => {
       
        try {
            const res = await axios.get(`https://localhost:7199/api/Product/GetByProductId?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
           
            return res.data;
            
        } catch (error) {
            console.error("Error updating product:", error); // Log the error
            return rejectWithValue(error.response ? error.response.data : "Unknown error");
        }
    }
);


export const EditProduct=createAsyncThunk(
    'product/EditProduct',
    
    async({id,formValues},{rejectWithValue,dispatch})=>{

       
        try{
           
            const response = await axios.put(`https://localhost:7199/api/Product?id=${id}`, formValues, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            dispatch(getDogProducts());
            dispatch(getCatProducts());
            return response.data
           
        }catch(error){
            return rejectWithValue (error.response.data)
        }
    }
)







const EditSlice = createSlice({
    name: 'product',
    initialState: {
        error: null,
        loading: false,
        status: [],
        edit:[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchEditProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(FetchEditProduct.fulfilled, (state, action) => {
                state.status = action.payload;
                state.loading = false;  
            })
            .addCase(FetchEditProduct.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;  
            })
            .addCase(EditProduct.fulfilled,(state,action)=>{
                state.edit=action.payload;
            })
    }
});

export default EditSlice.reducer;