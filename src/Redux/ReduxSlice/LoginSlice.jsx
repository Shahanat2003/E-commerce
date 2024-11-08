

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const  loginUser  = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://localhost:7199/api/Login/LoginUser",loginData);
      console.log(response)
      return response.data;
    
    } catch (error) {
     if(error.response){
      return rejectWithValue(error.response.data)
     }
     return rejectWithValue(error.message)
    }
  }
);

const loginSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    // logout: (state) => {
    //   state.userInfo = null;
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
