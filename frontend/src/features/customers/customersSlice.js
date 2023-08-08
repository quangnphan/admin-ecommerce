import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/api';

export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async () => {
  const response = await apiClient.get('/user/customers'); // Adjust the URL as needed
  return response.data;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;
