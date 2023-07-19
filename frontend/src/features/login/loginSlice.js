import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../api/api";

const initialState = {
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    // Make API call to login endpoint
    const response = await apiClient.post("/auth/login", credentials);
    // Handle successful login
    // - Update token in local storage
    // - Dispatch loginSuccess action
    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess());
    }
  } catch (error) {
    // Handle login failure
    // - Dispatch loginFailure action with error message
    dispatch(loginFailure(error.message));
  }
};

export default loginSlice.reducer;
