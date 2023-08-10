import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/api'; // Replace with your API client

const initialState = {
  payments: [],
  status: 'idle',
  error: null,
};

export const fetchPayments = createAsyncThunk('transactions/fetchPayments', async () => {
  try {
    const response = await apiClient.get('/user/get_payments'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
