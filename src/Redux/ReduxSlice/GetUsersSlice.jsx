// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://localhost:7199/api/User/GetUser',{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });

  

  return response.data.filter(u=>u.id!=='3');
});



export const fetchUserById = createAsyncThunk('users/fetchUserById ', async (id) => {
 
  const response = await axios.get(`https://localhost:7199/api/User?userId=${id}`,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });
  
 
  return response.data;
  
});



export const toggleBlockUser = createAsyncThunk(
  'users/toggleBlockUser',
  async ({ userId }, { dispatch, getState }) => {
    console.log(userId)
    try{
      const res=await axios.put(`https://localhost:7199/api/User/blockUnblock?user_id=${userId}`,{},
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        
        dispatch(fetchUsers());

    }catch(error){
      return ("error of bloking user",error)
      
    }
  }
);

export const fetchUserOrders = createAsyncThunk('users/fetchUserOrders ', async (id) => {
 
  const response = await axios.get(`https://localhost:7199/api/Order/GetOrders?userId=${id}`,{
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });
  
  
  return response.data;
  
});



const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
    data:null,
    orders:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleBlockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleBlockUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleBlockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.fulfilled,(state,action)=>{
        state.data=action.payload;
    
      })
      .addCase(fetchUserOrders.fulfilled,(state,action)=>{
        state.orders=action.payload;
      })
  },
});

export default userSlice.reducer;
