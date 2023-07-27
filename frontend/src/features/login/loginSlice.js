import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../api/api";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  loginStatus: "idle", // idle | loading | succeeded | failed
  errorMessage: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loginStatus = "loading";
      state.errorMessage = ""; // Reset error message when login request is initiated
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
      state.errorMessage = ""; // Reset error message when login is successful
    },
    loginFailure: (state,action) => {
      state.isLoggedIn = false;
      state.loginStatus = "failed";
      state.errorMessage = action.payload; // Set the error message from the action payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
      state.loginStatus = "idle";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure,clearErrorMessage } = loginSlice.actions;

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
    // - Extract error message from the error response
    // - Dispatch loginFailure action with the error message
    const errorMessage = error.response.data.error || "Unknown error";
    dispatch(loginFailure(errorMessage));
    console.log(error);
  }
};

export default loginSlice.reducer;
