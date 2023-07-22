import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/api";

const initialState = {
  products: [], // Initialize products as an empty array
  status: "idle", // Add a status field to track the API request status
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await apiClient.get("user/products");
    return response.data;
  }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.products = action.payload; // Set the fetched products array
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        });
    },
  });

export default productsSlice.reducer;
