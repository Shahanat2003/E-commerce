import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../component/Navbar";
import { fetchProducts } from "./ProductSlice";

export const AddCart = createAsyncThunk(
  "cart/AddCart",
  async (product_id, { rejectWithValue,dispatch }) => {
    const userId = localStorage.getItem("id");
    
    if (!userId) {
      toast.warning("Please login");
      return rejectWithValue("User not logged in");
    }

    try {
      const res = await axios.post(
        `https://localhost:7199/api/Cart/AddToCart?productId=${product_id}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     dispatch(fetchCartItems())
        
    //   // Log the response details for debugging
    //   console.log("Response:", res);
    //   console.log("Response Status:", res.status);
      console.log(res.data)
      if (res.status === 200) {
        toast.success("Item successfully added to cart");
        
      }
       else {
        toast.error("Unexpected response status");
        return rejectWithValue("Unexpected response status");
      }
    } catch (error) {

      toast.warning(error.response.data.errorMessages);
      console.error("Error details:", error.response.data.errorMessages);
      return rejectWithValue(error.message);
    }
  }
);





export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (_, thunkAPI) => {
  try {
    const res = await axios.get("https://localhost:7199/api/Cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return res.data || [];
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Failed to load cart items");
  }
});




const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddCart.fulfilled, (state, action) => {
        state.status = "succeeded";
       
        // state.items.push(action.payload);
      })
      .addCase(AddCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Populate the items array with fetched data
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
      
      
  },
});

export default cartSlice.reducer;
