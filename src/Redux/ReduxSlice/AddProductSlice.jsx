
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    // console.log(productData)
    try {
      const response = await axios.post("https://localhost:7199/api/Product", productData,{
        headers:{
          'Content-Type':'multipart/form-data',
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      // console.log(response)
      toast.success("Product added successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue(error.response?.data );
    }
  }
);

export const GetCategory = createAsyncThunk('products/GetCategory', async () => {
  const response = await axios.get('https://localhost:7199/api/Category',{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
  
});




const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    category:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        // state.products.push(action.payload); 
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetCategory.fulfilled,(state,action)=>{
        state.category=action.payload
      });
  },
});

export default productSlice.reducer;
