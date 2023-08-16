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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, editedProduct }) => {
    const response = await apiClient.patch(
      `/user/product/${id}`,
      editedProduct
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await apiClient.delete(`/user/product/${productId}`);
    return productId; // Return the deleted product's ID
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
        state.products = action.payload.products; // Set the fetched products array
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        // const updatedProductIndex = state.products.findIndex(
        //   (product) => product._id === action.payload._id
        // );
        // if (updatedProductIndex !== -1) {
        //   // Replace the old product with the updated one
        //   state.products[updatedProductIndex] = action.payload;
        // }
        state.status = "succeeded";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
